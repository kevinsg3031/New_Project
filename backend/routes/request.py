from flask import Blueprint, request, jsonify
from db import get_db_connection

request_routes = Blueprint('request', __name__)

@request_routes.route('/requests', methods=['GET'])
def get_requests():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT tr.*, r.name AS recipient_name
    FROM transplant_request tr
    JOIN recipient r ON tr.recipient_id = r.recipient_id
    """

    cursor.execute(query)
    data = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(data)


@request_routes.route('/requests', methods=['POST'])
def add_request():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO transplant_request
    (organ_needed, urgency_level, requested_on, status, recipient_id)
    VALUES (%s,%s,NOW(),%s,%s)
    """

    cursor.execute(query, (
        data['organ_needed'],
        data['urgency_level'],
        data.get('status', 'Pending'),
        data['recipient_id']
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Request created"})