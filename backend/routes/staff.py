from flask import Blueprint, request, jsonify
from db import get_db_connection

staff_routes = Blueprint('staff', __name__)

@staff_routes.route('/staff', methods=['GET'])
def get_staff():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM staff")
    data = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(data)


@staff_routes.route('/staff', methods=['POST'])
def add_staff():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO staff (name, role, specialization, phone, hospital_id)
    VALUES (%s,%s,%s,%s,%s)
    """

    cursor.execute(query, (
        data['name'],
        data['role'],
        data.get('specialization'),
        data.get('phone'),
        data['hospital_id']
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Staff added"})