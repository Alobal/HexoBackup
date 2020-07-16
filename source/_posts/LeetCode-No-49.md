---
title: LeetCode-No-49
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
#  [字母异位分词](https://leetcode-cn.com/problems/group-anagrams)
>给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
>
>>示例:
>>
>>输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
输出:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
说明：
>
>所有输入均为小写字母。
不考虑答案输出的顺序。

# 题解分析
###    1. 怎么判断是不是异位分词呢? 想想异位分词具有什么特点?
###    ---- 异位分词中, 字母出现次数相同, 字母顺序不同
###    ---- 因此我们可以 排序后观察 / 26字母次数统计 进行比较.
###    当然注意别做一类扫一遍, 用个字典自动分类就可以了.

# 题解代码----排序+字典
```
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) 
    {   //加字典的排序
        vector<vector<string>> result;
        unordered_map<string, vector<string>> hashmap;
        for(string s : strs)
        {
            string temp = s;
            sort(temp.begin(), temp.end());
            hashmap[temp].push_back(s);
        }
        
        for(auto i : hashmap)
        {
            result.push_back(i.second);
        }
        
        return result;
    }
};

```
