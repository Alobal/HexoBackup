---
title: LeetCode-No-23
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [合并K个链表](https://leetcode-cn.com/problems/merge-k-sorted-lists)
>合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
>
>示例:
>
>>输入:
[
　1->4->5,
  　1->3->4,
  　2->6
]
>>输出: 1->1->2->3->4->4->5->6

# 解题分析
- 因为之前做过2个排序链表的合并，所以这里主要想法是两两归并。
>两个链表合并：双指针判断对应节点大小，依次插入新链表，若一个链表用尽，则在result链表后接上另一个链表即可。

- 归并其实也有讲究，我一开始直接用的是顺序归并```result=mergeTwoLists(result,temp)```，其实浪费了很多效率，把不必要的排序比较一遍又一遍的做。
- 如下方题解代码，使用了折半归并（直观描述词）。每次合并```List i =mergeTwoLists(List i,List i+halflength)```. 直到长度为1即完成。

# 题解代码
```
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) 
    {
        ListNode* result=NULL;
        int length=lists.size();
        if(length==0)
            return NULL;
        while(length>1)
        {
            int temp=(length+1)/2;
            for(int i=0;i<length/2;i++)
                lists[i]=mergeTwoLists(lists[i],lists[i+temp]);
            
            length=temp;
        }
        
        
        return lists[0];
    }
    
    
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2)
	  {
		 
		  ListNode result(0);
		  ListNode* another = &result;

		  while (l1 != NULL && l2 != NULL)
		  {
			
			  if (l1->val <= l2->val)
			  {
				  another->next = l1;
				  l1 = l1->next;  
			  }
			  else
			  {
				  another->next = l2;
				  l2 = l2->next;
			  }
              
              another = another->next;
		  }
                   
          another->next=(l1==NULL)?l2:l1;
		  return (&result)->next;
	  }
};
```
