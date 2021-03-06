"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Product
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required,get_jwt_identity,create_access_token, JWTManager
from flask_mail import Message
from werkzeug.utils import secure_filename
import base64
import os
import cloudinary
import cloudinary.uploader
import json

api = Blueprint('api', __name__)

UPLOAD_FOLDER="uploads/"



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
    image = request.files["File"]

    if image is None:
        return jsonify({"msg":"Error to get image"}), 400
    

    nickname = request.form["nickname"]
    email = request.form["email"]
    password = request.form["password"]
    upload_result = cloudinary.uploader.upload(image)
    user_img = upload_result["secure_url"]
    country = request.form["country"]
    postal_code = request.form["postal_code"]
    direction = request.form["direction"]
    poblation = request.form["poblation"]
    provence = request.form["provence"]


    user_create = User.create(nickname, email, password, user_img, country, postal_code, direction, poblation, provence)

    return jsonify({"msg": "User created"}), 200

@api.route("/products",methods=["POST"])
@jwt_required()
def subir_p():
    file_info = request.form["file_info"]
    images = []

    for i in range(int(file_info)):
        image = request.files["file-" + str(i)]
    
        if image is None:
            return jsonify({"msg": "Error to get image"}), 400

        upload_result = cloudinary.uploader.upload(image)

        image_url =upload_result['secure_url']    

        images.append(image_url)

    name = request.form["name"]
    price = request.form["price"]
    description = request.form["description"]
    brand = request.form["brand"]
    category = request.form["category"]
    
    
    user_id= get_jwt_identity()

    Product.createP(name, price, description,brand,json.dumps(images),user_id,1, category)

    return jsonify({"msg": "Producto subido"}),200

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

@api.route("/product/<int:id>",methods=["GET"])
def getProduct(id):

    product = Product.getProduct(id)
    return jsonify(product),200

@api.route("/product", methods=["GET"])

def getPrAll():

    product = Product.getPrAll()

    return jsonify({"producto": product}), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200


@api.route('/profile/image/', methods=["POST"])
def upload_image():
    body=request.get_json()
    image_id=body["image_id"]
    
    image = request.files['File']


    if image is None:
        return jsonify({"msg": "Error to get image"}), 400
    
    upload_result = cloudinary.uploader.upload(image)

    image = Product.query.get(image_id)

    image.product_image_url = upload_result['secure_url']

    db.session.commit()

    return jsonify({"msg": "image upload fine"}), 200

@api.route("/productP", methods=["GET"])
@jwt_required()
def getPrUser():
        user_id= get_jwt_identity()
        product = Product.getPrUser(user_id)
        return jsonify(product),200

@api.route("/user",methods=["GET"])
@jwt_required()
def getUserNick():
    user_id= get_jwt_identity()
    user = User.getUserNick(user_id)
    return jsonify({"user": user})

@api.route("/prBough/<int:id>",methods=["GET"])
@jwt_required()
def prod_bough(id):
    print("no funciona")
    product = Product.productStatus(id)
    return jsonify({"msg":"producto vendido"}),200

@api.route("/prBoughDev/<int:id>",methods=["GET"])
@jwt_required()
def prod_bought(id):
    print("no funciona")
    product = Product.productStatusDev(id)
    return jsonify({"msg":"producto devuelto"}),200