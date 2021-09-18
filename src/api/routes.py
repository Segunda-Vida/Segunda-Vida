"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Product
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager
from flask_mail import Message
from werkzeug.utils import secure_filename
import base64
import os

api = Blueprint('api', __name__)

UPLOAD_FOLDER="uploads/"

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

    nickname = body["nickname"]
    email = body["email"]
    password = body["password"]


    User.create(nickname, email, password)

    return jsonify({"msg": "User created"}), 200

@api.route('/upload/profile/', methods=['POST'])
def fileUpload():
    target = os.path.join(UPLOAD_FOLDER)
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['File']
    ##imagen com otexto
    imageString = base64.b64encode(file.read())
    imageString = imageString.decode('ascii')

    print(imageString)

    result = {
        "image": imageString
    }

    return jsonify(result)

@api.route('/products', methods=["GET"])
def getProducts():

    products = Product.getAllProducts()

    return jsonify({"data": products})