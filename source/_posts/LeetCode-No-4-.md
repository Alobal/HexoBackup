---
title: LeetCode-No-4-
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [寻找两个有序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays)
>给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
你可以假设 nums1 和 nums2 不会同时为空。
>>示例 1:
nums1 = [1, 3]
nums2 = [2]
则中位数是 2.0
>
>>示例 2:
nums1 = [1, 2]
nums2 = [3, 4]
则中位数是 (2 + 3)/2 = 2.5

##  　思路分析
- **首先**, 题目有log时间复杂度限制,不能重组数组暴力解决
- **已知**, 两数组有序不为空,找到中位数的难点在于怎么把两个数组的数一起考虑
- **目标**, 中位数定义:  将一个集合划分为两个长度相等的子集，其中一个子集中的元素总是大于另一个子集中的元素。所以我们其实是找一个方法,把两个数组同时划分成两块,左边块的所有数都比右边块的所有数要小.
若分割后左边有k个数,此时划分的边界有LMax1,LMax2,RMin1,RMin2
**Max(LMax1,LMax2)必然是第k个数
Min(RMin1,RMin2)必然是第k+1个数**
即我们可以定位到第k个数,中位数的序号k也可通过数组长度得到.
因此 我们需要 **两个数组同时分割成有大小关系的两块,左块总共有k个数,k为中位数序号,此时中位数要么是第k个,要么是第k个和第k+1个,都可以在边界找到**


##  [题解分析](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/4-xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-shu/) (链接原高赞题解)
###   1.分割主体思路
要把两数组同时分割成两块,先看单一数组的内部
因为数组是有序的,所以假如在中间一割,同一数组的左边肯定小于右边.

为了达到我们两个数组整体分割的目标,我们还需要满足对一个数组都有,分割的左边最大值小于另一个数组的右边最小值,
这样左边的整体必然就会小于右边的整体.
另外要满足左块总数为k,所以若Ci为第i个数组的切割点下标,要满足 **C1+C2=k**
![题解示意图,来自LeetCode扁扁熊](https://upload-images.jianshu.io/upload_images/19387483-5f138dbbe56bdd7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###   2.边界数赋值

分割点恰巧在有数的位置 C,为方便比较大小, LMax=RMin=L[C],即中位数同时分给两边
分割点在两数之间,即LMax和RMin即分割处两边的值.
####     假想放大数组
因为无法用整数下标表示描述在两数之间的位置,但实际需要这种分割情况
所以我们不妨将每个数组**放缩成2m+1的长度**,即给两数之间也加入一个标识位置
>例如[1,2,3] 假想放缩成[# ,1,#,2,#,3,#],

此时: **数的实际位置=假想位置/2.** **两数之间的假想位置=数的假想位置+-1**

设放大后对一个数组切割的虚位为C.
此时无论C是**数的虚位**还是**空的虚位**,都满足LMax=L[(C-1)/2] RMin=L[C/2],
>注意放缩产生的虚位是假想的,因此访问时要转换回实位

>[# ,1,#,2,#,3,#]
2的原下标是1,假想下标是3, 3/2=1
若此时以,C=3为切割位置,即切点,则LMax=L[(C-1)/2]=L[1]=2,RMin=L[C/2]=L[1]=2
若以C=4为分割处,即切空,LMax=L[1]=2,RMin=L[2]=3.
>
>**假想放大数组后,切点切空都可以用一个式子正确给边界数赋值**

###   3.左块含有k个数
因为放大后数组总长度是2m+2n+2
所以中位数在是第m+n+1和第m+n+2的平均值
因此分割的k等于m+n+1
所以C2=m+n-C1
>真实数组序号从0开始,所以C1+C2=m+n,左块才有m+n+1个数,**不是C1+C2=m+n+1**

###   4. 处理边界情况
切割时切割点可能在数组最左边或者最右边,此时直观上理解可知,切最左边的时候,LMax=无穷小,切最右边的时候RMin=无穷大

###   5. 切割点遍历方式
切割点选择方式确定后,我们要逐步逼近正确的切割点
类似于查找算法,此时可用二分法进行逼近,满足效率O(log).

##  最终代码
```
# include <vector>        //注意头文件的加入,否则INT_MIN之类的可能无法使用
# include <stdio.h>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) 
    {  
        int length1=nums1.size();
        int length2=nums2.size();
        if(length1>length2)        //节省效率,以最短的数组为主切割C1
            return findMedianSortedArrays(nums2,nums1);
        int LMax1;
        int LMax2;
        int RMin1;
        int RMin2;
      
        int k=length1+length2;
        int c1;
        int c2;
        int d1=0;
        int d2=length1*2;
        
        while(d1<=d2)  //写LMax1>RMin2 || LMax2>RMin1 为什么不可以
        {
            
            c1=(d1+d2)/2;
            c2=k-c1;
            
           (c1==0) ? LMax1=INT_MIN : LMax1=nums1[(c1-1)/2];
            (c1==2*length1) ? RMin1=INT_MAX : RMin1=nums1[c1/2];
             (c2==0) ? LMax2=INT_MIN : LMax2=nums2[(c2-1)/2];
            (c2==2*length2) ? RMin2=INT_MAX : RMin2=nums2[c2/2];
            
            if(LMax1>RMin2)
                d2=c1-1;          //分析浮动+-1的必要性
            else if(LMax2>RMin1)
                d1=c1+1;
            else            //为什么要加这个判断
                break;
            
            
        }
        
        int LMax,RMin;
        LMax=(LMax1>LMax2)?LMax1:LMax2;
        RMin=(RMin1<RMin2)?RMin1:RMin2;
        
        return (LMax+RMin)/2.0;
        
        
    }
};
```
---------------
这个题目比较复杂, 看了大牛题解用自己的理解尝试写了一遍下来, 其中代码中还有几处还没有分析完全的地方,休息一段时间后再来看看吧
-------------
- 为什么要浮动+-1  因为循环出口是d1>d2 若不浮动,d1永远小于等于d2
