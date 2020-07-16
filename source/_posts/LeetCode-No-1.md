---
title: LeetCode-No-1
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [两数之和](https://leetcode-cn.com/problems/two-sum)
>给定一个整数数组 ```nums``` 和一个目标值 ```target```，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
>
>示例:
>>给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

 ###   1.解决思路
**暴力遍历**，我们需要找出两个数满足一个数值和的需求，我首先想到的就是通过遍历尝试，简单暴力。
```
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) 
    {   
        vector<int> result;
        int i=0;
        int j=0;
        for(i=0;i<nums.size()-1;i++)
        {
            for(j=i+1;j<nums.size();j++)
                if(nums[i]+nums[j]==target)
                {
                    result.push_back(i);
                    result.push_back(j);
                    j=nums.size();
                    i=j-1;
                }
        }
        
        return result;
    }
};
```
- 通过
- 472 ms
- 9.2 MB
- Cpp 

###   2.优化思路
显然暴力解法最容易想但效率也大量浪费在了无谓的二层循环中，直接导致了O(n^2)的复杂度。
**细化需求**，当我们找到一个数，本来是要在二层循环中尝试找到可以组合的数，我们已知数值寻找位置，因此可以考虑到使用**map哈希表**来构造数据结构,使用 **空间换时间**。
>哈希表查找复杂度为O(1)

***两遍哈希表***，我们把数组遍历存入map中，消耗O(n)，然后再对每一个数进行遍历，每次只要在map中寻找其对应的数值是否存在即可，总时间复杂度为2O(n)。
>***一遍哈希表*** ：在存入map时即对对应的匹配数进行查找，优化复杂度至O(n)。

###   3.最终实现代码
```
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) 
    {   
        map<int,int> store;
        vector<int> result;
        for(int i=0;i<nums.size();i++)
        {
            
            if(store.count(target-nums[i])>0)
            {
                
                result=vector<int>({store[target-nums[i]],i});
                break;
            }
            store.insert(map<int,int>::value_type(nums[i],i));
        }
        
        return result;
    }
};
```
- 通过 
- 20 ms
- 10.1 MB 
- Cpp
