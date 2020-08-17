---
title: C++派生类构造函数初始化顺序问题
date: 2020-05-15 01:01:11
categories: 
- C++
---

众所周知，派生类构造时先会初始化构造基类，然后构造自身。

## 1. 派生类私有成员 和 基类 同时初始化
假如派生类的构造函数，初始化时显式初始化基类，同时显式初始化派生类成员，那么先后顺序是怎样的呢？
测试背景：

```cpp
#include<iostream>
using namespace std;
class base
{
	int x;
public:
	base(int i) :x(i) { }

	void dispb()
	{
		cout << "x=" << x << " " << "base
";
	}
};

class derived : public base
{
	int a=0;
public:
	derived(int i) :a(i), base(a) {  }

	void dispd()
	{
		cout << "a=" << a << " " << "derived
";
	}
};
int main()
{
	derived obj(8);
	base*p =&obj;
	p->dispb();
	system("PAUSE");
	return 0;
}
```
 
如上，派生类Derived构造时，基类初始化base(a)，用了派生类私有成员a，同时a也被参数i初始化。此时因为基类初始化在a初始化之前，传给base（）的a是随机值。输出结果是：
![x!=i](https://wx4.sinaimg.cn/mw1024/b8e57787gy1ggtt5j2vutj204p02f3yb.jpg)


所以我们可以知道，即使是初始化列表里，即使a的初始化排在前面，也一定是先初始化基类base，再调用派生类私有成员的初始化。
>想要正常构造，把base（a)改成base（i）即可。




## 2. 派生类初始化私有成员，基类在函数体内构造

###  假如派生类的构造函数是这样的：初始化私有成员，体内构造基类。
```cpp
derived(int i) :a(i) { base(i); }
```
会提示类base不存在默认构造函数。

我们可以得知，在派生类构造函数中，假如初始化了自己的变量成员，则会自动先调用基类构造，再对派生类的成员进行初始化，上例因为base没有无参数的默认构造函数所以报错。

###  假如基类有无参数的构造函数呢？讲道理会是先调用基类默认构造，再初始化a，再调用base(i)，是这样吗？

增加一个无参数的基类构造函数：
```cpp
base() { cout <<"This is base()"<< x << endl; }
.....
derived(int i) :a(i) { base(i); }
```

报错：形参 i 重定义——明明只声明了一次 i ，怎么就重定义了呢？把a(i)删去？还是报错重定义

——[搜了一下类似问题，发现题解](https://segmentfault.com/q/1010000014553913)，对base（i)在里面的时候：
“此时编译器会把它解析成变量声明，由此局部变量i与函数参数重名。根据语法，它可以被解释成函数式显式类型转换或者声明，存在二义性。标准约定将其解释成声明。”

### 这里面存在 声明  语句 定义 等根本性语法的规则定义= =

具体了解得看其他详细资料，不过我们知道了报错是因为在 base(i) 中，i被当成了新的局部变量，和外面的函数参数重定义冲突。

###  i 冲突那我不用 i 了，我用base（a)可以吧？a是被初始化的变量拿去赋值没问题吧？

派生类构造函数改成：
```cpp
base(int i) :x(i) { cout <<"base(int i): "<< x << endl; }
base() { cout <<"This is base()"<< x << endl; }
......
derived(int i)：a(i){ cout << "a:" << a << endl; base(a); }
```
### derived(8)运行，猜猜运行结果是什么？

我们知道初始化a时，先会调用base（）
然后初始化a
然后进入函数体内输出a值
然后a传参给base（int i）
Really？
![运行结果:](https://wx3.sinaimg.cn/mw1024/b8e57787gy1ggtt5j06rmj20mi05hgln.jpg)
