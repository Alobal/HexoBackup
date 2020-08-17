---
title: KNN 实例——预测电影评分
categories:
- DataScience
date: 2020-02-17 02:17:00
---
#  7 KNN 实例——K 最近邻预测电影评分
    KNN 即先确定散点距离的定义，然后对每个新点选取 K 个距离最近的点（想象一个图，以新点为中心，不断扩大中心圆的面积，直到覆盖到 k 个点）, 用他们对新点进行投票。
##    1. 数据准备

```py
import pandas as pd
import numpy as np

r_cols=['user_id','movie_id','rating']
# uid,mid,rating 的 dataFrame
ratings=pd.read_csv("C:\Users\Sitch\Downloads\DataScienceCourse\ml-100k\u.data",sep='	',names=r_cols,usecols=range(3),encoding="ISO-8859-1")
# 创建 movie 属性表，属性有 size（评价数/流行度）,mean 均分
movieProperties=ratings.groupby('movie_id').agg({'rating':[np.size,np.mean]})

# 标准化流行度，用来定义距离
movieNumRatings=pd.DataFrame(movieProperties['rating']['size'])
movieNormalizedNumRatings=movieNumRatings.apply(lambda x:(x-np.min(x))/(np.max(x)-np.min(x)))
```

需要掌握的函数：
-      df.loc\[\['label1','label1'....],\['label2']] ,label1 列表指定行，label2 指定列（可选）, 没有指定列则返回 Series(1 个 label1)/DataFrame
-      xxx.get('mean') 和 xxx.mean 的区别：
- -     get 返回对应数值
- -    返回 method/Series
-     Python3.x 的 map 返回的是迭代器，Python2.x 的 map 返回 list

```py
movieDict={}
with open(r"C:\Users\Sitch\Downloads\DataScienceCourse\ml-100k\u.item",encoding="ISO-8859-1") as f:
    temp=''
    for line in f:
        fields=line.rstrip('
').split('|')# 除去 line 末尾的换行符，以|分割
        movieID=int(fields[0])
        name=fields[1]
        genres=fields[5:25]
        genres=map(int,genres)
        movieDict[movieID]=(name,list(genres),movieNormalizedNumRatings.loc[movieID].get('size'),movieProperties.loc[movieID].rating.get('mean'))

# 获得了 movieid 对应的 name, 分类向量，标准化 size, 均分
print(movieDict[1])
```
##    2. 定义距离
- ###     类型向量余弦相似度
- ###     流行度的差的绝对值
```py
from scipy import spatial
def ComputeDistance(a,b):# a,b 分别为 moviedict 的索引号，即 movieid
    a=movieDict[a]
    b=movieDict[b]
    # x[1] 为类型向量
    genreDistance=spatial.distance.cosine(a[1],b[1])
    # x[2] 为 size
    popularityDistance=abs(a[2]-b[2])
    return genreDistance+popularityDistance

print(ComputeDistance(2,4))
print(movieDict[2])
print(movieDict[4])
    
```
##    3. 获取最近邻

key=operator.itemgetter(1). 

因为 list 里是 tuple, 要选取 tuple\[1] 进行排序，``itemgetter(i)`` 返回一个函数 func,func(x) 是取 x\[i], 即这里通过传递取值函数，实现了取 tuple\[1] 进行排序。

```py
import operator
def getNeighbors(movieID,k):
    distances=[]# 距离集合，(movieid,distance)
    for movie in movieDict:
        if(movie!=movieID):
            distances.append((movie,ComputeDistance(movieID,movie)))
    
    distances.sort(key=operator.itemgetter(1))
    neighbors=[]# 距离排序后，选入前 k 个最近的
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
## 预测实例
预测 3.28, 实际 3.41

一定程度上还是挺准确的，仅仅利用了分类和流行度作为相似标准，实现简单但是效果挺好。

![示例运行](https://wx2.sinaimg.cn/mw1024/b8e57787gy1ggtsuupwq1j20xc08bgnn.jpg)
