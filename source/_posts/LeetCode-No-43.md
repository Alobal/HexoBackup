---
title: LeetCode-No-43
categories:
- LeetCode
date: 2020-02-17 02:17:00
---
#  [字符串相乘](https://leetcode-cn.com/problems/multiply-strings)
>给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
>
>示例 1:
>>
>>输入: num1 = "2", num2 = "3"
输出: "6"
>
>示例 2:
>>
>>输入: num1 = "123", num2 = "456"
输出: "56088"
>
>说明：
>
>num1 和 num2 的长度小于110。
num1 和 num2 只包含数字 0-9。
num1 和 num2 均不以零开头，除非是数字 0 本身。
不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

# 题目分析
>//1 2 3 num1
//4 5 6 num2
//7 3 8+6 1 5 * 10+..... reverseresult
##   1. 竖式暴力模拟 
>因为现实竖式乘法是从右到左落位, 程序从左到右方便一些,所以运算过程中是反向存储的乘法结果,最后需要翻转.
>
>当然这个可以优化
####     1.1 整数相乘直接思维是按竖式相乘, 显而易见两次循环,外层num2,内层num1
####     1.2 对num2的最后一位,乘num1一遍,currentresult保存这遍的结果.
####     1.3 result累加上currentresult, (加法也有点麻烦, 还得写个加法函数
####     1.4  因为最后一位乘过了就没用了,num2.pop_back(),
####     1.5 注意乘完一个数, 下一个currentresult要向左移一位,即X10尾部添0, 而我们又是反向存储,所以需要在currentresult头部加i个"0", i=pop次数
####     1.6 num2所有数都用过了即num2="",结束循环
####     1.7 考虑一些收尾工作,进位有没有多, 要不要连续进位
####     1.8 将累加结果result反转, 得到真实结果

可以看到暴力法虽然思路直接,但是需要处理的东西也不少,而且时间空间效率都不理想, 权当一个编码锻炼.

##   暴力代码:
```
class Solution {
public:
	string multiply(string num1, string num2)
	{
		if (num1 == "0" || num2 == "0")
			return "0";

		string result;
		string tempresult;
		string zerostring;
		int i;
		int cflag = 0;
		while (num2 != "")//num1对num2每个数逐个相乘,每次result=result+currentresult*10
		{
			for (i = num1.size() - 1; i >= 0; i--)
			{
				tempresult.push_back('0' + ((num1[i] - '0')*(num2.back() - '0') + cflag) % 10);
				cflag = ((num1[i] - '0')*(num2.back() - '0') + cflag) / 10;
			}
			//乘到最后一个数还剩下cflag
			if (cflag > 0)
				tempresult.push_back('0' + cflag);
			//用零串移位
			tempresult = zerostring + tempresult;
			//相加上下两个字符串
			ADDstring(result, tempresult);
			//乘完num2的一个数num2把用过的数pop
			num2.pop_back();
			//临时数据清空
			tempresult.clear();
			zerostring += "0";
			cflag = 0;
		}
		//1 2 3
		//4 5 6
		//7 3 8+6 1 5 * 10
		string reverseresult;
		for (int j = result.size() - 1; j >= 0; j--)
			reverseresult.push_back(result[j]);
		return reverseresult;
	}

	void ADDstring(string& up, string& down)//up和down字符串数值相加,结果存在up里,仅适用倒序存储
	{
		int j = 0;
		int cflag = 0;
		int temp = 0;
		//result接在up上面
		while (j < down.size())
		{
			if (j < up.size())//up[j]存在
			{
				temp = (up[j] - '0') + (down[j] - '0') + cflag;
				up[j] = (temp) % 10 + '0';
				cflag = (temp) / 10;
			}
			else//up[j]不存在
			{
				up.push_back(((down[j] - '0') + cflag) % 10 + '0');
				cflag = ((down[j] - '0') + cflag) / 10;
			}

			j++;
		}
		while (cflag != 0)
		{
			if (j < up.size())//up[j]存在
			{
				temp = (up[j] - '0') + cflag;
				up[j] = (temp) % 10 + '0';
				cflag = (temp) / 10;
			}
			else//up[j]不存在
			{
				up.push_back(cflag % 10 + '0');
				cflag = cflag / 10;
			}
		}


	}
	
};
```

##   2. 优化思路——每一位数的乘法运算对result影响分析

>//1 2 3 num1[i]   //为示范简单,这里序号从右往左编码,程序中需要转换
//4 5 6 num2[j]
//例如num1[0]和num2[0]相乘 : 3X6=18
肯定影响到了result[0+0],有进位则会影响到result[0+0+1], result其他的值则肯定不会改变

####     2.1 优化分析: 在竖式中,从右向左编码,  两个数num1[i], num2[j]相乘, 则只会影响到result[i+j] , result[i+j+1]两位的结果,
####     2.2 因此我们不需要临时存储的容器currentresult, 只需要在 result中修改受影响的两位即可
####     2.3 另外num2.pop_back虽然符合直觉习惯,但显然我们可以通过移动下标来代替反复的pop
>事实证明对于一些修改字符串的操作还是小心为慎, 虽然pop这个操作看起来只需要剪掉尾巴就好, 应该耗时影响不大 , **但事实上我卡在80%就是因为它!!!!**, 优化掉后直接97%= =.
####     2.4 反转问题: 同上可知, 乘法最远也就影响到result[length1+length2+1]. 即result长度已知, 因此可以反向填充result即可避免最后还得反转.
>暴力法时因为不清楚result到底会有多长, 所以不能反向填充.
####     2.5 另外还有一些小细节思考:
####     比如连续进位有没有问题
####     循环结束需不需要有收尾整理
####     我们现在result里填充了[length1+length2+1]的 '0' 方便我们后续反向填充和累加, 但是result[0]是最后一位进位的结果, 假如最后没有进位呢?

# 优化代码, 超越97%时间,86%内存
```
class Solution {
public:
	string multiply(string num1, string num2)
	{
		if (num1 == "0" || num2 == "0")
			return "0";

           
		string result;
        int totallength=num1.size()+num2.size();//result最大可能长度
		int i;
        int j=0;
		int cflag =0;
        int temp=0;//i+j位和存储器


        for(i=0;i<totallength;i++)//初始化填充
        {
            result.push_back('0');
        }
        //反向填充,可以不需要在最后reverse,....好像对效率影响不大
        //把num2.pop()删掉了,终于从8ms提到了4ms......
		while (j<num2.size())//num1[i]Xnum2[j] 只影响result的[i+j]和[i+j+1],因此相比暴力相加,可以优化中间步骤
		{
			for (i = num1.size() - 1; i >= 0; i--)
			{   //因为要改变i+j位,所以先计算出i+j+1位,(程序用的i和注释i不是一个)
                temp=(result[totallength-1-((num1.size()-i-1)+j)]-'0')+ (num1[i] - '0')*(num2[num2.size()-1-j] - '0');
                //连续进位怎么办?临时存储?循环清理干净?
                //临时存储试试
                result[totallength-1-((num1.size()-i-1)+j+1)]+=temp/10;
				result[totallength-1-((num1.size()-i-1)+j)]='0'+temp%10;
			}
            
            
            j++;
		}
        //不需要检查最后一位要不要进位
       
		//1 2 3
		//4 5 6
		//7 3 8+6 1 5 * 10

        //跳过头部的0
        if(result[0]!='0')
		    return result;
        else
            return result.substr(1);
	}

	
};
```
-------------
string.pop_back()真的卡了我好久, 左优化右优化, 去头部0的方法换了又换, 就是卡在80% .......谨慎考虑库函数的效率.
