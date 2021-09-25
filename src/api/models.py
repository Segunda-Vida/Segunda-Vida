from flask_sqlalchemy import SQLAlchemy
import random
from flask import jsonify

db = SQLAlchemy()

class User(db.Model):
    __tablename__= "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nickname = db.Column(db.String(16), unique=True, nullable= False)
    product = db.relationship("Product")

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    def getUser(email, password):
        user = User.query.filter_by(email=email, password=password).first()
        return user

    def create(nickname, email, password):
        user = User(nickname=nickname, email=email, password=password)
        db.session.add(user)
        db.session.commit()

    def randomPassword(email):
        user = User.query.filter_by(email=email).first()
        print(user)
        if user is None:
            return jsonify({"msg": "el usuario no existe"}), 404
        password = ''.join((random.choice('abcdxyzpqr') for i in range(5)))
        user.password = password
        db.session.commit()

        return password

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    price = db.Column(db.String(200), nullable=False)   
    description = db.Column(db.String(200), nullable=False)
    product_image_url = db.Column(db.Text)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))

    def __repr__(self):
        return '<Product %r>' % self.name
    
  
     
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "brand": self.brand,
            "price": self.price,
            "description": self.description,
            "product_image_url": self.product_image_url,
            "user_id": self.user_id
        }
    
    def getAllProducts():
        products = Product.query.all()
        products = list(map(lambda product: product.serialize(), products))
        return products

    def createP(name, price, description, brand,product_image_url,user_id):
        product = Product(name = name, price = price, description = description, brand = brand ,product_image_url=product_image_url,user_id=user_id)
        db.session.add(product)
        db.session.commit()
    
    def getProduct(id):
        product = Product.query.get(id)
        if product is None:
            return {"msg":"Este producto no existe"}
        product = Product.serialize(product)
        return product
    
    def getPrAll():
        products = Product.query.all()
        products = list(map(lambda product : product.serialize(), products))
        return products

    