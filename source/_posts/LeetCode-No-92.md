---
title: LeetCode-No-92
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [反转链表](https://leetcode-cn.com/problems/reverse-linked-list-ii)
反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明:
1 ≤ m ≤ n ≤ 链表长度。

>示例:
>
>输入: 1->2->3->4->5->NULL, m = 2, n = 4
>输出: 1->4->3->2->5->NULL

# 题目分析
1. 反转一段区域，首先肯定想到是一个一个反转
> 比如2->3->4  先3插前面去 3->2->4 ，然后4插前面去 4->3->2
2. 怎么移过去呢？观察这个局部链表，可以知道我们每次把要处理的插入到链表头即可。
3. 因此保留一个pre指向反转区域头部，例如示例中是1
4. 遍历反转区域元素current，令temp=current->next保存下位，处理好current的前后指向关系，然后把temp插入到链表头，即pre->next即可。

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
    ListNode* reverseBetween(ListNode* head, int m, int n) 
    {
        int count=1;
        ListNode* temp;
        ListNode* current;
        
        ListNode First(0);
        First.next=head;
        ListNode* pre=&First;
        while(count<m)//pre停在原第m-1个数
        {
            pre=pre->next;
            count++;   
        }
        current=pre->next;//current指向当前处理数
        
        while(count<n)//count计数位，每次将current->next插入到pre->next，相当于利用pre做了个栈，[1,2,3,4,5]为例 current=2 pre=1
        {
            temp=current->next;//保留current后节点，temp=3
            current->next=temp->next;//2->next=4
            temp->next=pre->next;//逆转temp和current的前后关系。3->next=2
            pre->next=temp;//更新pre的后节点，1->next=3
            //current
            count++;//完成[1,3,2,4,5]
        }

        return First.next;

    }
};
```
