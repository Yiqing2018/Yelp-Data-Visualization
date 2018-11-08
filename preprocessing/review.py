import json
import pandas as pd
import csv
import datetime

data = []
i=1
with open('review.json',encoding='utf-8') as f:
   for line in f: 
      data.append(json.loads(line))
      i=i+1
      if(i==1000):
      	break
df = pd.DataFrame(data)
df=df[['business_id','date','stars','useful','text']]
df['business_name']=""


data = []
with open('business.json',encoding='utf-8') as f:
   for line in f: 
      data.append(json.loads(line))
df2 = pd.DataFrame(data)
df2 = df2[['business_id','name']]


for i in range(df['business_id'].size):
	id1=df['business_id'][i]
	for j in range(df2['business_id'].size):
		id2=df2['business_id'][j]
		if(id1==id2):
			df.at[i,'business_name']=df2['name'][j]
			break

del df['business_id']
df.to_csv('review.csv', sep=',', encoding='utf-8')



