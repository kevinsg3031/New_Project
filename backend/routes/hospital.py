from flask import Blueprint, request, jsonify
from db import get_db_connection

hospital_routes = Blueprint('hospital', __name__)

@hospital_routes.route('/hospital', methods=['GET'])
def get_hospitals():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM hospital")
    data = cursor.fetchall()

    cursor.close()
    conn.close()
    return jsonify(data)


@hospital_routes.route('/hospital', methods=['POST'])
def add_hospital():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO hospital (name,address) VALUES (%s,%s)",
                   (data['name'], data['address']))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Hospital added"})