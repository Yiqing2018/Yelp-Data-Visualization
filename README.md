![](https://ws1.sinaimg.cn/large/006tNbRwly1fvh59oez3dj304t04uaap.jpg)
# Data Visualization Project



## Contents

* [website](#website)
* [Dataset](#Dataset)
* [Project Plan](#Project-Plan)
    * [data collection](#data-collection)
    * [data cleaning](#data-cleaning)
    * [data visualization](#ata-visualization)
    * [implementations](#implementations)
* [workflow](#workflow)
* [Trouble/Challenge](#Trouble/Challenge)


### website (https://www.dataviz2018.web.illinois.edu) 
### demo video (https://www.youtube.com/watch?v=aZXAi0XovKE&feature=youtu.be)

<p align="center">

  <img width="400" src="https://ws1.sinaimg.cn/large/006tNbRwly1fx1e0u1ly4j31kw1md1l1.jpg">
  
  <img width="350" src="https://ws3.sinaimg.cn/large/006tNbRwly1fx1dyyqviuj31kw1vh7e8.jpg">

</p>

<p align="center">


  <img width="250" src="https://ws3.sinaimg.cn/large/006tNbRwly1fx1dyfxv8gj31kw3bftr9.jpg">
  <img width="250" src="https://ws3.sinaimg.cn/large/006tNbRwly1fx1dymiixpj31kw2upayv.jpg">
  <img width="250" src="https://ws1.sinaimg.cn/large/006tNbRwly1fx1dyrsnlqj31kw35hnge.jpg">

</p>



### 2.Dataset
A trove of reviews, businesses, users, tips and check-in data from Yelp  
**Size**: 3GB  
**Source**:[Kaggle](https://www.kaggle.com/yelp-dataset/yelp-dataset)


#### part of attributes of dataset

|yelp_academic_dataset_user.json|yelp_academic_dataset_business.json|yelp_academic_dataset_review.json|
|---|---|---
|user_id|business_id|review_id
|name|name|user_id
|review_count|city|business_id
|yelping_since|state|stars
|friends|latitude|date
|average_stars|longitude|text
|fans|stars|text
|funny|review_count|funny
|cool|categories|cool
  
these attributes are what I am gonna use in the project, they satify what I need and no nested structure.  

***

### 3.Project Plan
#### data collection  
obtain the data, I collected the data from Kaggle. If it is needed for further research, I would use Python to grab some online data as supplement.  

#### data cleaning 
[Python code](https://github.com/Yiqing2018/Yelp-Data-Visualization/tree/master/preprocessing)  
clean the data, including filtering (remove all but the data of interest), ordering the data…  

For example:  
select first 1000 records with selected attributes
```
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

```
delete attribute from dataframe
```
del df['business_id']
```
do the JOIN in python 
I use the instince method, break until find out the match
```
for i in range(df['business_id'].size):
	id1=df['business_id'][i]
	for j in range(df2['business_id'].size):
		id2=df2['business_id'][j]
		if(id1==id2):
			df.at[i,'business_name']=df2['name'][j]
			break
```



convert the dataframe to csv file
```
df.to_csv('review.csv', sep=',', encoding='utf-8')
```

#### data visualization
after cleaning the data, we will use some visualization methods to take a look at the properties of our data. It is necessary to put the data into some structure, which help us understand them. And also we can get some inspirations for next from this!  Based on these, I decided to focus on these questions:  
- the distribution of user star? more high-quality cutomers?  
- Customer Stickiness: are old users more loyal?  
- What kind of business are popular on Yelp?
- find out the the most reviewed business on Yelp
- Distribution of All Reviews, is it difficult to get a high score for a business owner?  
- During what time period, people tend to leave a comment? 
you may find out answers on my website: [click](https://www.dataviz2018.web.illinois.edu)

#### implementations
front end: html, css, bootstrap, javascript(d3)  
back end: MySQL, PHP deployed on cPanel 

### 4.workflow

<p align="center">
  <img width="600" src="https://ws2.sinaimg.cn/large/006tNbRwly1fxwptmioujj30qo0k0mxn.jpg">

</p>

### 5.Trouble/Challenge  
- D3(javascript) version conflict  

**Solution**: Not alike jquery, there is no built-in methods to solve this, but there is a general solution: Renaming it!  
**Refernce**: https://stackoverflow.com/questions/16156445/multiple-versions-of-a-script-on-the-same-page-d3-js

- access the database via PHP  

**js**
```
var ajax=new XMLHttpRequest();
var method="GET";
var url="php/line.php"
var asynchronous=true;
ajax.open(method,url,asynchronous);
ajax.send();
ajax.onreadystatechange=function(){
     if (ajax.readyState==4 && ajax.status==200){
        var items=JSON.parse(this.responseText);
        var data=[]
        for(var i=0;i<items.length;i=i+12){
            var monthData=[];
            for(var j=0;j<12;++j){
                // items[i+j]
                monthData.push({month:items[i+j]['month'],value:parseInt(items[i+j]['count'],10)})
            }
            data.push({name:items[i]['year'],monthlyData:monthData})
        }
        DrawMultiLineChart(data, "divChartTrends");
     }
}
```

