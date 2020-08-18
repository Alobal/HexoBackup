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

### 原因

问题在于git clone 的时候选择的远程连接是HTTPS的，因此git不会通过SSH密钥去进行免密认证。

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
