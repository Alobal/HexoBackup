---
title: LeetCode No.221
date: 2020-07-31 17:01:51
categories:
- LeetCode
tags:
- 动态规划
---
# [最大正方形](https://leetcode-cn.com/problems/maximal-square)

在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。

示例:
>
>输入: 
>
>1 0 1 0 0
>1 0 1 1 1
>1 1 1 1 1
>1 0 0 1 0
>
>输出: 4

# 算法思想

大正方形必然是由小正方形迭代上来的。因此这题是个明显的动态规划题，但是我们怎么去确定状态转移方程呢？

### 状态转移方程的理解
首先我们确定，正方形是从左上往右下进行延展(其他延展方向也行)。

##### 我们什么时候可以延展这个正方形呢？

首先新找到的点肯定得是 ``1``，要不然不可能构成正方形。以matrix[i][j]位为1，我们可以得到示例如下：
>a a a x
>a a a x
>a a a x
>x x x 1

因为是正方形，所以假如 [i][j]位要构成新的正方形，那必然是从左上角的 a 区域延展下来的。

但是即使 a 区域是正方形，[i][j]位是1，就一定形成新正方形吗？并没有

当我们把正方形延展到[i][j]位时，其实[i]行和[j]列对应边也都扩展进去了，也就是上例的 x 区域，也要是1才能延展构成新正方形。

##### 即我们现在知道延展正方形受限于哪些环境：
- 左上角的 a 区域的正方形有多大，新正方形则是边长++

- x 区域，从[i][j]分别往左和往上走，能提供的最大边长。
    
    如下，虽然 a 区域是边长3的正方形，本来想要以[i][j]为新顶点扩展成边长4的正方形，但是由于新的两条边长度只有1，满足不了边长4的正方形的要求。

    因此[i][j]只能构成边长2的正方形。

>受限于 x 区域新边长的延展
>1 1 1 0
>1 1 1 0
>1 1 1 1
>0 0 1 1

##### 得出状态转移方程
因此总结一下状态转移方程：

``[i][j]位的正方形边长=min( [i-1][j-1]的正方形边长，新的两边边长 ) + 1``

伪代码即 ``dp[i][j]=min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1])+1``

其中dp[i][j]表示[i][j]位作为左下角时，形成正方形的边长。

# 题解代码
```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) 
    {
        //动态规划，如何理解dp的递归式
        int width=matrix.size();if(width==0) return 0;
        int length=matrix[0].size();if(length==0) return 0;
        vector<vector<int>> dp(width+1,vector(length+1,0));
        int result=0;

        for(int i=0;i<width;i++)
        {
            for(int j=0;j<length;j++)
            {
                if(matrix[i][j]=='1')
                    dp[i+1][j+1]=min(min(dp[i][j],dp[i][j+1]),dp[i+1][j])+1;
                else
                    dp[i+1][j+1]=0;

                if(dp[i+1][j+1]>result)
                    result=dp[i+1][j+1];
            }
        }

        return result*result;

    }
};
```