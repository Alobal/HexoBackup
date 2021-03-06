---
title: LeetCode No.264
date: 2021-02-31 17:01:41
categories:
- LeetCode
tags:
- 动态规划
---
# [丑数II](https://leetcode-cn.com/problems/ugly-number-ii)
编写一个程序，找出第 n 个丑数。

丑数就是质因数只包含 2, 3, 5 的正整数。

示例:

>输入: n = 10
>输出: 12
>解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。

说明:  

1 是丑数。
n 不超过1690。

# 算法思想

显而易见，我们要找分解式为 2 3 5 构成的数。也容易想到，**后面的丑数必然是由前面的丑数乘 2 3 5 得到的**。

但是从前往后顺序计算乘积，并且顺序存放的话，例如`` 2*5 > 3*3``。可以看出先后顺序错位了，10先存放，而9后存放。

因此要取计算的所有乘积的最小值, 这个最小值必然是从小到大的下一个ugly，解决了存放的错位问题。

### 但是对哪些乘积取最小值呢？

前面的数都计算一遍乘积的话计算量太大

想一下，假如有 2\*3， 那么对所有x>2,x\*3必然没有2\*3小，因此对 3 这个因子，只需要计算它和2的乘积即可。后面的肯定不是我们要找的最小乘积。

因此，其实只要**为每个因子找到当前最小的乘数即可**。

### 怎么确定每个因子的当前最小乘数呢？

要找当前最小的，首先要确定这个因子的候选乘数有哪些，然后在里面找最小的。

#### 哪些是候选乘数？

我们找当前最小乘数是为了找出下一个最小的丑数。假如要生成所有丑数的话，每个因子都必然要遍历去乘每一个数。

换句话说，对这个因子，所有数都是要乘的，跑不了的，即所有没乘过的数，都是它的候选乘数。

#### 最小的候选乘数
既然所有数都要乘，而我们的数又是从小到大排列的，那么从前往后，第一个没有乘过的就是当前最小乘数。

代码角度来看，即当前乘数为nums[i]，每乘一次，即i++,准备乘下一个数即可。

# 解题代码
注意我们有三个因子，因此需要用三个指针对三个因子维护他们的最小乘数。

```cpp
class Solution {
public:
    int nthUglyNumber(int n) 
    {
        //动态规划，后面的数必然是前面的数乘 2 3 5得到
        //但是顺序进行的话 2*5 > 3*3 ，可以看出大小顺序不能保证，因此要取几个乘积的最小值,这个最小值必然是从小到大的下一个ugly
        //但是对哪些乘积取最小值呢？前面的数都计算一遍的话计算量太大。
        //想一下，假如有 2*3， 那么对所有x>2,x*3必然没有2*3小，因此对 3 这个乘积，其实只要找到最小的乘数即可，其他乘积也是一样
        //怎么确定每个乘积的最小乘数呢？显然每个乘积都要乘每个数，那么从前往后找没乘过的 就是当前最小乘数

        vector<int> nums(n,0);
        nums[0]=1;
        int p2=0,p3=0,p5=0;
        for(int i=1;i<n;i++)//除1外 生成n-1个丑数
        {
            int ugly_i=min(min(nums[p2]*2,nums[p3]*3),nums[p5]*5);//取当前乘积最小值
            nums[i]=ugly_i;
            //判断用的是哪个乘积，它的最小乘数要变了，注意重复的也算
            if(ugly_i==nums[p2]*2) p2++;
            if(ugly_i==nums[p3]*3) p3++;
            if(ugly_i==nums[p5]*5) p5++;

        }

        return nums[n-1];

    }
};
```