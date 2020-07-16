---
title: LeetCode-No-16
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest)
>给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
>
>>例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
>>
>>与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).

# 解题思路
- 一开始我想分解问题，确定一个数，找最接近的两个数，其中找两个数的过程也是通过确定一个数，找最接近的最后一个数。解题不难，但复杂度很高。
- 又是一个逼近问题，做了几道现在应该领悟到了**双指针逼近**的方法是一个很好的寻找逼近值的策略。

###   算法主体
```
while(i<j)
{
  if(sum<target)
    i++;
  else if(sum>target)
    j--;
  else if(sum==target)
}

```
- 算法简单，但实现细节需要考虑，并不是出口附近的sum就一定是最接近的sum。


>假如简单的取上面这个粗糙的循环，对于实例([-101,-100,0,2,3,4,5,6,7,8,9,10],-99)。当i从-100移到0之后，j一直减到i期间的sum都没有i=-100处的sum良好，但却会作为出口给人最优的错觉。
>
>错误经验：最优解也并不是取最后一次i变动的sum和最后一次j变动的sum，因为可能变i变j再变i反复变化，然而最优解其实一直停留在第一个变i之前。

- 我自己的解决办法是把所有的sum都存储起来，最后统一遍历找出最优解，但显然这样需要花一点点时间。

# 题解代码
```
class Solution {
public:
	int threeSumClosest(vector<int>& nums, int target)
	{
		int result;
		sort(nums.begin(), nums.end());
		vector<int> sums;
		int a;
		int b;
		int c;
		int sum;
		int resultdistance = INT_MAX;

		for (a = 0; a < nums.size() - 2; a++)
		{
			b = a + 1;
			c = nums.size() - 1;

			while (b < c)
			{
				sum = nums[a] + nums[b] + nums[c];

				
				sums.push_back(sum);
				if (sum < target)
					b++;
				else if (sum > target)
					c--;
				else
					return sum;
			}

		}
        
        for(int i=0;i<sums.size();i++)
        {
            if(abs(target - sums[i]) < resultdistance)
				{
					result = sums[i];
					resultdistance = abs(target - result);
				}
        }

		return result;
	}


};
```
------
不存储所有结果，直接在每个sum之后与result比较，效率比存储的高了4ms。

|  提交结果  |  执行用时  |  内存消耗  |  语言  |
| --- | --- | --- | --- |
| 2019.9.15 | 通过 | 12 ms | 8.7 MB | Cpp |
| 2019.9.11| 通过 | 16 ms | 12.9 MB | Cpp |

8ms可能是做不到了，量级上应该一样。
