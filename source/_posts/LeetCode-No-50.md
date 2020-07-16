---
title: LeetCode-No-50
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [pow(x,n)](https://leetcode-cn.com/problems/powx-n)
>实现 pow(x, n) ，即计算 x 的 n 次幂函数。
>
>>示例 1:
>>
>>输入: 2.00000, 10
输出: 1024.00000
>
>>示例 2:
>>
>>输入: 2.10000, 3
输出: 9.26100
>
>>示例 3:
>>
>>输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
>说明:
>
>-100.0 < x < 100.0
n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。

# 题目分析
###    数学思路, 快速幂算法
####     ----因为x^n^可以分解成x^n/2^ * x^n/2^, 所以可以把n二分下去 变成logN的快速幂算法
####     另外注意: 数值越界, 奇偶的二分的区别

# 题解代码
```
class Solution {
public:
    double myPow(double x, int n) 
    {   //????通不过45,90啊
        //只有奇偶递归的话,数值变大了就有问题
        if(n==INT_MIN)//注意-n 和 n 的越界范围不一样
            return 1/(myPow(x,INT_MAX)*x);
        else if(n<0)
            return 1/myPow(x,-n);

        
        if(n==0)
            return 1.0;
        else if(n==1)
            return x;

        double half=myPow(x,n/2);
        if(n%2==0)
            return half*half;
        else //(n%2!=0)
            return half*half*x;            
    }
};
```
