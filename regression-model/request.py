# -*- coding: utf-8 -*-
"""
Created on Tue May 14 00:28:37 2019

@author: Rohit
"""

import requests
url = 'http://localhost:5000/api'
r = requests.post(url,json={'month':736968, 'active_cards': 161590})
print(r.json())