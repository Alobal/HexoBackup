---
title: git使用相关
date: 2020-08-18 18:10:29
categories:
- 工具
tags:
- git
---

# 奇怪的问题汇总

## git连接GitHub每次都需要输入账号密码

### 背景

问题在于git clone 的时候选择的链接是HTTPS的，因此在这个仓库中，git不会通过SSH密钥去进行免密认证。

### 解决方案

命令行输入``git config  -l``

可以看到一大堆信息，关注其中一条与链接相关的：

```git
remote.origin.url=https://...
```

我们需要url的https链接改回ssh即可。

命令行输入
```git
git config remote.origin.url git@github.com:你的仓库地址
```

试着``git push``一下=。=

 <!-- more --> 

## 存在SSH密钥，但访问GitHub时Permission denied (publickey)

### 背景

在之前SSH默认路径下``C:/用户/xxx/.ssh``是存在id_rsa文件的。

但我们命令行输入``ssh -vT git@github.com``，在identity file开头，id_rsa结尾的行中 最后结尾是 -1 ,说明SSH找不到id_rsa。

### 解决办法

尝试重新生成SSH密钥，命令行输入

```git
ssh-keygen -t rsa -b 4096 -C "你的邮箱“
```

在尝试生成时，命令行会提示一句请确认文件保存位置:
```
Enter file in which to save the key (/c/WINDOWS/system32/config/systemprofile/.ssh/id_rsa):
```

注意那个默认位置...是的，这玩意把默认位置改了找不到原来的SSH文件了。憨憨

复制原来的密钥文件过去即可。

### 参考资料
[GitHub SSH故障排除文档](https://docs.github.com/cn/enterprise/2.19/user/github/authenticating-to-github/troubleshooting-ssh)

