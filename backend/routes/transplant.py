from flask import Blueprint, request, jsonify
from db import get_db_connection

transplant_routes = Blueprint('transplant', __name__)

# CREATE transplant
@transplant_routes.route('/transplant', methods=['POST'])
def create_transplant():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO transplant
    (surgery_date, outcome, notes, matching_id, surgeon_id, hospital_id)
    VALUES (%s,%s,%s,%s,%s,%s)
    """

    cursor.execute(query, (
        data['surgery_date'],
        data.get('outcome'),
        data.get('notes'),
        data['matching_id'],
        data['surgeon_id'],
        data['hospital_id']
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Transplant recorded"})