import pandas as pd
import numpy as np 
import sklearn 
from sklearn import linear_model
import pickle
import app
import requests


url = "https://raw.githubusercontent.com/tcgdex/price-history/master/en/base1/1.tcgplayer.json"  
response = requests.get(url)    
data = response.json()
print(data)
#data = data[]
#predict = "avg"

#x = np.array(data.drop(predict))
