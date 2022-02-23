import pymongo
import pandas as pd
import json
import certifi


print('welcome to python kaggle!!!');

#client = pymongo.MongoClient("mongodb+srv://renn:mikalina_11@cluster0.m22rc.mongodb.net/cluster0?retryWrites=true&w=majority")

#Add the mongoDb authentication
cluster = pymongo.MongoClient("mongodb+srv://renn:mikalina_11@cluster0.m22rc.mongodb.net/cluster0?retryWrites=true&w=majority", tlsCAFile=certifi.where())


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
