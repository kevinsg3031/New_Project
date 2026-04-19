from flask import Blueprint, request, jsonify
from db import get_db_connection

match_routes = Blueprint('match', __name__)

# ---------------- FIND MATCH ----------------
@match_routes.route('/match/<int:request_id>', methods=['GET'])
def find_match(request_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # get request + recipient blood group
    cursor.execute("""
        SELECT tr.*, r.blood_group
        FROM transplant_request tr
        JOIN recipient r ON tr.recipient_id = r.recipient_id
        WHERE tr.request_id = %s
    """, (request_id,))
    
    request_data = cursor.fetchone()

    if not request_data:
        return jsonify({"error": "Request not found"}), 404

    # find matching organs
    cursor.execute("""
        SELECT * FROM organ
        WHERE organ_type = %s
        AND blood_group = %s
        AND status = 'Available'
    """, (request_data['organ_needed'], request_data['blood_group']))

    matches = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({
        "request": request_data,
        "matches": matches
    })


# ---------------- APPROVE MATCH ----------------
@match_routes.route('/match/approve', methods=['POST'])
def approve_match():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    # insert matching record
    query = """
INSERT INTO matching_record
(compatibility_score, status, matched_at, organ_id, request_id, approved_by)
VALUES (%s, %s, NOW(), %s, %s, %s)
"""

    cursor.execute(query, (
    data.get('compatibility_score', 100),
    "Approved",
    data['organ_id'],
    data['request_id'],
    data['approved_by']
))

    # mark organ as used
    cursor.execute(
        "UPDATE organ SET status='Used' WHERE organ_id=%s",
        (data['organ_id'],)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Match approved"})