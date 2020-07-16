---
title: LeetCode-No-94-二叉树中序遍历
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [二叉树中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal)
给定一个二叉树，返回它的中序 遍历。

>示例:
>
>输入: [1,null,2,3]
1
       \ \
       2
    /
   3
>
>输出: [1,3,2]

# 题解分析
1.**递归法**很简单，跳过进入**迭代法**。
2. 分析中序遍历顺序：左子树 父节点 右子树，
3. 且对左子树还要以 左子树的左子树 左子树 左子树的右子树的顺序递归下去
4. 因此表现出来就是，**一直左到底**，然后输出左 返回父节点并输出，然后输出右子节点
然后再返回到父节点的父节点，以此类推。
>父节点同时也是父父节点的左子树，因此回溯上去的时候顺序是**”父（左）-右“、”父（左）-右“**。
5. 先进后出，存储结构使用**栈**
6. 对root先往左压栈到底，然后出栈输出，并输出右节点，然后继续出栈。

# 题解代码
```
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) 
    {
        vector<int> result;
        if(root==NULL)
            return result;
        stack<TreeNode*> mem;
        TreeNode* current=root;
        while(!mem.empty() || current)
        {
            //循环先把左树压栈
            while(current)
            {
                mem.push(current);
                current=current->left;
            }

            current=mem.top();//父节点（同时是父父节点左节点） 出栈
            result.push_back(current->val);//输出父节点（同时是父父节点左节点）
            current=current->right;//输出右节点
            mem.pop();//上去一层
        }
        return result;
    }

};
```
