---
title: LeetCode-No-51&No-52
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [N皇后](https://leetcode-cn.com/problems/n-queens)
>n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
![N皇后示例-LeetCode](https://upload-images.jianshu.io/upload_images/19387483-fd574c97962d8a50.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
上图为 8 皇后问题的一种解法。
>给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
>
>每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
>
>>示例:
>>
>>输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],
>>
 >>["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。

# 题目分析
- ####     主要思路和数独类一样，回溯遍历
- ####     放置特性：行、列、对角线不同
- ####     需要注意怎么判断皇后在当前位置是否可放置呢？——使用状态表判断，三个数组构成
1. 行列不同很简单，以行遍历为例，因为一行放了一个就到下一行，所以行不可能重复。
2. 列检查，遍历每行的时候，检查**列状态表**，这列未被使用才可。```bool colFlag[n]```
3. 检查主对角线，主对角线特征是**行列差**相同即是同一个主对角线，行列差范围在[-n+1,n-1]，因为索引有负，进行一个+n的偏移处理。```diagonal[2*n]```
4. 检查次对角线，特征是**行列和**相同，范围在[0,2n-2]。```SubDiagonal[2*n]```
5. 检查通过才可放置，同时后续假如要撤销记得收拾好记录表。

# 题解代码
```
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) 
    {
        vector<vector<string>> result;
        int First=0;//第一行的Q位置
       


        while(First<n)//第一个Q的位置代表尝试轮次,第一行超过最后一格则所有遍历结束
        {
            //初始化棋盘
            vector<string> tempReuslt;
            string tempString(n,'.');
            for(int i=0;i<n;i++)
            {
                tempReuslt.push_back(tempString);
            }
            //列使用情况,false代表没用过
            bool colFlag[n];
            bool diagonal[2*n];//对角线使用情况
            bool SubDiagonal[2*n];//次对角线使用情况
            memset(colFlag,0,sizeof(colFlag));
            memset(diagonal,0,sizeof(diagonal));
            memset(SubDiagonal,0,sizeof(SubDiagonal));


            //第一个Q在First位置
            tempReuslt[0][First]='Q';
            colFlag[First]=true;
            diagonal[0-First+n]=true;//偏移n,因为行减列可能是负数
            SubDiagonal[First]=true;
            int count=1;
            backTrace(result,tempReuslt,count,colFlag,n,diagonal,SubDiagonal);

            First++;
        }

        return result;
    }

    void backTrace(vector<vector<string>>& result,vector<string>&tempReuslt,int& count,bool* colFlag,int& n,bool* diagonal,bool* SubDiagonal)
    {   
        //找齐了
        if(count==n)
            {
                result.push_back(tempReuslt);
                return ;
            }

        int i;//填入第count个数
        for(i=0;i<n;i++)
        {   
            //检查列,对角线,次对角线
            if((colFlag[i]==true || (diagonal[count-i+n]==true) || SubDiagonal[count+i]==true)==false)
            {  
                //填入一个数
                tempReuslt[count][i]='Q';
                colFlag[i]=true;
                diagonal[count-i+n]=true;
                SubDiagonal[count+i]=true;
                count++;

                //找下一个数
                backTrace(result,tempReuslt,count,colFlag,n,diagonal,SubDiagonal);

                //重置当前数
                count--;
                tempReuslt[count][i]='.';
                colFlag[i]=false;
                diagonal[count-i+n]=false;
                SubDiagonal[count+i]=false;

            }
        } 
       
    }


};
```
