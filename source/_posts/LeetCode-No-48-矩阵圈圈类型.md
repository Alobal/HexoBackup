---
title: LeetCode-No-48-矩阵圈圈类型
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
#  [旋转矩阵](https://leetcode-cn.com/problems/rotate-image)
>给定一个 n × n 的二维矩阵表示一个图像。
>
>将图像顺时针旋转 90 度。
>
>说明：
>
>你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
>
>>示例 1:
>>
>>给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],
>>
>>原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
>
>>示例 2:
>>
>>给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 
>>
>>原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]

# 题目分析
###    矩阵圈圈式问题主要在于怎么确定问题需要的 圈
###    例如旋转矩阵这个问题, 看似旋转, 实际上是一圈圈的边界互换, 上边界换到右边界, 以此类推.
###    那么其实只要我们找到四个边界, 然后以边界去for遍历就好了.
###    遍历完一圈 ,收缩上下左右边界, 继续遍历, 直到边界重合.

----
>之后的顺时针遍历问题也是一样, 以边界为中心去做遍历.不断收缩边界, 注意单行单列的圈 需要做避免重复处理, 旋转问题这里不需要, 因为是n x n.
----

# 题解代码
```
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) 
    {       
            //确定四个边界,因为是nxn其实可以两个数就够了,但是为了可读性用四个数
            int left=0;
            int top=0;
            int right=matrix[0].size()-1;
            int bottom=matrix.size()-1;
            int temp;
            while(left<right)//每次旋转外围四边,旋转完缩小外围定义
            {   for(int i=0;i<right-left;i++)
                {
                    //上到右
                    temp=matrix[top+i][right];
                    matrix[top+i][right]=matrix[top][left+i];
                    //左到上
                    matrix[top][left+i]=matrix[bottom-i][left];
                    //下到左
                    matrix[bottom-i][left]=matrix[bottom][right-i];
                    //右到下
                    matrix[bottom][right-i]=temp;
                }

                left++;
                right--;
                top++;
                bottom--;
            }
    }
};
```
