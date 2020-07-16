---
title: LeetCode-No-53
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [最大子序和](https://leetcode-cn.com/problems/maximum-subarray)
>给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
>
>>示例:
>>
>>输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
>进阶:
>
>如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

# 题目分析
#####      1. 一开始我是想着，尝试双指针往中间收缩，只要收缩能增加和，那就保留当前状态，但不知道怎么描述收缩停止条件。
#####      2. 动态规划，当累积到第i个数时,有两种情况:
2.1 吃掉之前的sum,变得更大
2.2 之前的sum为负,要它干嘛,不吃,自立门户
#####      所以很简单，只需要判断前面的sum是否有价值就行了，因为是不能跳跃的，没价值你只能丢弃这个包袱，不能挑几项走。

# 题解代码
```
class Solution {
public:
    int maxSubArray(vector<int>& nums) 
    {   
        //想着两边双指针逼近收缩,不过不知道怎么确定收缩停止条件,暂时搁置

        //动态规划
        //当累积到第i个数时,有两种情况:
        //1.吃掉之前的sum,变得更大
        //2.之前的sum为负,要它干嘛,不吃,自立门户
        int sum=nums[0];
        int maxResult=nums[0];
        int L=nums.size();
        for(int i=1;i<L;i++)
        {
            if(sum>0)
                sum+=nums[i];
            else
                sum=nums[i];

            if(sum>maxResult)
                maxResult=sum;
        }

        return maxResult;


    }
};
```
