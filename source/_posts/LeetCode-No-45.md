---
title: LeetCode-No-45
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [跳跃游戏](https://leetcode-cn.com/problems/jump-game-ii)
>给定一个非负整数数组，你最初位于数组的第一个位置。
>
>数组中的每个元素代表你在该位置可以跳跃的最大长度。
>
>你的目标是使用最少的跳跃次数到达数组的最后一个位置。
>
>>示例:
>>
>>输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
>
>说明:
>
>假设你总是可以到达数组的最后一个位置。

#  题目分析
###    1. 假如不考虑最少次数, 贪心法
####     ---- 逐位扩展可跳最大距离, 只要够到了末尾就好.
####     ---- 假如扩展的时候, 最大距离到不了这个位, 则不能从这个位扩展, 即断路了.

###    2. 加上了最少次数要求
####     ---- 什么情况会多次数? 就是之前的一次能跳到的, 跳了几次.
####     ---- 那么怎么知道之前能不能跳到呢? 记录能跳到的最大距离, 只有到达最大距离, 才算一次次数. 当然到末端也算一次.

# 题解代码
```
class Solution {
public:
	int jump(vector<int>& nums)
	{
        //参考题解大神思路: i每到达前一个max,完成一次跳跃
        int sum = 0;
        int end = 0;
        int maxend = 0;
        for (int i = 0; i < nums.size() - 1; i++)
	    {   //i每到达前一个max,完成一次跳跃
		    maxend = max(nums[i] + i, maxend);
            if (i == end)
            {
                end = maxend;
                sum++;
            }
	    }
	
        return sum;

    }
};
```
