from flask import Blueprint, request, jsonify
from db import get_db_connection

donor_routes = Blueprint('donor', __name__)

@donor_routes.route('/donors', methods=['POST'])
def add_donor():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO donor
    (name, dob, blood_group, gender, phone, address, latitude, longitude, status, hospital_id)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    cursor.execute(query, (
        data['name'], data['dob'], data['blood_group'],
        data.get('gender'), data.get('phone'), data.get('address'),
        data.get('latitude'), data.get('longitude'),
        data['status'], data['hospital_id']
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Donor added"})