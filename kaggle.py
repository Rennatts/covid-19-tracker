import pymongo
import pandas as pd
import json
import certifi
import os
from dotenv import load_dotenv

load_dotenv()



MONGO_URI = os.getenv('MONGODB_URI')


print('welcome to python kaggle!!!');


#Add the mongoDb authentication
cluster = pymongo.MongoClient("{}".format(MONGO_URI), tlsCAFile=certifi.where())

#post = {"_id": 0, "name": "time", "score": 10}

#get the csv data
df = pd.read_csv("covid-variants.csv")

#print(df.head());

#convert csv data into json format
data = df.to_dict(orient = "records")

#print(data);

#get the cluster
db = cluster["cluster0"]

#create the database
collection = db["coviddatas"]


#insert many data into the created database
collection.insert_many(data)
