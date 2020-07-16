---
title: LeetCode-No-46
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [全排列](https://leetcode-cn.com/problems/permutations)
>给定一个没有重复数字的序列，返回其所有可能的全排列。
>
>>示例:
>>
>>输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]

# 思路分析
- 由排列特性我们的直觉思路是, 首先固定第一个数, 然后排列后面的数 ,同时后面的排列也是这种**固定+排序**的思路进行. 因此很显然可以想到是一种递归回溯的算法.

- 递归到字符串尾很简单, 但需要注意的是怎么得到其他的组合情况.

 ~~我首先设想的是进行一种遍历, 首先确定第一个数, 然后选取未被排列过的剩下的数, 逐一形成n!个排列组合, 但好像没想到简便的方法实现~~

参考题解后得知, 想要不同的排列组合, 本质在于数的顺序不同, 因此我们只要将数进行交换, 然后递归到底输出交换后的组合即可.

# 解答代码
```
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) 
    {   
        vector<vector<int>> result;
        backtrace(nums,result,0);
        return result;
        
    }
    
    void backtrace(vector<int>&nums,vector<vector<int>>&result,int i)
    {   
        if(i==nums.size()-1)
            result.push_back(nums);
        
        
        for(int j=i;j<nums.size();j++)  //逐一尝试与后面的数的交换组合
        {
            swap(nums[i],nums[j]);//交换
            backtrace(nums,result,i+1);//然后输出交换后的串
            swap(nums[i],nums[j]);  //记得换回来保持原状, 否则换到最后会重复  比如ABC-> CBA->ABC 
            
        }
    }
    
    
   void swap(int& a,int&b)
    {
        int temp=a;
        a=b;
        b=temp;
    }
};
```
