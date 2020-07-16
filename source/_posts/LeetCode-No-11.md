---
title: LeetCode-No-11
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# (盛最多水的容器)[https://leetcode-cn.com/problems/container-with-most-water]
>给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
>
>说明：你不能倾斜容器，且 n 的值至少为 2。
>
>图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
>
> ![image.png](https://upload-images.jianshu.io/upload_images/19387483-4f82d6d77b0bc922.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>
>>示例:
>>
>>输入: [1,8,6,2,5,4,8,3,7]
>>输出: 49

# 解题分析
- 双循环暴力法是人类本能,就不侃了,直接放上辣眼睛的效率结果

| 通过情况 | 时间 | 内存 | 语言 |
|----|-----|------|------|
| 通过 | 2436 ms | 9.8 MB | Cpp |

- **正解**: 
双指针向内收缩法.即一指针在头部,一指针在尾部,
而收缩时面积由两端之短决定,我们要找到更大的面积,则必定要改变两端之短,所以每次将短的那边往里收缩,遍历O(n).
- **正确性**: 
S=min(ai,aj) * (j-i),假如大的那一边往里收缩则S=min(bi,bj) * (j-i-1). 则min(bi,bj)要么是比收缩前最小值还小的值,要么是收缩前的最小值,所以S必定变小.
因此双指针移动大的一端时,得到的S2<=S1,肯定不是正确方向,所以可以省略掉这一系列的遍历,即只移动每对中小的那一端即可,省下O(n)的遍历不需要尝试,最终的遍历效率是O(n).

# 解题代码
```

class Solution {
public:
    int maxArea(vector<int>& height) 
    {   //双指针 思考正确性
        int i=0;
        int j=height.size()-1;
        int Area;
        int MaxArea=0;
        
        while(i<j)
        {
            int minvalue=min(height[i],height[j]);
            Area=minvalue*(j-i);
            if(Area>MaxArea)
                MaxArea=Area;
            
            if(height[i]==minvalue)
                i++;
            else
                j--;
        }
        
        return MaxArea;
    }
};
```
