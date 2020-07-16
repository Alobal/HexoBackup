---
title: 自定义next主题博客
date: 2020-07-15 01:36:25
categories: 博客搭建
tags:
---

## 1. 概览描述
在项目配置里，第一段填写相关描述，如果是next主题，会显示在侧边栏中。
```python
# Site
title: Sitch's Blog
subtitle: ''
description: '做什么，想做什么，为了什么去做，谁知道呢 随便了'
keywords: Sitch,Blog
author: Sitch
language: zh-CN
timezone: ''
```
## 2. Next的分类和标签
在next主题配置里，选择下列字段进行注释和取消注释即可打开相关页面，例如分类页和标签页。

>分类有层级，标签没有层级。

```python
menu:
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  #tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  # schedule: /schedule/ || fa fa-calendar
  # sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```

然后在自己的每篇博客描述头中，加入``categories:`` ``tags:``的相关字段，例如这篇：
```python
categories: 
- 博客搭建
```

## 3. 网易云音乐
先去网易云音乐里生成外链播放器， 不能生成的可查找特殊方法生成。

在 项目/themes/next/layout/_macro/sidebar.swig中， 插入复制的代码，比如插入在最下面某一段.
>注意20版本后缀不是swig

## 4. 代码高亮BUG
代码高亮只有背景和行号存在， 代码字体本身不变

打扰，hexo自带的hljs简直是个巨坑，找了一整天的解决方案都没用
>正确配置了项目设置里的highlight字段，和 next主题设置里的codeblock风格

跑路保平安，改用prism-plugin。

**意外的是，prism设置了custom_css的无效路径后，即使hexo自带highlight是关闭状态，代码高亮居然被hexo的highlight接管了，除了行号没有一切正常。**
