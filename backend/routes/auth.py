from flask import Blueprint, request, jsonify
from db import get_db_connection
import mysql.connector

auth_routes = Blueprint('auth', __name__)

# ---------------- REGISTER ----------------
@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    print("RAW DATA:", request.data)
    print("JSON DATA:", data)

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = "INSERT INTO users (username, password, role) VALUES (%s,%s,%s)"
        cursor.execute(query, (data['username'], data['password'], data['role']))
        conn.commit()

        return jsonify({"message": "User registered"}), 201

    except Exception as e:
        print("REGISTER ERROR:", e)
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()


# ---------------- LOGIN ----------------
@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json

    # 🔴 validate input
    if not data:
        return jsonify({"error": "No data provided"}), 400

    if 'username' not in data or 'password' not in data:
        return jsonify({"error": "Missing username or password"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        query = """
        SELECT user_id, username, password, role
        FROM users
        WHERE username = %s
        """
        cursor.execute(query, (data['username'],))
        user = cursor.fetchone()

        # 🔴 user not found
        if not user:
            return jsonify({"error": "User not found"}), 404

        # 🔴 password check
        if user['password'] != data['password']:
            return jsonify({"error": "Wrong password"}), 401

        # 🔴 remove password before sending
        del user['password']

        return jsonify({"user": user}), 200

    except Exception as e:
        print("LOGIN ERROR:", e)   # 🔥 debug
        return jsonify({"error": "Server error"}), 500

    finally:
        cursor.close()
        conn.close()