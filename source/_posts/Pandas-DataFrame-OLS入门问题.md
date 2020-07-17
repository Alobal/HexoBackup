---
title: Pandas-DataFrame-OLS入门问题
categories:
- DataScience
date: 2020-02-17 02:17:00
---
# 一. 列替换问题----Series分为index-values, 迭代是副本,不对原数据造成影响
>对于Price列,值为字符串类型, 形同 "单价12345元/平米"
怎么把12345提取出来并且替换原字符串值

###   背景环境: 想取unitPrice中每项字符串换成int
```
import re
import pandas as pd
def Str2Price(oristr):# 提取oristr中的数字并返回int结果
    pattern=re.compile("\d+")
    result=pattern.findall(oristr)
    return int(result[0])

oridata=pd.read_csv("C:\Users\Sitch\Downloads\二手房.csv")
```
###    1. for in遍历只是取到迭代器,无法修改本体
```
for i in oridata['unitPrice']:
    i=Str2Price(i)

oridata.head()
```
####    结果失败: ![本体值没变](https://wx1.sinaimg.cn/mw1024/b8e57787gy1ggtsuupcxhj20cy07tq30.jpg)

###    2. for i in (0,series.size)遍历
```
for i in range(0,oridata['unitPrice'].size):
    oridata['unitPrice'][i]=Str2Price(oridata['unitPrice'][i])
```
####    错误: Series[i]为index-value对 ,取Series[i]取到的是对, 无法调用函数进行转换

###    3. 正解: 取Series.values[i]
```
for i in range(0,oridata['unitPrice'].values.size):
    oridata['unitPrice'].values[i]=Str2Price(oridata['unitPrice'].values[i])
```
####    结果成功:
![可以看到成功替换](https://wx3.sinaimg.cn/mw1024/b8e57787gy1ggtsuw05xzj20af06kmx4.jpg)


# 二. 值成功整理之后OLS依然错误:  Pandas data cast to numpy dtype of object. Check input data with np.asarray(data).
```
import re
import pandas as pd
import statsmodels.api as sm
def Str2Price(oristr):
    pattern=re.compile("\d+")
    result=pattern.findall(oristr)
    return int(result[0])


oridata=pd.read_csv("C:\Users\Sitch\Downloads\二手房.csv")

for i in range(0,oridata['unitPrice'].values.size):
    oridata['unitPrice'].values[i]=Str2Price(oridata['unitPrice'].values[i])

for i in range(0,oridata['attentionNum'].values.size):
    oridata['attentionNum'].values[i]=Str2Price(oridata['attentionNum'].values[i])
oridata.head()
x=oridata[['attentionNum']]
y=oridata[['unitPrice']]
x1=sm.add_constant(x)

est=sm.OLS(y,x1).fit()
est.summary()
```
![运行报错](https://wx3.sinaimg.cn/mw1024/b8e57787gy1ggtsuuug01j20x402f749.jpg)

##  解决方法: 在传参给OLS的y和x1后面,加上强制类型转换 .astype(float)
>但是字符串直接转成float时依然有这个错误, 有点奇怪 理应和astype(float)作用相同
——查看类型发现float是float类型,astype(float)是numpy.float64类型.....
####    即:
```
est=sm.OLS(y.astype(float),x1.astype(float)).fit()
```
####    成功运行: (r方值小的不能再小的破单元模型= =
![成功OLS结果](https://wx3.sinaimg.cn/mw1024/b8e57787gy1ggtsuuuyz1j20l00fowf2.jpg)

# 附OLS常用模型:
```
import statsmodels.api as sm #  最小二乘
from statsmodels.stats.outliers_influence import summary_table #  获得汇总信息
x = sm.add_constant(daily_data['temp']) #  线性回归增加常数项 y=kx+b
y = daily_data['cnt']
regr = sm.OLS(y, x) #  普通最小二乘模型，ordinary least square model
res = regr.fit()    # res.model.endog
#  从模型获得拟合数据
st, data, ss2 = summary_table(res, alpha=0.05) #  置信水平alpha=5%，st数据汇总，data数据详情，ss2数据列名
fitted_values = data[:,2]  # 等价于res.fittedvalues
————————————————
模型原文链接：https://blog.csdn.net/cymy001/article/details/78364652
```
