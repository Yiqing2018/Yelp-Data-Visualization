import json
import pandas as pd
import csv
import datetime

data = []
with open('user.json',encoding='utf-8') as f:
   for line in f: 
      data.append(json.loads(line))
df = pd.DataFrame(data)



def function1(fds):
	if(fds=="None"):
		return 0;
	friends_list=fds.split(',')
	return(len(friends_list))
df['friends_count'] = df.apply(lambda x: function1(x.friends), axis = 1)



def function2(date):
	datetime_obj = datetime.datetime.strptime(date, '%Y-%m-%d')
	cut=(datetime.datetime.now()-datetime_obj).days
	return cut
df['yelping_time'] = df.apply(lambda x: function2(x.yelping_since), axis = 1)

mylist=['name','user_id','yelping_since','friends','elite',
'compliment_cool','compliment_cute','compliment_funny',
'compliment_hot','compliment_list','compliment_more','compliment_note',
'compliment_photos','compliment_plain','compliment_profile','compliment_writer']

for i in range(len(mylist)):
    del df[mylist[i]] 

df.to_csv('user.csv', sep=',', encoding='utf-8')



