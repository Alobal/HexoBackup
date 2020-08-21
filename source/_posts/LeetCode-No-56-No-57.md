---
title: LeetCode-No-56-&-No-57
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# (合并区间 || 插入区间)[https://leetcode-cn.com/problems/merge-intervals]
>给出一个区间的集合，请合并所有重叠的区间。
>
>>示例 1:
>>
>>输入: [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
>
>>示例 2:
>>
>>输入: [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

# 题目分析
###    合并区间
1. [a,b] [c,d]合并条件：b>=c && a<=d 此时区间存在重复区段，可以合并
2. 由于原区间序列是乱序，你合并了前两个，产生合并结果temp，但你不知道temp还可以和后续的什么合并，所以又需要遍历一遍，不现实。
3. 因此我们先按区间左边界进行排序，这样temp只需要考虑是否还要合并紧挨着的下一个即可。
###    插入区间
1. 首先需要找到插入位置，即左边界 介于  前一个和后一个的左边界 中间。
2. 插入之后的收尾工作
插入时会不会和前一个发生和合并？
因为是按左边界顺序，因此**往前只可能合并一个**
但是不知道新区间的右边界延伸到了哪里，因此对**后续区间都要检查一遍是否需要合并**

# 题解代码
###   合并区间
```
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) 
    {
        vector<vector<int>> result;
        int Len=intervals.size();
        if(Len==0)
            return result;
        
        sort(intervals.begin(),intervals.end(),cmp);
        result.push_back(intervals[0]);

        int i=1;
        while(i<Len)
        {    //可连接 [1,3] [2,4]
            if(intervals[i][0]<=result.back()[1])
                if(intervals[i][1]>result.back()[1])
                    result.back()[1]=intervals[i][1];
                else;
            else//不可连接 
                result.push_back(intervals[i]);
            i++;
        }

        return result;
    }

    static bool cmp(vector<int>& a,vector<int>& b)
    {
        return a[0]<b[0];
    }

    
};
```
###   插入区间
```
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) 
    {
        int i=0;
        int Len=intervals.size();
        bool IsInsert=false;
        vector<vector<int>> result;
        while(i<Len)
        {   //找到插入的位置
            if(intervals[i][1]<newInterval[0])
                i++;
            else
                break;
        }

        if(i==Len)//插在末尾之后
        {
            intervals.push_back(newInterval);
            return intervals;
        }

        for(int j=0;j<i;j++)//无需检查的项直接插入
            result.push_back(intervals[j]);

        if(intervals[i][0]<=newInterval[1])//可以合并
        {
            intervals[i][0]=min(intervals[i][0],newInterval[0]);
            intervals[i][1]=max(intervals[i][1],newInterval[1]);
            result.push_back(intervals[i]);
            i++;
        }
        else//插入 而不是合并
            result.push_back(newInterval);

        while(i<Len)
        {
            //插入项往后 每一项都要检查是否要往前合并,直到不用合并
            if(intervals[i][0]<=result.back()[1])
            {
                if(result.back()[1]<intervals[i][1])
                    result.back()[1]=intervals[i][1];
            }
            else
                break;
            
            i++;
        }
        //出来的i往后是无法合并的项
        while(i<Len)
        {
            result.push_back(intervals[i]);
            i++;
        }


        return result;




    }
};
```

  
