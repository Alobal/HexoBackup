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

## 思路分析
**首先**, 题目有 log 时间复杂度限制，不能重组数组暴力解决

**已知**, 两数组有序不为空，找到中位数的难点在于怎么把两个数组的数一起考虑

**目标**, 中位数定义：将一个集合划分为两个长度相等的子集，其中一个子集中的元素总是大于另一个子集中的元素。所以我们其实是找一个方法，把两个数组同时划分成两块，左边块的所有数都比右边块的所有数要小。
若分割后左边有 k 个数，此时划分的边界有 LMax1,LMax2,RMin1,RMin2：
- Max(LMax1,LMax2) 必然是第 k 个数
- Min(RMin1,RMin2) 必然是第 k+1 个数

即我们可以定位到第 k 个数，中位数的序号 k 也可通过数组长度得到。因此，我们需要：

**两个数组同时分割成有大小关系的两块，左块总共有 k 个数，k 为中位数序号，此时中位数要么是第 k 个，要么是第 k 个和第 k+1 个，都可以在边界找到**

##  [题解分析](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/4-xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-shu/) （链接原高赞题解）
###   分割主体思路
要把两数组同时分割成两块，先看单一数组的内部。因为数组是有序的，所以假如在中间一割，同一数组的左边肯定小于右边。

为了达到我们两个数组整体分割的目标，我们还需要满足对一个数组都有，分割的左边最大值小于另一个数组的右边最小值，这样左边的整体必然就会小于右边的整体。

另外注意切割后要满足左大块总共有 k 个数。

![题解示意图，来自 LeetCode 扁扁熊](https://upload-images.jianshu.io/upload_images/19387483-5f138dbbe56bdd7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###   边界数赋值

假如分割点恰巧在有数的位置 C, 为方便比较大小，LMax=RMin=L[C], 即中位数同时分给两边。

假如分割点在两数之间，即 LMax 和 RMin 即分属两边。
###   假想放大数组
因为无法用整数下标表示描述在两数之间的位置，但实际存在这种分割情况。
所以我们不妨将每个数组**放缩成 2m+1 的长度**, 即给两数之间也加入一个标识位置。
>例如 [1,2,3] 假想放缩成 [# ,1,#,2,#,3,#],

此时：**数的实际位置=假想位置/2**， **两数之间的假想位置=数的假想位置+-1**。

设放大后对一个数组切割的假想下标（虚位）为 C。
此时无论 C 是**数的虚位**还是**空的虚位**, 都满足 LMax=L[(C-1)/2] RMin=L[C/2],
>注意放缩产生的虚位是假想的，因此访问时要转换回实位

>例如对于 [# ,1,#,2,#,3,#]
2 的原下标是 1, 假想下标是 3, 3/2=1
若此时以，C=3 为切割位置，即切在点上，则 LMax=L[(C-1)/2]=L[1]=2,RMin=L[C/2]=L[1]=2
若以 C=4 为分割处，即切在空上，LMax=L[1]=2,RMin=L[2]=3.
>
>**放大数组后，切点切空都可以用同一个式子正确给 LMax 和 RMin 赋值**

###   左块确保有 k 个数
因为放大后数组总长度是 2m+2n+2，所以中位数在是 第 m+n+1 数和第 m+n+2 数相加的平均值。

因此有 ``k=m+n+1``，且 ``C2=m+n-C1``。

>真实数组序号从 0 开始，所以 C1+C2=k-1, 左块才有 k 个数，**不是 C1+C2=m+n+1**。

### 切割终止条件

好，现在我们随便怎么切，都能确保左边是 k 个数。但是注意为了维护左块所有数一定小于右块所有数，我们需要有``LMax<=RMin``

###   处理边界情况
切割时切割点可能在数组最左边或者最右边，此时直观上理解可知，切最左边的时候，LMax=无穷小，切最右边的时候 RMin=无穷大

###   切割点遍历方式
切割点选择方式确定后，我们要逐步逼近正确的切割点
类似于查找算法，此时可用二分法进行逼近，满足效率 O(log).

##  最终代码
```cpp
# include <vector>        //注意头文件的加入，否则 INT_MIN 之类的可能无法使用
# include <stdio.h>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) 
    {  
        int length1=nums1.size();
        int length2=nums2.size();
        if(length1>length2)        //节省效率，以最短的数组为主切割 C1
            return findMedianSortedArrays(nums2,nums1);
        int LMax1;
        int LMax2;
        int RMin1;
        int RMin2;
      
        int k=length1+length2;
        int c1;
        int c2;//切割点
        int lo=0;//二分逼近变量
        int hi=length1*2;
        
        //二分确定切割点
        while(lo<=hi)  //写 LMax1>RMin2 || LMax2>RMin1 为什么不可以
        {
            //计算切割点，保持了左边都是 k 个数
            c1=(lo+hi)/2;
            c2=k-c1;
            
            //计算四个边界值
           (c1==0) ? LMax1=INT_MIN : LMax1=nums1[(c1-1)/2];
            (c1==2*length1) ? RMin1=INT_MAX : RMin1=nums1[c1/2];
             (c2==0) ? LMax2=INT_MIN : LMax2=nums2[(c2-1)/2];
            (c2==2*length2) ? RMin2=INT_MAX : RMin2=nums2[c2/2];
            

            if(LMax1>RMin2)//左上大于右下，左下显然小于右下，切多了，hi 降低
                hi=c1-1;          
            else if(LMax2>RMin1)//左下大于右上，左上显然小于右上，少了。lo 升高
                lo=c1+1;
            else       //左上小于右上右下，左下小于右上右下，目标条件。
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

这个题目细节比较复杂，代码相对来说挺清晰简洁。
