---
title: LeetCode-No-5
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring)
>给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
>>示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
>
>>示例 2：
输入: "cbbd"
输出: "bb"

##  仿No.4切入
- 回文序列本质上还是一个切割问题
- 以切割点为起始,逐步比较两边是否相等即可判断回文.
- 注意切割处可以是数, 也可以是两数之间

##  求解代码
题目思路较为简单,直接放出一遍撸过的代码.
```
class Solution {
public:
	string longestPalindrome(string s)
	{
		string result;
		int center;
		int left;
		int right;
		if (s.length() == 0)
			return "";
        //参考题4扩展
		//[1,2,3] [1,# ,2,#,3]
		 //[2,1,1,2] [2,# ,1,#,1,#,2]
		for (center = 0; center < 2*s.length()-1; center++)
		{
			left = center / 2;
			right = (center + 1) / 2;
			while (1)
			{
				if (left < 0 || right >= s.length() || s[left] != s[right])
				{
					left++;
					right--;
					break;
				}
				left--;
				right++;
			}
			if (right - left + 1 > result.length())
				result.assign(s, left, right - left + 1);
		}

		return result;
	}
};
```
-----------------
##  错误思路反省
####    1.**条件定义错误**
简单的将回文定义为  一个数在中间,两边相等 的序列, 实际上回文序列最中间可能是**空**而不是**数**.
####    2.**边界特殊情况考虑不周**
比如空字符串,比如没想到"aaaaa"这种字符串, 当然使用扩展分割的算法时这些情况都可以求解, 只不过如果自己能早点注意到这些特殊情况,就不需要绕弯子 , 可以直接上来就撸分割了.
####    3. **自行测试**
自己在提交给OJ之前,应该自己尽量想出各种各样的测试样例, 不能写出什么就随便丢上去跑, 只有自己用心测试了之后才会发现自己的初始算法有那么多的错误.
