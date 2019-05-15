# -*- coding: utf-8 -*-
"""
Created on Tue May 14 00:12:25 2019

@author: Rohit
"""

# Import libraries
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
import pickle
app = Flask(__name__)
# Load the model
model = pickle.load(open('model.pkl','rb'))
@app.route('/api/',methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    # print(data)
    
    df = pd.DataFrame(data, index=[0])
    # print(df)
    
    month = df.iloc[0]['Month']
    active_cards = df.iloc[0]['Active_Cards']
    # print(month)
    # print(active_cards)
    
    # Make prediction using model loaded from disk as per the data.
    prediction = model.predict([[month, active_cards]])
    # Take the first value of prediction
    output = prediction[0]
    print(output)
    return jsonify(output)
if __name__ == "__main__":
    app.run()
    

    