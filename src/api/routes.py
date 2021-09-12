"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager
from app import mail
from flask_mail import Message

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def sign_in():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "Body is empty or null"})

    email = body["email"]
    password = body["password"]

    user = User.getUser(email, password)
    token = create_access_token(identity=user.id)
    if token is None:
        return jsonify({"msg": "Error to create access token"})


    return jsonify({"token": token}), 200


@api.route('/register', methods=['POST'])
def sign_up():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "Body is empty or null"})

    email = body["email"]
    password = body["password"]
    is_active = body["is_active"]

    User.create(email, password, is_active)

    return jsonify({"msg": "User created"}), 200

@api.route("/forgot-password",methods=["POST"])

def recovery_pasword():
    body =request.get_json()
    if body is None:
        return jsonify({"msg":"Body is empty or null"})
   
    email = body["email"]
    password = User.randomPassword(email)
    msg = Message('Recuperar contrasana', recipients=[email])
    msg.body = 'Su contrasana tempor es ' + password
    msg.html = '<p>This is a test email!</p>'
    msg.send(msg)

    return jsonify({"msg":"Correo enviado"}),200
