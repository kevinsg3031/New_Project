import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="roundhouse.proxy.rlwy.net",   # ✅ IMPORTANT
        port=21377,                         # ✅ IMPORTANT
        user="root",
        password="DXxZFGOAGNnKBOdZhqtqZAGCUCPqRiOG",
        database="final_project"            # or railway if that's where tables are
    )