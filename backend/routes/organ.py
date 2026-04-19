from flask import Blueprint, request, jsonify
from db import get_db_connection

organ_routes = Blueprint('organ', __name__)

# ADD organ
@organ_routes.route('/organs', methods=['POST'])
def add_organ():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
INSERT INTO organ
(organ_type, blood_group, `condition`, status, donor_id, hospital_id)
VALUES (%s,%s,%s,%s,%s,%s)
"""

    cursor.execute(query, (
        data['organ_type'],
        data['blood_group'],
        data.get('condition'),
        data.get('status', 'Available'),
        data['donor_id'],
        data['hospital_id']
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Organ added"})


# GET all organs
@organ_routes.route('/organs', methods=['GET'])
def get_organs():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM organ")
    data = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(data)