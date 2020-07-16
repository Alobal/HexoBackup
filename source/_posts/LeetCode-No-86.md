---
title: LeetCode-No-86
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [分隔链表](https://leetcode-cn.com/problems/partition-list/)

给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

>示例:
>
>输入: head = 1->4->3->2->5->2, x = 3
输出: 1->2->2->4->3->5

# 题目分析
1. 直接思路是第一次遍历找到中间节点，并且划分为左右两边，然后再重新遍历链表元素，按大小分类到两边去。
2. 但这样要来回遍历链表，还要不停的交换节点很麻烦，换个**逆向思路：既然是一个链表分成两个区域，不就相当于两个链表合成一个区域**
3. 因此，即构造两个链表，遍历原链表元素，分类接在两个链表上。
4. 遍历结束合成两个链表。

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
    ListNode* partition(ListNode* head, int x) 
    {   
        //逆向想问题，既然分成了两段，那也可以是两段连成了一段

        ListNode lefthead(0);
        ListNode* left=&lefthead;
        ListNode righthead(0);
        ListNode* right=&righthead;


        while(head!=NULL)
        {
           if(head->val<x)
           {
               left->next=head;
               left=left->next;
           }
           else
           {
               right->next=head;
               right=right->next;
           }
           head=head->next;

          
        }
        right->next=NULL;//注意赋值null，否则下面的链表连接会无限循环超时
        left->next=righthead.next;
        return lefthead.next;


    }
};
```
