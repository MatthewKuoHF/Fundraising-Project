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
from datetime import datetime, timedelta
import random
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

# schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstName', 'lastName', 'email', 'school', 'password')


# init schema
user_schema = UserSchema()

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
    mongo.db.investors.insert_one({"id": uid, "investment": [], "liked": []})
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

# like a project
@app.route('/like/<uid>/<pid>', methods=['POST'])
def like(uid: str, pid: str):
    like = mongo.db.investors
    p = like.find_one({'id': uid})
    if p:
        if(not(str(pid) in p['liked'])):
            p['liked'].append(pid)
        p['liked'].sort()
        mongo.db.investors.update_one({"id": uid}, {"$set": {"liked": p['liked']}})
        liked = []
        for i in p['liked']:
            projects = mongo.db.projects
            project = projects.find_one({'id': i})
            liked.append({
                "id": i, 
                "title": project['title'], 
                "category": project['category']
                })
        return jsonify(liked), 200
    else:
        output = "No such investor"
        return jsonify(), 404

# like a project
@app.route('/unlike/<uid>/<pid>', methods=['POST'])
def unlike(uid: str, pid: str):
    like = mongo.db.investors
    p = like.find_one({'id': uid})
    if p:
        if(str(pid) in p['liked']):
            p['liked'].remove(str(pid))
        p['liked'].sort()
        mongo.db.investors.update_one({"id": uid}, {"$set": {"liked": p['liked']}})
        liked = []
        for i in p['liked']:
            projects = mongo.db.projects
            project = projects.find_one({'id': i})
            liked.append({
                "id": i, 
                "title": project['title'], 
                "category": project['category']
                })
        return jsonify(liked), 200
    else:
        output = "No such investor"
        return jsonify(), 404

@app.route('/generate', methods=['POST'])
def generate_data():
    cur = datetime(2020, 3, 19, 0, 0)
    # for i in range(0, 150):
    for i in range(0, 0):
        rand_hr = random.randint(0, 2)
        rand_min = random.randint(0, 60)
        rand_sec = random.randint(0, 60)
        cur += timedelta(hours=rand_hr, minutes=rand_min, seconds=rand_sec)
        
        timestamp = str(cur).replace(' ', '').replace('-', '').replace(':', '')
        investAmount = random.randint(5, 3000)
        investor = str(random.randint(1, 10))
        investProject = str(random.randint(1, 8))

        investment_data = {
            "timestamp": timestamp,
            "investAmount": investAmount,
            "investor": investor
        }

        investor_data = {
            "timestamp": timestamp,
            "investProject": investProject,
            "investAmount": investAmount
        }

        cursor = mongo.db.investment.find({"id": investProject})
        investment=[]
        for doc in cursor:
            investment = doc['investment']
        investment.append(investment_data)
        mongo.db.investment.update_one({"id": investProject}, {"$set": {"investment":investment}})
    
        cursor = mongo.db.investors.find({"id": investor})
        investment=[]
        for doc in cursor:
            investment = doc['investment']
        investment.append(investor_data)
        mongo.db.investors.update_one({"id": investor}, {"$set": {"investment":investment}})
        # print(investment, investor_data)
    return "good", 200
    
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
    return jsonify(output), 200

# get all projects given author
@app.route('/author/<pid>', methods=['GET'])
def get_author(pid: int):
    projects = mongo.db.projects
    p = projects.find({'authorId': pid})
    output=[]
    for i in p:
        output.append({
            "title": i['title'],
            "pid": i['id'],
            "category": i['category'],
            "author": i['author'],
            "briefDescription": i['briefDescription'],
            "images": i["images"]
        })
    command = f"""SELECT * FROM users WHERE id='{pid}'"""
    results = db.engine.execute(command)
    firstName=""
    lastName=""
    email=""
    school=""
    for r in results:
        uid=r['id']
        firstName=r['firstName']
        lastName=r['lastName']
        school=r['school']
        email=r['email']

    author={
        "uid": uid,
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "school": school
    }
    result={
        "author": author,
        "projects": output
    }
    return jsonify(result), 200

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

# get liked projects
@app.route('/liked/<uid>', methods=['GET'])
def get_liked(uid: int):
    like = mongo.db.investors
    p = like.find_one({'id': uid})
    if p:
        output = {
            'id': p['id'], 
            'liked': p['liked']
        }
        liked = []
        for i in output['liked']:
            projects = mongo.db.projects
            project = projects.find_one({'id': i})
            liked.append({
                "id": i, 
                "title": project['title'], 
                "category": project['category']
                })
        return jsonify(liked), 200
    else:
        output = "No such investor"
        return jsonify(), 404

# get range
@app.route('/range/<pid>', methods=['GET'])
def get_range(pid: int):
    # range: 0-200, 201-400, 401-600, 601-800, 801-1000, 1000+
    investment = mongo.db.investment
    p = investment.find_one({'id': pid})
    r = [
        {"range": "0-200", "amount": 0 },
        {"range": "201-400", "amount": 0 },
        {"range": "401-600", "amount": 0 },
        {"range": "601-800", "amount": 0 },
        {"range": "801-1000", "amount": 0 },
        {"range": "1001-1200", "amount": 0 },
        {"range": "1201-1400", "amount": 0 },
        {"range": "1401-1600", "amount": 0 },
        {"range": "1601-1800", "amount": 0 },
        {"range": "1801-2000", "amount": 0 },
        {"range": "2000+", "amount": 0 },
    ]
    if p:
        for i in p['investment']:
            if(i['investAmount']<=200):
                r[0]['amount']+=i['investAmount']
            elif(i['investAmount']<=400):
                r[1]['amount']+=i['investAmount']
            elif(i['investAmount']<=600):
                r[2]['amount']+=i['investAmount']
            elif(i['investAmount']<=800):
                r[3]['amount']+=i['investAmount']
            elif(i['investAmount']<=1000):
                r[4]['amount']+=i['investAmount']
            elif(i['investAmount']<=1200):
                r[5]['amount']+=i['investAmount']
            elif(i['investAmount']<=1400):
                r[6]['amount']+=i['investAmount']
            elif(i['investAmount']<=1600):
                r[7]['amount']+=i['investAmount']
            elif(i['investAmount']<=1800):
                r[8]['amount']+=i['investAmount']
            elif(i['investAmount']<=2000):
                r[9]['amount']+=i['investAmount']
            else:
                r[10]['amount']+=i['investAmount']
        return jsonify(r), 200
    else:
        return jsonify(), 404

# get trend
@app.route('/trend/<pid>', methods=['GET'])
def get_trend(pid: int):
    investment = mongo.db.investment
    p = investment.find_one({'id': pid})
    if p:
        output = {
            'id': p['id'], 
            'investment': p['investment']
        }
        days=[0]*20
        count=0
        day=''
        for i in p['investment']:
            i['timestamp']=i['timestamp'][0:8]
            if(day==i['timestamp']):
                days[count]+=int(i['investAmount'])
            else:
                days[count+1]=days[count]
                count+=1
                days[count]+=int(i['investAmount'])
            day = i['timestamp']
        i=0
        length=len(days)
        while(i<length):
            if(days[i]==0):
                days.remove(days[i])
                length-=1
                continue
            i+=1
        days=days[-7:]
        # lastDay = datetime(int(day[0:4]), int(day[4:6]), int(day[6:8]))
        lastDay = datetime(2020, 3, 26)
        result=[]
        for i in range(len(days)):
            result.append({'date': str(lastDay).replace('-', '')[0:8], 'sum': days[-(i+1)]})
            lastDay -= timedelta(days=1)
        result.reverse()
        return jsonify(result), 200

    else:
        output = "No such project"
        return jsonify(), 404

# update an account
@app.route('/update/<uid>', methods=['PUT'])
def update_account(uid):
    email=request.json['email']
    password=request.json['password']
    firstName=request.json['firstName']
    lastName=request.json['lastName']
    school=request.json['school']
    command = f"""UPDATE users SET password='{password}', firstName='{firstName}', lastName='{lastName}', school='{school}' WHERE email='{email}'"""
    results = db.engine.execute(command)
    db.session.commit()

    return jsonify(), 200

# run server
if(__name__ == '__main__'):
    app.run(debug=True)
