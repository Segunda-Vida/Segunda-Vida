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
            "nickname":self.nickname,
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
    
    def getUserNick(user_id):
        usersNicks= User.query.filter_by(id=user_id).first()
        user =  usersNicks.serialize()
        return user

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    price = db.Column(db.String(200), nullable=False)   
    description = db.Column(db.String(200), nullable=False)
    product_image_url = db.Column(db.Text)
    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    is_bough = db.Column(db.Integer,nullable=False)

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
            "user_id": self.user_id,
            "is_bough": self.is_bough
        }
    
    def getAllProducts():
        products = Product.query.all()
        products = list(map(lambda product: product.serialize(), products))

        return products

    def createP(name, price, description, brand,product_image_url,user_id,is_bough):
        product = Product(name = name, price = price, description = description, brand = brand ,product_image_url=product_image_url,user_id=user_id,is_bough=is_bough)
        db.session.add(product)
        db.session.commit()
    
    def getProduct(id):
        product = Product.query.get(id)
        if product is None:
            return {"msg":"Este producto no existe"}
        product = Product.serialize(product)
        return product
    
    def getPrAll():
        products = Product.query.filter_by(is_bough=1).all()
        products = list(map(lambda product : product.serialize(), products))
        return products

    def getPrUser(user_id):
        product = Product.query.filter_by(user_id=user_id).all()
        if product is None:
            return {"msg":"Este producto no existe"}
        product = list(map(lambda product : product.serialize(), product))
        return product
    
    def productStatus(id):
        product=Product.query.get(id)
        product.is_bough = 0
        db.session.commit()
    
    def productStatusDev(id):
        product=Product.query.get(id)
        product.is_bough = 1
        db.session.commit()