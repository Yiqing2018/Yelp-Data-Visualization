import json
import pandas as pd
import csv

data = []
with open('business.json',encoding='utf-8') as f:
   for line in f: 
      data.append(json.loads(line))
df = pd.DataFrame(data)
del df['attributes']
del df['address']
del df['hours']
del df['neighborhood']

ctg = df['categories']


keyword_count={}


Mylist=['Tours','Food',' Restaurants','French','Street Vendors',
'Coffee & Tea','Japanese','Pizza','Fashion','Italian','Pakistani',
'Indian','Mexican','Sandwiches','Bars','Bakeries','Grocery','Cafes',
'Salad','Soup','Gyms','Health & Medical','Fast Food','American (Traditional)']

for i in range(len(Mylist)):
	keyword_count[Mylist[i]]=0

for i in range(df['categories'].size):
	if(ctg[i] != None):
		keyword=ctg[i].split(',')
		for j in range(len(keyword)):
			for z in range(len(keyword_count)):
				if(keyword[j] in Mylist):
					keyword_count[keyword[j]]=keyword_count[keyword[j]]+1

my_dict = keyword_count
with open('business_category.csv', 'w') as f:
    for key in my_dict.keys():
        f.write("%s,%d\n"%(key,my_dict[key]))

del df['categories']
df.to_csv('business.csv', sep=',', encoding='utf-8')



