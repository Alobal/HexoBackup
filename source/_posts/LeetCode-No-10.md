---
title: LeetCode-No-10
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching)
>给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
>
>'.' 匹配任意单个字符
>'*' 匹配零个或多个前面的那一个元素
>所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
>
>说明:
>
>s 可能为空，且只包含从 a-z 的小写字母。
>p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
>>示例 1:
>>
>>输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
>
>>示例 2:
>>
>>输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
>
>>示例 3:
>>
>>输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
>
>>示例 4:
>>
>>输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
>
>>示例 5:
>>
>>输入:
s = "mississippi"
p = "mis*is*p*."
输出: false


# 解题分析
##  条件特性
- 首先可知"." 和对应字符的匹配都很容易处理,关键要处理好这个" * ".
- " * "带来的变化有, 使前一个字符匹配N次,**N可为0**,也就是说也可以忽略前一个字符.
####    错误思路
~~由于我一开始没有注意到N可以为0,就采用了一个逐字符匹配的方法,假如遇到一个字符后面有"*",如果匹配错误则直接返回,匹配正确则维持pi不变,这样一步步推过去,在最后若两个字符串都到了结尾,则成功.后来提交错误后有针对性的修修补补浪费了很长时间,并且发现这种解法下再怎么改也不能AC,最终还是推盘重做T-T~~
##  解题思路
每一次带"*"的字符处,都会有两种可能的情况,要么匹配这个字符,要么不匹配这个字符.
我们在测试一种情况发现不行之后,需要再退回测试另一种情况下的匹配.因此可以想到可以使用递归返回.

###   递归体设置
1.若pi+1处为" * ",则分情况处理
 1.1. 如果pi处可正确匹配,则分两个递归,一个是pi匹配1次,一个是pi匹配0次.
1.2. 如果pi处不能匹配,则以pi匹配0次向后递归处理
1.3. 考虑特殊情况,s已经被带" * "字符匹配完,s为空,p还有至少两个字符存在,则p向后推进两个字符再和已经空的字符进行递归匹配.

2.若pi处为"."或可匹配字符,则正常匹配成功,s和p都往后推进1个字符.

3.若pi处为无法匹配字符,return false
###   递归出口
因为我们的递归体若能成功匹配,则S在最底层的递归中,必定是一个空串
- 此时**若p为空串**,则s和p恰好完全匹配成功,return true
- **若p不为空**,则s肯定是被带" * "字符消化掉了,因此参考上面的递归体条件,进入下一次递归中p的带"*"字符被删掉,此时再进行出口判断.如果p仍不为空,即可return false.
>注意p不为空时,有两种情况,并且后一种情况是前一种情况的递归结果
因此**不能简单的直接根据plength!=0直接返回false**.
要**先判断p是否有字符**,若有字符并且是带" * "字符,则是可匹配范围内的情况,需递归推两个字符进一步判断.
若p有字符并且不是带"*"字符,则是无法正确匹配的情况,return false.

# 初版通过代码
```
class Solution {
public:
	bool isMatch(string s, string p)
	{
		int si = 0;
		int pi = 0;
		int slength = s.length();
		int plength = p.length();
		if (slength != 0 && plength == 0)
			return false;

		if (slength == 0 && plength == 0)
			return true;
		else
		{	

			if (p[pi + 1] == '*')
			{
				if (slength == 0)
					return isMatch(s.substr(0, 0), p.substr(pi + 2, plength - pi - 2));
				else if(p[pi] == '.' || p[pi] == s[si])
					//pi匹配1次s前进p不变  pi匹配0次s不变p前进2
					return isMatch(s.substr(si + 1, slength - si - 1), p.substr(pi, plength - pi)) || isMatch(s.substr(si, slength - si), p.substr(pi + 2, plength - pi - 2));
				else
					return isMatch(s.substr(si, slength - si), p.substr(pi + 2, plength - pi - 2));
			}

			else if (slength == 0)
				return false;
			else if (p[pi] == '.' || p[pi] == s[si])
				return isMatch(s.substr(si + 1, slength - si - 1), p.substr(pi + 1, plength - pi - 1));
			else
				return false;
		}

	}
};
```
- 624 ms
- 16.4 MB
- Cpp
虽然已经AC了,时间空间上还是很笨拙的,日后找时间探索优化解法.
-------------
动态规划，以dp[i][j]为状态标志位，为1表示s的前i个字符和p的前j个字符可以匹配。
>注意dp[0][0]==1表示空字符串时可以匹配。
```
//两层for循环
for(i)
  for(j)
```
通过判断当前字符匹配情况，加上前面的子串情况进行累积动态规划，最终达到dp[slength][plength]的值。

>理解了思路，但实战这道题还是有细节方面思路不清，继续挖坑。
---------
