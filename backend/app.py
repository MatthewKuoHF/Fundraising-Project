import sys
import json
sys.path.insert(1, './database')
sys.path.insert(1, './models')
import projects as pj
import statics as st
import os
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify, Response, send_file
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename
import hashlib
from pprint import pprint

app = Flask(__name__)
CORS(app)

# init app
basedir = os.path.abspath(os.path.dirname(__file__))
apiUrl = "http://localhost:5000"

# database
app.config['UPLOAD_FOLDER'] = os.path.join(basedir, 'database/images')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'database/db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MONGO_DBNAME']="Bidobo"
app.config['MONGO_URI']='mongodb://localhost:27017/Bidobo'

# init db, ma
db = SQLAlchemy(app)
ma = Marshmallow(app)
mongo = PyMongo(app)

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

# # test get image
# @app.route('/test', methods=['GET'])
# def test():
#     for filename in os.listdir()
#     return jsonify(output)

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

# create a project
@app.route('/upload', methods=['POST'])
def upload_project():
    cursor = mongo.db.projects.find().sort([('id', -1)]).limit(1)
    lastId = ""
    for c in cursor:
        lastId = str(int(c['id'])+1)

    saved_filename = os.path.join(app.config['UPLOAD_FOLDER'], lastId)
    image_url_array=[]
    os.mkdir(saved_filename)
    for image in request.files:
        filename=secure_filename(image)
        ext = request.files[filename].filename.split(".")[-1]
        fname_with_ext = image+"."+ext
        image_url_array.append(os.path.join(apiUrl, "image", lastId, fname_with_ext))
        request.files[image].save(os.path.join(saved_filename, fname_with_ext))

    email = request.form['email']
    command = f"""SELECT * FROM users WHERE email='{email}'"""
    results = db.engine.execute(command)
    author = ""
    authorId = ""
    for r in results:
        author = r['firstName'] + " " + r['lastName']
        authorId=r['id']
    project = {
        'id': lastId,
        'title': request.form['title'],
        'category': request.form['category'],
        'description': request.form['description'].replace("\n", ""),
        'briefDescription': request.form['briefDescription'],
        'images': image_url_array,
        'author': author,
        'authorId': str(authorId)
    }
    mongo.db.projects.insert_one(project)
    mongo.db.investment.insert_one({
            "id": lastId,
            "investment": []
            })
    return jsonify(form=request.form), 200

@app.route('/register', methods=['POST'])
def add_user():
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    email=request.json['email']
    school=request.json['school']
    password=request.json['password']
    new_user = Users(firstName, lastName, email, school, password)
    db.session.add(new_user)
    result = db.session.commit()
    command = f"""SELECT * FROM users WHERE email='{email}'"""
    results = db.engine.execute(command)
    uid = ""
    for r in results:
        uid = str(r['id'])
    mongo.db.investors.insert_one({"id": uid, "investment": []})
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
    uid=""
    for r in results:
        uid=r['id']
        passwordFromDb=r['password']
        firstName=r['firstName']
        lastName=r['lastName']
        school=r['school']
    #result=passwordFromDb
    #m=hashlib.sha1(result.encode()).hexdigest()
    user={
        "uid": uid,
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "school": school
    }
    if(passwordFromDb==password):
        return jsonify(user), 200
    return jsonify({"message":"wrong"}), 404

@app.route('/test', methods=['POST'])
def test():
    # for i in range(1, 8):
    #     print(i)
    #     mongo.db.investors.insert_one({"id": str(i), "investment": []})
    return "good", 200
    # mongo.db.investors.insert_one({"id": })

@app.route('/invest', methods=['POST'])
def invest():
    cursor = mongo.db.investment.find({"id": request.json['investProject']})
    investment=[]
    for doc in cursor:
        investment = doc['investment']
    investment.append({
        "timestamp": request.json['timestamp'], 
        "investAmount": float(request.json['investAmount']),
        "investor": request.json['uid']
        })
    mongo.db.investment.update_one({"id": request.json['investProject']}, {"$set": {"investment":investment}})
    
    cursor = mongo.db.investors.find({"id": request.json['uid']})
    investment=[]
    for doc in cursor:
        investment = doc['investment']
    investment.append({
        "timestamp": request.json['timestamp'], 
        "investProject": request.json['investProject'],
        "investAmount": float(request.json['investAmount'])
        })
    mongo.db.investors.update_one({"id": request.json['uid']}, {"$set": {"investment":investment}})
    
    # print(request.json)
    return "good", 200

# get all projects
@app.route('/project', methods=['GET'])
def get_projects():
    projects = mongo.db.projects
    output=[]
    for p in projects.find():
        output.append({
            'id': p['id'], 
            'title': p['title'], 
            'category': p['category'], 
            'briefDescription': p['briefDescription'], 
            'description': p['description'], 
            'images': p['images'],
            'author': p['author'], 
            'authorId': p['authorId'],
        })
    return jsonify(output)

# get all categories
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = mongo.db.categories
    output=[]
    for c in categories.find():
        output.append(c['name'])
    return jsonify(output)

# get single project
@app.route('/project/<id>', methods=['GET'])
def get_project(id: int):
    projects = mongo.db.projects
    p = projects.find_one({'id': id})
    if p:
        output = {
            'id': p['id'], 
            'title': p['title'], 
            'category': p['category'], 
            'briefDescription': p['briefDescription'], 
            'description': p['description'], 
            'images': p['images'],
            'author': p['author'], 
            'authorId': p['authorId'],
        }
        return jsonify(output), 200
    else:
        output = "No such project"
        return jsonify(), 404

# get investment
@app.route('/investment/<uid>', methods=['GET'])
def get_investment(uid: int):
    investment = mongo.db.investors
    p = investment.find_one({'id': uid})
    if p:
        output = {
            'id': p['id'], 
            'investment': p['investment']
        }
        for i in output['investment']:
            projects = mongo.db.projects
            project = projects.find_one({'id': i['investProject']})
            i['projectTitle'] = project['title']
            i['category'] = project['category']
        return jsonify(output), 200
    else:
        output = "No such investor"
        return jsonify(), 404

# get image
@app.route('/image/<project>/<filename>', methods=['GET'])
def get_image(project: int, filename: str):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], project, filename)
    try:
        return send_file(file_path, mimetype='image'), 200
    except:
        return send_file(app.config['UPLOAD_FOLDER']+"/not_found.png", mimetype='image'), 404

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
