"""
================================================================================
SET ENVIRONMENT VARIABLES BEFORE RUNNING FLASK
# first activate the venv
./Scripts/activate

# env variables
$env:FLASK_APP = "web_app"
$env:FLASK_ENV = "development"
================================================================================
"""


from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

import pandas as pd
import numpy as np
import psycopg2
from sqlalchemy import create_engine
import matplotlib.pyplot as plt
import seaborn as sns

app = Flask(__name__)

def log(msg):
    print("\n" * 2)
    print(msg)
    print("\n" * 2)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/query/', methods=['POST'])
def square():
    query = request.form.get('query', 0)
    hue = request.form.get('hue', 0)

    print("\n" * 2)
    print(f"Query: {query}")
    print("Hue: ", hue)
    print(type(hue))
    print("\n" * 2)

    engine = 'postgresql://postgres:postgres@localhost:5432/postgres'
    database_engine = create_engine(engine)
    database_connection = database_engine.connect()

    try:
        df = pd.read_sql(query, database_connection)
    except:
        print("Query doesn't work")


    query_list = query.split(' ')
    print(query_list)

    print(df.head())

    if (query_list[1] != "*"):
        s = query_list[1]
        s = s[1:len(s) - 1]
        if hue == 'true':
            full_df = pd.read_sql("SELECT * FROM \"HEART_DISEASE_UPDATED\";", database_connection)
            sns.catplot(x=s, hue='HeartDisease', kind='count', data=full_df)
        elif hue == 'false':
            sns.catplot(x=s, data=df, kind="count")
        plt.savefig('static/temp.png')
    print("Done saving fig")

    database_connection.close()

    data = {'msg': 'Hello World!'}
    data = jsonify(data)
    return data