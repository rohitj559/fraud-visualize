# -*- coding: utf-8 -*-
"""
Created on Mon May 13 23:45:52 2019

@author: Rohit
"""

# Importing the libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle
import requests
import time
import datetime

# Importing the dataset
dataset = pd.read_csv('data.csv')
# print(dataset['Month'])
dataset['Month'] = dataset['Month'].apply(lambda x: time.mktime(datetime.datetime.strptime(x, "%Y-%m").timetuple()))
# print(dataset['Month'])
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, 2].values

# Splitting the dataset into the Training set and Test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1/3, random_state = 0)

# Fitting Simple Linear Regression to the Training set
regressor = LinearRegression()
regressor.fit(X_train, y_train)

# Predicting the Test set results
y_pred = regressor.predict(X_test)

# Saving model to disk
pickle.dump(regressor, open('model.pkl','wb'))

# =============================================================================
# inp_date = '2017-10-01'
# inp_date_proc = dt.strptime(inp_date, '%Y-%m-%d').date()
# print(inp_date_proc)
# print(inp_date_proc.toordinal())
# 
# #!/usr/bin/env python
# from datetime import datetime
# import tzlocal  # $ pip install tzlocal
# 
# #unix_timestamp = float("1284101485")
# local_timezone = tzlocal.get_localzone()
# local_time = datetime.fromtimestamp(1506816000, local_timezone)
# print(local_time.strftime("%Y-%m-%d)"))
# 
# import time
# import datetime
# s = "2017-10-01"
# print(time.mktime(datetime.datetime.strptime(s, "%Y-%m-%d").timetuple()))
# =============================================================================

# Loading model to compare the results
model = pickle.load(open('model.pkl','rb'))
print(model.predict([[1506816000, 161590]]))

