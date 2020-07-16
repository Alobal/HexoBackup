---
title: LeetCode-No-15-
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [三数之和](https://leetcode-cn.com/problems/3sum)
>给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
>
>注意：答案中不可以包含重复的三元组。
>
>>例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
>>
>>满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

# 思路分析
- 暴力O(n3) 这样做还不如不做kj
- 联想**两数之和**那道题，可以采用map哈希来查找需要的值，但由于要先确定两个数之和，才能知道需要的值，所以有时间O(n2)+空间O(n)。


- **牺牲O(Nlog N)对数组sort，排序之后找数即可用双指针头尾同步进行**
- 我的做法是，对于a<=b<=c，a+b+c=0，先确定b为```center```，然后对于center的每一次循环中，都让a,c分别从首尾开始，根据```sum=a+b+c```与0相比，判断是要a++还是c--。
>这里要注意人为考虑特殊情况，**注意剪枝**，否则像{0,0,0,0,0,0,0,0,0,0,0}会没意义的算很多遍。另外在每个center的内循环中，显然假如**最小值大于0**，或者**最大值小于0**，是不可能和为0，可以剪枝。

- 另外，当数组中有重复数字时，会重复进行循环匹配，因此我额外使用了一个```set```。
- ```if(sum==0)```之后，额外加一个```if(set.count(vector)==0)```来判断是否已经有了相同的组合被存储了，如果没有，则```set```和```result```同时存储这个新组合，set中存储是为了对之后判重。

# 解题代码
```
class Solution 
{
public:
    vector<vector<int>> threeSum(vector<int>& nums) 
    {   
        vector<vector<int>> result;
        set<vector<int>> resultset;
        //剪枝
        if (nums.size() <= 2)
			return result;
        
		sort(nums.begin(), nums.end());
        
        //不剪枝会被0吓死=.=
		if (nums[0]>=0 ||nums[nums.size()-1]<=0)
		{
			if (nums[0] == 0 &&nums[nums.size()-1]==0)
				result.push_back({ 0,0,0 });
			return result;
		}
        int i;
        int j;
        int center;
        
        
        for(center=0;center<nums.size();center++)
        {
            i=0;
            j=nums.size()-1;
            
            
            while(i!=center &&j!=center)
            {
                if(nums[i]>0 || nums[j]<0)
                    break;
                
                int sum=nums[i]+nums[center]+nums[j];
                if(sum==0)
                {
                    vector<int> temp ={nums[i],nums[center],nums[j]};
                    if(resultset.count(temp)==0)
                    {   
                        result.push_back(temp);
                        resultset.insert(temp);
                    }
                    i++;
                    j--;
                }
                
                else if(sum<0)
                    i++;
                else if(sum>0)
                    j--;
            }
        }
        
        
        
        return result;
    }
};
```
------
执行用时 :  424 ms, 在所有 C++ 提交中击败了5.01%的用户
内存消耗 :24.3 MB, 在所有 C++ 提交中击败了7.53%的用户

虽然好像剪枝也做了，但好像效率依然不够高，不知道是不是额外加了个set的问题。
看别人的题解，**不以b以a为外循环可以避免重复**，也就不需要set，但没懂是为什么。
挖个坑，搞懂了再回来看看。
-----
