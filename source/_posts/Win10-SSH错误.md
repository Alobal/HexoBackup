---
title: Win10-cmd-PowerShell-SSH无法创建目录-和-SCP-找不到文件
categories:
- 工具
date: 2020-02-17 02:17:00
---
# 问题: SSH无法找到目录和文件

## 错误信息

###  输入SSH root@remotenode

>输出: 
无法创建目录  Could not create directory: C:\users\\123\456\789\.ssh 
无法添加信任主机列表 Failed to add.....

然而.ssh目录明明就在用户名文件夹下存在= =


配置的免密登录远程主机也不能用


###  scp ./test.txt root@remotenode:/root/test.win
无法找到文件 : No Such File
事实上这个文件存在

## 原因猜测: 用户名带中文或特殊字符,  导致路径无法识别
cmd和PowerShell 的编码都是GBK, 讲道理是可以用中文的...

但是使用SSH命令显而易见可以看到中文名被解析成了转义字符 "\323" 之类的.

使用chcp 65001换成utf-8也不行

当然也不可能重命名用户名文件夹..一大堆程序数据都在下面呢= =


## 我的可行方案 : 
###  使用git bash 代替[cmd/PowerShel] 
之前装git有装git bash. 并且git bash 里可以设置中文字符集,因此就试了一下, 发现完全没有障碍= =

环境什么的完全没变, **可以正常找到.ssh目录 , 可以正常写入 known_host ,除了在第一次登的时候询问写入known_host, 之后免密登录也可以正常使用.**

 scp可以正常发送用户名目录下的文件, 不会找不到.

**果然查遍全网也解决不了的问题是cmd自身的问题= =**

###  使用SSH工具,如Putty
使用Putty open登录主机, 好像不会提示known_host 的事情, 但是可以顺利免密登录.
