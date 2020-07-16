---
title: LeetCode-No-3
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters)
>给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
>>示例 1:
>>输入: "abcabcbb"
>>输出: 3 
>>解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
>
>>示例 2:
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
>
>>示例 3:
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

##  解题思路
　这题也是思路比较直接的一题,分析以下几点需求:
1. 判断重复字符
      >用int构造一个***hash表***进行判断即可,注意字符总数,数组空间可以开大一点
      >(数组初始化的时候没有想到更好的优化效率方案).

 2. 子串检测
      >数据结构课上有学过kmp算法,因此容易联想到这里为了最佳效率,也应采用***窗口移动***的算法.
3. 后事处理
      >移动窗口之后,由于窗口之外的字符的位置信息还保留在表内,因此需要进行处理
      >直接思路是使用一个滞后的位置符```behind```进行遍历清除即可
      >>优化思路: 可以通过判断滞留的位置是否处于现有检测窗口之前,如果是则无视,不需要遍历处理,**空间换时间**
     
##  最终代码
```
class Solution {
public:
    int lengthOfLongestSubstring(string s) 
    {   
        int flag[127];
        for(int i=0;i<127;i++)
            flag[i]=-1;
        int result=0;  
        int max=0;
        int temp=0;
        int start=0;
        
        for(int i=0;i<s.length();i++)
        {
            temp=getNO(s[i]);
            if(flag[temp]<start)
            {
                result++;
                flag[temp]=i;
            }
            else
            {
                if(result>=max)
                    max=result;
                
                start=flag[temp]+1;
                result=i-flag[temp];
                flag[temp]=i;
            }
        
        }
        if(result>=max)
            return result;
        else
            return max;
    }

    int getNO(char originchar)
    {
        return originchar-' ';
    }
};
```
