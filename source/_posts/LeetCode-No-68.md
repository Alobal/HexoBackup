---
title: LeetCode-No-68
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
# [文本左右对齐](https://leetcode-cn.com/problems/text-justification)
给定一个单词数组和一个长度 maxWidth，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。

你应该使用“贪心算法”来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。

要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。

文本的最后一行应为左对齐，且单词之间不插入额外的空格。

说明:

单词是指由非空格字符组成的字符序列。
每个单词的长度大于 0，小于等于 maxWidth。
输入单词数组 words 至少包含一个单词。
示例:

输入:
words = ["This", "is", "an", "example", "of", "text", "justification."]
maxWidth = 16
输出:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
示例 2:

输入:
words = ["What","must","be","acknowledgment","shall","be"]
maxWidth = 16
输出:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
     因为最后一行应为左对齐，而不是左右两端对齐。       
     第二行同样为左对齐，这是因为这行只包含一个单词。
示例 3:

输入:
words = ["Science","is","what","we","understand","well","enough","to","explain",
         "to","a","computer.","Art","is","everything","else","we","do"]
maxWidth = 20
输出:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]

# 题目分析
1. 也是没有突出思路的困难题....考验代码实现细节的功底。
####    进入每行一轮的循环：
2. 计算每行能最多放多少个单词，贪心尝试，能放多少放多少= =
**2.1 注意每个单词后面要留个位置给空格**
**2.2 同时记得保存个末行标志位，以便后续末行特殊处理**
**2.3 这里用到了两个指针，一个指向起始单词，一个探索结束单词**
3. 计算每行的所需空格数，用vector存储每空应该有多少个空格，注意空格多了先在左边填，因此可以实现类似个抽屉原理，先把能平均分的部分分了，然后多的从前往后填。
**3.1 注意最后一个单词后面没有空格，计算每空空格数时可以先排除它，前面的空格全分完了，在vector后面push_back(0)即可**
**3.2 注意该行一个单词的时候需要特殊处理，把所有空格都填在vector[0]即可。**
4. 末行特殊处理，末行单词间空格数固定为1，最后一个单词之后的空格数为所有剩余空格。
5. 循环填入单词，填一个单词+vector[i]数量的空格。
6. 填入该行结果

# 题解代码
```
class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) 
    {
        vector<string>  result;
        int wordsFlag=0;//处理到的最远的单词
        int StartFlag=0;
        int SpaceNum=0;
        int wordsNum=0;//每行单词数
        int CurrentLength=0;
        bool isLast=false;
        vector<int> spaces;//存储每行每处的空格数
        while(wordsFlag<words.size())//行循环
        {   
            StartFlag=wordsFlag;
            wordsNum=0;
            CurrentLength=0;
            while(CurrentLength<maxWidth)//判断一行最多能放几个单词
            {   
                CurrentLength+=words[wordsFlag].size();
                
                if(CurrentLength+wordsNum>maxWidth)//超过了 退掉最后一次
                {
                    CurrentLength-=words[wordsFlag].size();
                    // wordsFlag--; wordsFlag 停在下一行第一个
                    break;
                }
                wordsNum++;
                wordsFlag++;

                //末行判定
                if(wordsFlag>=words.size())
                {
                    isLast=true;
                    break;
                }
            }

            //计算所需空格数
            SpaceNum=maxWidth-CurrentLength;
            
            if(wordsNum>1)//1判断，wordsNum-1=0时不能当除数
            {
                 spaces= vector<int>(wordsNum-1,SpaceNum/(wordsNum-1));//space有wordsNum-1处，每处平均有SpaceNum/(wordsNum-1)个
					for (int j = 0; j < SpaceNum%(wordsNum-1); ++j)//多的从前往后填，填多少是多少，保证左边的空格大于等于右边的
                        spaces[j] += 1;
                spaces.push_back(0);//最后一个数不要空格
            }
            else
                spaces= vector<int>(1,SpaceNum);

            //末行处理
            if(isLast==true && wordsNum>1)
            {
                int j= 0;
                for (; j <wordsNum-1; j++)
                    spaces[j]=1;//末行每处空都只有一个空格，最后是剩余空格，也是服了= =
                spaces[j]=SpaceNum-(wordsNum-1);//剩余空格
            }
                    
            string temp;
            int j=0;
            while(StartFlag<wordsFlag)
            {   
                //填充单词
                temp+=words[StartFlag];//填词
                //填充空格
                for(int i=0;i<spaces[j];i++)//填空格
                    temp.push_back(' ');
                StartFlag++;
                j++;
            }

            result.push_back(temp);

        }

        return result;
    }
};
```
