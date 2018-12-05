![](https://ws1.sinaimg.cn/large/006tNbRwly1fvh59oez3dj304t04uaap.jpg)
# Data Visualization Project

### 1.website (https://www.dataviz2018.web.illinois.edu) 
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
**Source**:[Kaggle](https://www.kaggle.com/yelp-dataset/yelp-dataset "Yelp dataset from Kaggle")


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


****

### 3.Data Preprocessing

[Python code](https://github.com/Yiqing2018/Yelp-Data-Visualization/tree/master/preprocessing)  

### 4.workflow
![](https://ws1.sinaimg.cn/large/006tNbRwly1fxwgnztvhnj30qo0k0q3e.jpg)


### 5.Troubles  
There is D3(javascript) version conflict issue during my implementation.  
Solution: Not alike jquery, there is no built-in methods to solve this, but there is a general solution: Renaming it!  
Refernce: https://stackoverflow.com/questions/16156445/multiple-versions-of-a-script-on-the-same-page-d3-js





