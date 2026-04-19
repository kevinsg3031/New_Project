from flask import Flask
from flask_cors import CORS

# Import routes
from routes.auth import auth_routes
from routes.hospital import hospital_routes
from routes.staff import staff_routes
from routes.donor import donor_routes
from routes.recipient import recipient_routes
from routes.request import request_routes
from routes.organ import organ_routes
from routes.match import match_routes
from routes.transplant import transplant_routes

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(auth_routes)
app.register_blueprint(hospital_routes)
app.register_blueprint(staff_routes)
app.register_blueprint(donor_routes)
app.register_blueprint(recipient_routes)
app.register_blueprint(request_routes)
app.register_blueprint(organ_routes)
app.register_blueprint(match_routes)
app.register_blueprint(transplant_routes)

if __name__ == '__main__':
    app.run(debug=True)