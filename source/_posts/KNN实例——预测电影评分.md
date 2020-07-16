---
title: KNN实例——预测电影评分
categories:
- DataScience
date: 2020-02-17 02:17:00
---
#  7 KNN实例——K最近邻预测电影评分
###    KNN即先确定散点距离的定义,然后对每个新点选取K个距离最近的点(想象一个图, 以新点为中心,不断扩大中心圆的面积,直到覆盖到k个点),用他们对新点进行投票.

###    1.数据准备
```
import pandas as pd
import numpy as np

r_cols=['user_id','movie_id','rating']
# uid,mid,rating的dataFrame
ratings=pd.read_csv("C:\Users\Sitch\Downloads\DataScienceCourse\ml-100k\u.data",sep='	',names=r_cols,usecols=range(3),encoding="ISO-8859-1")
# 创建movie属性表,属性有size(评价数/流行度),mean均分
movieProperties=ratings.groupby('movie_id').agg({'rating':[np.size,np.mean]})

# 标准化流行度,用来定义距离
movieNumRatings=pd.DataFrame(movieProperties['rating']['size'])
movieNormalizedNumRatings=movieNumRatings.apply(lambda x:(x-np.min(x))/(np.max(x)-np.min(x)))
```
- ####     df.loc\[\['label1','label1'....],\['label2']] ,label1列表指定行,label2指定列(可选),没有指定列则返回Series(1个label1)/DataFrame
- ####     xxx.get('mean')和xxx.mean的区别: 
- - ####     get返回对应数值
- - ####     .返回method/Series
- ####     Python3.x的map返回的是迭代器,Python2.x的map返回list

```
movieDict={}
with open(r"C:\Users\Sitch\Downloads\DataScienceCourse\ml-100k\u.item",encoding="ISO-8859-1") as f:
    temp=''
    for line in f:
        fields=line.rstrip('
').split('|')# 除去line末尾的换行符,以|分割
        movieID=int(fields[0])
        name=fields[1]
        genres=fields[5:25]
        genres=map(int,genres)
        movieDict[movieID]=(name,list(genres),movieNormalizedNumRatings.loc[movieID].get('size'),movieProperties.loc[movieID].rating.get('mean'))

# 获得了movieid对应的name,分类向量,标准化size,均分
print(movieDict[1])
```
###    2. 定义距离
- ####     类型向量余弦相似度
- ####     流行度的差的绝对值
```
from scipy import spatial
def ComputeDistance(a,b):# a,b分别为moviedict的索引号,即movieid
    a=movieDict[a]
    b=movieDict[b]
    # x[1]为类型向量
    genreDistance=spatial.distance.cosine(a[1],b[1])
    # x[2]为size
    popularityDistance=abs(a[2]-b[2])
    return genreDistance+popularityDistance

print(ComputeDistance(2,4))
print(movieDict[2])
print(movieDict[4])
    
```
###    3. 获取最近邻
- ####     key=operator.itemgetter(1).因为list里是tuple,要选取tuple\[1]进行排序, itemgetter(i)返回一个函数func,func(x)是取x\[i],即这里通过传递取值函数,实现了取tuple\[1]进行排序.
```
import operator
def getNeighbors(movieID,k):
    distances=[]# 距离集合,(movieid,distance)
    for movie in movieDict:
        if(movie!=movieID):
            distances.append((movie,ComputeDistance(movieID,movie)))
    
    distances.sort(key=operator.itemgetter(1))
    neighbors=[]# 距离排序后,选入前k个最近的
    for x in range(k):
        neighbors.append(distances[x][0])
    return neighbors

k=20
def PredictByKNN(movieID,k):
    avgRating=0
    for neighbor in getNeighbors(movieID,k):
        avgRating+=movieDict[neighbor][3]
        print(movieDict[neighbor])
    print("Predict rating is : "+str(avgRating/k))
    print("Actual Rating is : "+str(movieDict[movieID][3]))

PredictByKNN(20,50)

```
# 预测实例
###    预测3.28,实际3.41
###    一定程度上还是挺准确的, 仅仅利用了分类和流行度作为相似标准,实现简单但是效果挺好.
![示例运行](https://upload-images.jianshu.io/upload_images/19387483-5e1cef03df8b9d0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
