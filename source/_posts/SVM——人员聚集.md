---
title: SVM——人员聚集
categories:
- DataScience
date: 2020-02-17 02:17:00
---
###    1 创造数据
```
%matplotlib inline
from pylab import *
import numpy as np

# N 个人 K 个簇
def CreateClusteredData(n,k):
    pointPerCluster=float(n)/k
    x=[]
    y=[]
    for i in range(k):
        incomeCentroid=np.random.uniform(20000.0,200000.0)
        ageCentroid=np.random.uniform(20.0,70.0)
        for j in range(int(pointPerCluster)):
            x.append([np.random.normal(incomeCentroid,10000.0),np.random.normal(ageCentroid,5.0)])
            y.append(i)# 保存已知簇信息
    x=np.array(x)
    y=np.array(y)
    return x,y

(x,y)=CreateClusteredData(100,5)

plt.scatter(x[:,0],x[:,1],c=y.astype(np.float))
```
###    2 线性SVC分簇 
```
from sklearn import svm,datasets
C=1.0
svc=svm.SVC(kernel='linear',C=C).fit(x,y)
```
###    3 可视化处理
###    - [X,Y]=meshgrid(x,y), 将x,y分别矩阵化,返回对应矩阵.
> x=-3:1:3;y=-2:1:2;
>　[X,Y]= meshgrid(x,y);
>　　这里meshigrid（x，y）的作用是产生一个以向量x为行，向量y为列的矩阵，而x是从-3开始到3，每间隔1记下一个数据，并把这些数据集成矩阵X；同理y则是从-2到2，每间隔1记下一个数据，并集成矩阵Y。即
>　　X=
>　　-3 -2 -1 0 1 2 3
>　　-3 -2 -1 0 1 2 3
>　　-3 -2 -1 0 1 2 3
>　　-3 -2 -1 0 1 2 3
>　　-3 -2 -1 0 1 2 3
>　　Y =
>　　-2 -2 -2 -2 -2 -2 -2
>　　-1 -1 -1 -1 -1 -1 -1
>　　0 0 0 0 0 0 0
>　　1 1 1 1 1 1 1
>　　2 2 2 2 2 2 2
>
>附注：例题中meshgrid(-3:1:3,-2:1:2);因为-3:1:3产生的是含有7个数字的行向量；-2:1:2产生的是含有5个数字的行向量。所以该命令的结果是产生5*7的矩阵（X,Y都是5*7的矩阵；其中X是由第一个含7个元素的行向量产生，Y是由第二个行向量产生）
>
>原文链接：https://blog.csdn.net/baoqian1993/article/details/52116164


###    - numpy.ravel(array-like,order='C') , 将array-like扁平化,order为扁平化顺序, 'C'表示行优先
>
>\>>> a = np.arange(12).reshape(2,3,2).swapaxes(1,2); a
array([[[ 0,  2,  4],
        [ 1,  3,  5]],
       [[ 6,  8, 10],
        [ 7,  9, 11]]])
\>>> a.ravel(order='C')
array([ 0,  2,  4,  1,  3,  5,  6,  8, 10,  7,  9, 11])
\>>> a.ravel(order='K')
array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11])

###    - np.c\_ 左右合并矩阵,要求行数相同, 同理还有np.r_, 上下合并矩阵,要求列数相同 (注意numpy中一维列向量是横着的....)
>\>>> np.c_[np.array([1,2,3]), np.array([4,5,6])]
array([[1, 4],
       [2, 5],
       [3, 6]])
>\>>> np.c_[np.array([[1,2,3]]), 0, 0, np.array([[4,5,6]])]
array([[1, 2, 3, ..., 4, 5, 6]])

###    - contourf(x,y,z,cmap=)  plt用来绘制等高线的函数,x,y坐标,z为高度,cmap设置颜色,这里用来画等标记图

```
def plotPredictions(clf,x,y,color):
    xx,yy=np.meshgrid(np.arange(0,250000,10),np.arange(10,90,0.5)) ##  xx=有age行的income,yy=有income列的age
    z=clf.predict(np.c_[xx.ravel(),yy.ravel()]) ##  c_最终组合出扫描数组,即[0~25000][10~90]. 预测返回分类信息
    plt.figure(figsize=(8,6))
    z=z.reshape(xx.shape)
    plt.contourf(xx,yy,z,cmap=plt.cm.Paired,alpha=0.8)
    plt.scatter(x,y,c=color)
    plt.show()
    
plotPredictions(svc,x[:,0],x[:,1],y.astype(np.float))

```
![结果图](https://upload-images.jianshu.io/upload_images/19387483-af236da1dc4077eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
