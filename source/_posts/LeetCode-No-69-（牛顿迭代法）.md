---
title: LeetCode-No-69-（牛顿迭代法）
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [x的平方根](https://leetcode-cn.com/problems/sqrtx)
实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:
>
>输入: 4
输出: 2

示例 2:
>
>输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。

# 题目分析
1. 首先直接计算平方根不太现实，所以这是一个在有序的1~x中查找出平方根的问题。
2. 查找有序整数中的特定值，正常思路即**二分查找**，实现也简单。
3. **递归缩小求解：** 
$$\sqrt{x}=2*\sqrt{rac{x}{4}}$$
因此可以递归找到易解的小x，然后再回溯整合到原x。
>注意为什么选择2作为系数进行递归呢？
——x缩小和放大2的倍数，可以通过位操作实现，效率极高。

递归式为：```mySqrt(x)=mySqrt(x>>2)<<1```
4. 针对这个计算平方根的特定问题，有 **牛顿迭代法**：
>**牛顿法**（英语：Newton's method）又称为**牛顿-拉弗森方法**（英语：Newton-Raphson method），它是一种在实数域和复数域上近似求解方程的方法。方法使用函数$f(x)$ 的泰勒级数的前面几项来寻找方程的根。


$$x_{k+1}=rac{1}{2}[x_k+rac{x}{x_k}]$$
根据精度要求，$x_k$和$x_{k+1}$收敛后差距小于1即可返回结果。

**迭代求解示意**：![迭代示意图，图源
(https://leetcode-cn.com/problems/sqrtx/solution/niu-dun-die-dai-fa-by-loafer/)](https://upload-images.jianshu.io/upload_images/19387483-cf905b78f3551337.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如上图所示，想求$\sqrt{a}$，图示a=2
先随便取xi=4，然后找到过(xi,yi)的切线，且$f(x)=x^2-a$的导数是$2x$ 
即切线方程$f(x)-(x_i^2-a)=2x_i(x-xi)$
显而易见这个切线与x轴的交点得$x_{i+1}=rac {2x_i^2-(x_i^2-a)}{2x_i}= rac{1}{2} (x_i+rac{a}{x_i}) $
即得$x_{i+1}$比$x_{i}$更接近解$\sqrt{a}$。

# 牛顿迭代题解代码
```
class Solution 
{
public:
    int mySqrt(int x) 
    {
        //牛顿迭代
        if(x<=1)
            return x;
        //注意long类型
        long last=x/2;
        long cur =(last+x/last)/2;
        while(abs(last-cur)>=1)
        {   
            last=cur;
            cur=(cur +x/ cur) / 2.0 ;
            if(cur<=x/cur)
                return cur;
        }

        return cur;
    }
    
};
```
