---
title: LeetCode-No-22
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [括号生成](https://leetcode-cn.com/problems/generate-parentheses)
>给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
>
>>例如，给出 n = 3，生成结果为：
>>
>>[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]

# 题解分析
- 一开始我想创建一个2n的string数组
因为string（包括子串）第一个空位一定会是' ( ' 
因此我的算法思路是 第一位肯定是' ( ' 不变，然后在剩下的length-1空位中遍历选一处插入')'
然后递归进入子串插入，也是子串第一位 '( ' 不变，遍历剩下的空位一次次插入 ')' ，直到递归完成括号串。
这种算法不能避免重复，而且我在创建动态长度的字符串这里就失败了=。=
但没看到相似的思路，因此写下来说不定以后能够优化一下。

 - ###   标准思路
递归对每一位进行检测，如果' ( '数量少，则这一位插入' ( '进入递归，否则插入' ）'进行递归，直到填满。

因为这种方法会遍历完所有'（'可能的位置，进而能够确定括号串，因此不会重复也不会遗漏。

- ###   递归法代码
```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n)
    {
        vector<string> result;
       
        Recursion(n,"",0,0,result);
        return result;
    }
    
    
 void  Recursion(int n,string temp,int left ,int right,vector<string>& result)
    {
        if(temp.size()== 2*n)
        {
            result.push_back(temp);
            return;
        }
     
        if(left<n)
            Recursion(n,temp+'(',left+1,right,result);
        
        if(right<left)
            Recursion(n,temp+')',left,right+1,result);
    }
};
```

|  提交时间  |  提交结果  |  执行用时  |  内存消耗  |  语言  |
| --- | --- | --- | --- | --- |
| 2 天前 | 通过 | 20 ms | 17 MB | Cpp |


- ###    动态规划
因为递归法效率还没有极致，因此看了看题解大神的解法，发现了一位用动态规划的人才。
给上链接 ：
###    [闭合数的合理解释-Jerry Peng]([https://leetcode-cn.com/problems/generate-parentheses/solution/bi-he-shu-de-he-li-jie-shi-by-jerry-peng/](https://leetcode-cn.com/problems/generate-parentheses/solution/bi-he-shu-de-he-li-jie-shi-by-jerry-peng/))

- 算法分析
 对于每个n对括号的括号串S[n] 都可以划分为两个部分
```S[n] = '(' + S[c] + ')' + S[n-c-1];```
第一对括号里面带着c长度的子问题， 右边剩下部分n-c-1长度的子问题
**自底向上，存储子问题结果，逐步合并到n长度的问题**。
因为要找到所有可能结果，因此c的取值需要遍历所有可能。

- ###   动态规划代码
```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n)
    {
       map<int,vector<string>> resultmap;
        resultmap[0].push_back("");
        for(int i=1;i<=n;i++)
            for(int j=0;j<i;j++)
                for(string left: resultmap[j])
                    for(string right: resultmap[i-j-1])
                    resultmap[i].push_back("("+left+")"+right);
        
        return resultmap[n];
    }
};

```

|  提交时间  |  提交结果  |  执行用时  |  内存消耗  |  语言  |
| --- | --- | --- | --- | --- |
| 2 天前 | 通过 | 12 ms | 9.6 MB | Cpp |

-------
**有想过为什么不直接分为left 和 right 两个部分，一定要套个括号**
      　——假如只分两半left 和 right，那在求解S[n]遍历的时候肯定要遍历到S[n]自身，因此需要先固定好一对括号，这样遍历会停止在S[n-1]的子问题，然后合并出待解的S[n]问题。
