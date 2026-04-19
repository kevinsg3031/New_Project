from flask import Blueprint, request, jsonify
from db import get_db_connection

recipient_routes = Blueprint('recipient', __name__)

@recipient_routes.route('/recipients', methods=['GET'])
def get_recipients():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM recipient")
    data = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(data)


@recipient_routes.route('/recipients', methods=['POST'])
def add_recipient():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO recipient
    (name, dob, blood_group, gender, phone, address, urgency_level, registered_on, hospital_id)
    VALUES (%s,%s,%s,%s,%s,%s,%s,NOW(),%s)
    """

    cursor.execute(query, (
        data['name'], data['dob'], data['blood_group'],
        data.get('gender'), data.get('phone'), data.get('address'),
        data['urgency_level'], data['hospital_id']
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Recipient added"})