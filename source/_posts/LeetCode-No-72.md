---
title: LeetCode-No-72
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [编辑距离](https://leetcode-cn.com/problems/edit-distance)
给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
示例 1:
>
>输入: word1 = "horse", word2 = "ros"
输出: 3
解释: 
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')

示例 2:
>
>输入: word1 = "intention", word2 = "execution"
输出: 5
解释: 
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')


# 题目分析
1.  和字符串匹配之类的差不多，都是 **动态规划**，观察子问题状态，考虑转移状态
2. 动态规划  dp[i][j]状态
3. **对比dp[i-1][j]状态时**，只需要把i代表的字母删除即可回到dp[i-1][j]
4. **对比dp[i][j-1]状态**，因为[i][j-1]代表word1 i位 和 word2 j-1 位匹配，因此word2还多个j位没有匹配到，对word1增加操作即可
5. **对比dp[i-1][j-1]状态**，双方都多出个第i位和第j位，如果这两个相等，则和dp[i-1][j-1]一样，不相等，则需要一次替换操作。

# dp题解代码
```
class Solution {
public:
    int minDistance(string word1, string word2) 
    {
        //动态规划  dp[i][j]状态
        //对比dp[i-1][j]状态时，只需要把i代表的字母删除即可回到dp[i-1][j]
        //对比dp[i][j-1]状态，因为[i][j-1]代表word1 i位 和 word2 j-1 位匹配，因此word2还多个j位没有匹配到，对word1增加操作即可
        //对比dp[i-1][j-1]状态，双方都多出个第i位和第j位，如果这两个相等，则和dp[i-1][j-1]一样，不相等，则需要一次替换操作。
        int dp[word1.size()+1][word2.size()+1];
        dp[0][0]=0;
        for(int i=1;i<=word1.size();i++)
            dp[i][0]=i;
        for(int i=1;i<=word2.size();i++)
            dp[0][i]=i;
        
        int i;
        int j;
        for(i=1;i<=word1.size();i++)
            for(j=1;j<=word2.size();j++)
                if(word1[i-1]==word2[j-1])
                    dp[i][j]=1+min( min(dp[i-1][j],dp[i][j-1]),dp[i-1][j-1]-1);
                else
                    dp[i][j]=1+min( min(dp[i-1][j],dp[i][j-1]),dp[i-1][j-1]);

        return dp[word1.size()][word2.size()];                    
    }
};
```
