import sys
sys.path.insert(1, './database')
sys.path.insert(1, './models')
import projects as pj
import statics as st
import os
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, Response
import hashlib

app = Flask(__name__)
CORS(app)

# init app
basedir = os.path.abspath(os.path.dirname(__file__))

# database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'database/db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# init db, ma
db = SQLAlchemy(app)
ma = Marshmallow(app)

# product class/model
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20))
    lastName = db.Column(db.String(20))
    email = db.Column(db.String(100))
    school = db.Column(db.String(5))
    password = db.Column(db.String(30))
    
    def __init__(self, firstName, lastName, email, school, password):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.school = school
        self.password = password

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    description = db.Column(db.String(200))
    price = db.Column(db.Float)
    qty = db.Column(db.Integer)

    def __init__(self, name, description, price, qty):
        self.name = name
        self.description = description
        self.price = price
        self.qty = qty

# product schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'price', 'qty')
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstName', 'lastName', 'email', 'school', 'password')


# init schema
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)
user_schema = UserSchema()

# create a product
@app.route('/product', methods=['POST'])
def add_product():
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    qty = request.json['qty']

    new_product = Product(name, description, price, qty)

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

@app.route('/register', methods=['POST'])
def add_user():
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    email=request.json['email']
    school=request.json['school']
    password=request.json['password']
    new_user = Users(firstName, lastName, email, school, password)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)

@app.route('/login', methods=['POST'])
def login():
    email=request.json['email'][0]
    password=request.json['password']
    command = f"""SELECT * FROM users WHERE email='{email}'"""
    results = db.engine.execute(command)
    firstName=""
    lastName=""
    passwordFromDb=""
    school=""
    for r in results:
        passwordFromDb=r['password']
        firstName=r['firstName']
        lastName=r['lastName']
        school=r['school']
    #result=passwordFromDb
    #m=hashlib.sha1(result.encode()).hexdigest()
    user={
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "school": school
    }
    if(passwordFromDb==password):
        return jsonify(user), 200
    return jsonify({"message":"wrong"}), 404

# get all projects
@app.route('/project', methods=['GET'])
def get_projects():
    projects = pj.projectList
    return jsonify(projects)

# get all categories
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = pj.categoryList
    return jsonify(categories)

# get single project
@app.route('/project/<id>', methods=['GET'])
def get_project(id: int):
    id=int(id)
    project = pj.projectList[id-1]
    return jsonify(project)

# get all product
@app.route('/product', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result)

# get single product
@app.route('/product/<id>', methods=['GET'])
def get_product(id: int):
    product = Product.query.get(id)
    return product_schema.jsonify(product)


@app.route('/people', methods=['GET'])
def get_people():
    return jsonify(st.response)

# update a product
@app.route('/product/<id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)

    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    qty = request.json['qty']

    product.name = name
    product.description = description
    product.price = price
    product.qry = qty

    db.session.commit()

    return product_schema.jsonify(product)

# delete single product
@app.route('/product/<id>', methods=['DELETE'])
def delete_products(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return product_schema.jsonify(product)


# run server
if(__name__ == '__main__'):
    app.run(debug=True)
