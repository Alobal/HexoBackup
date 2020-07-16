---
title: LeetCode-No-46-47
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
#  [全排列](https://leetcode-cn.com/problems/permutations)
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


#  题目分析
###    1. 递归, 顺着手工思路,从后往前逐步交换. 固定前面的+后面的全排列即可.
###    2. 用一个for循环表示该位与后面每一位交换, (包括交换自己, 等于不交换的情况), 然后用递归表达后面的全排列.
>注意递归出来后要把之前换的换回来, 要不然 [1 2 3 ] 换成 [2 1 3], 递归到第二层 1 3 又会换成[2 3 1],
这已经不是全排列了, 是在顺序交换. 容易出错

###    3. 全排列II 存在重复数字, 要筛选掉重复的排列
####     ----为什么会有重复序列呢? 因为 i 交换了 j, 递归出来后, 接下来i又碰到一个 j . 两次交换递归下去的结果一模一样 , 所以会重复 .
####     ---- 因此对每个j 我们要查重它是不是在i-j之间 (即已经交换过j值) ,查重通过了才能继续递归, 否则跳过.

# 题解代码
```
class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) 
    {   
        vector<vector<int>> result;
        backtrace(nums,result,0);
        return result;
        
    }
    
    void backtrace(vector<int>&nums,vector<vector<int>>&result,int i)
    {   
        if(i==nums.size()-1)
            result.push_back(nums);
        
        
        for(int j=i;j<nums.size();j++)
        {   
            
            if(i==j)//不需要交换的递归
            {
                backtrace(nums,result,i+1);
                continue;
            }     
            //检查要交换的这个,在已经交换过的里面,有没有相同的,有就不交换了
            int k;
            for(k=j-1;k>=i;k--)
                if(nums[k]==nums[j])
                    break;
            if(k!=i-1)//查重没通过,跳过这个数
                continue;

            //正常交换递归
            swap(nums[i],nums[j]);
            backtrace(nums,result,i+1);
            swap(nums[i],nums[j]);  //换回来？
            
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
