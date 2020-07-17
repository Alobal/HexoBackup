---
title: K折交叉验证
categories:
- DataScience
date: 2020-02-17 02:17:00
---
#  8 K折交叉验证SVC

###    1.一次训练/测试
####     虽然一次验证有96.7%准确率,但是因为数据集本身很小,训练集和测试集可能区别不大,还是可能过拟合.
```
import numpy as np
from sklearn.model_selection import cross_val_score,train_test_split
from sklearn import datasets
from sklearn import svm

iris=datasets.load_iris()
# 测试集有40%数据    
x_train,x_test,y_train,y_test=train_test_split(iris.data,iris.target,test_size=0.4,random_state=0)

clf=svm.SVC(kernel='linear',C=1).fit(x_train,y_train)

clf.score(x_test,y_test)

```

###    2. K折交叉验证
- ####     cross_val_score(...,cv=)cv为交叉验证的K值,划分K次,每次K-1份训练集,1份测试集,每次训练都会对clf模型进行fit, 所以clf不需要事先fit.
- ####     返回评分结果列表

```
scores=cross_val_score(clf,iris.data,iris.target,cv=5)

print(scores)
print(scores.mean())
```
<br>
![简单示例结果](https://wx4.sinaimg.cn/mw1024/b8e57787gy1ggtsuv1f83j20ko05o74c.jpg)
