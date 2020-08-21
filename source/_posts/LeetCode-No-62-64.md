---
title: LeetCode-No-62-&-No-63-&-No-64
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [不同路径 I & II](https://leetcode-cn.com/problems/unique-paths-ii)
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
![示例](https://upload-images.jianshu.io/upload_images/19387483-b32c8851464ff850.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

网格中的障碍物和空位置分别用 1 和 0 来表示。
说明：m 和 n 的值均不超过 100。

>示例 1:
>
>输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
>1. 向右 -> 向右 -> 向下 -> 向下
>2. 向下 -> 向下 -> 向右 -> 向右

# 题目分析
###   对没有障碍物的情况
1. 小学数学思想：走到终点总共需要的操作是  m-1个向下 和 n-1个向右，那么即是一个组合数问题，在总共m-1+n-1的操作步中，选取m-1个操作步放置向下操作，剩下的放向右操作。$$C_{m+n-2}^{m-1}$$

2.当然，组合数是一个阶乘运算，不太理想。再用编程思想去想，直观上是一个深度遍历，或者说回溯遍历的问题。即尝试每种可能的走路方案，走到终点则计数+1。
3.说到回溯，大概率我们可以想想能不能换成动态规划？
###   动态规划
1. 首先这显然是一个依赖子问题解决的问题。考虑位置[i][j]，有两种方式可以到达这，一种是从[i-1][j]向下，一种是[i][j-1]向右。即[i][j]位置解，即依赖于上 和 左 两个位置的解。

2. 考虑dp[i][j]为到达[i][j]位置的总方法数，那么假如[i-1][j]能往下，则dp[i][j]+=dp[i-1][j]，同理对dp[i][j-1]。
3. 动态规划主体已经清晰了，再可以进一步优化空间细节。
我们是按行遍历列，而每行开头的dp[i][0]仅依赖于dp[i-1][0]，即每行开头的dp可由列方向上的第一个生成。
而每行的除开头外任意一个，在行方向上又仅依赖于前一个dp[i][j-1]。换句话说，我们至始至终在行方向上只需要一个O（1）的存储空间，保留行前一个的dp结果即可。
**即我们只需要一个O（n）的一行大小的列dp组，一个常数大小的行dp存储数即可。**
4. 注意细节，dp数组要用long类型= =int会炸

###   No.64给每个位置加了权值，要求走到右下角的权值累计和最小
1. 同样也是动态规划，到任意一位置的最小权值，必然是由[i-1][j] 和 [i][j-1]的最小值发展而来，以此类推。

# 题解代码
```
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) 
    {
        //动态规划
        int m=obstacleGrid.size();
        int n=obstacleGrid[0].size();
        long temp[n];//注意要用long 有样例爆int....
        int i;
        if(obstacleGrid[0][0]!=1)
            temp[0]=1;
        else
            return 0;
        for(i=1;i<n;i++)//首行处理
        {
            if(obstacleGrid[0][i]!=1)
                temp[i]=temp[i-1];
            else
                temp[i]=0;
        }

        int row=1;
        for(;row<m;row++)
        {
            
            if(obstacleGrid[row][0]==1)//首列障碍物处理
                temp[0]=0;

            for(i=1;i<n;i++)
            {   
                if(obstacleGrid[row][i]==1)
                    temp[i]=0;
                else
                    temp[i]+=temp[i-1];
            }
        }
        
        return temp[n-1];    
    }
};
```
