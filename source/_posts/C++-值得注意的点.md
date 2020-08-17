---
title: C++-值得注意的点
categories:
- C++
date: 2020-02-17 02:17:00
---
# [explicit 说明符——Cppreference](https://zh.cppreference.com/w/cpp/language/explicit)
指定构造函数 (及转换函数或推导指引) 为显式, **不能被隐式调用**
```cpp
//from Cpp reference
struct B
{
    explicit B(int) { }
    explicit B(int, int) { }
    explicit operator bool() const { return true; }
};

int main()
{ 
    B b1 = 1;      // 错误：复制初始化不考虑 B::B(int)
    B b2(2);       // OK：直接初始化选择 B::B(int)
    B b3 {4, 5};   // OK：直接列表初始化选择 B::B(int, int)
    B b4 = {4, 5}; // 错误：复制列表初始化不考虑 B::B(int,int)
    B b5 = (B)1;   // OK：显式转型进行 static_cast
    if (b2) ;      // OK：B::operator bool()
    bool nb1 = b2; // 错误：复制初始化不考虑 B::operator bool()
    bool nb2 = static_cast<bool>(b2); // OK：static_cast 进行直接初始化
}

```
