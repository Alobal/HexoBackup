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

## 5. 自定义样式，如配色等
5.1 修改方法
在next配置文件中，找到下面这段，然后把需要的自定义样式取消注释，在路径文件中写入你想要**覆盖**的样式。
**注意是hexo项目根目录下的source/_data/styles.styl**，没有则自己创建。
**注意不是next主题目录下的路径**
```python
# Define custom file paths.
# Create your custom files in site directory `source/_data` and uncomment needed files below.
custom_file_path:
  #head: source/_data/head.swig
  #header: source/_data/header.swig
  #sidebar: source/_data/sidebar.swig
  #postMeta: source/_data/post-meta.swig
  #postBodyEnd: source/_data/post-body-end.swig
  #footer: source/_data/footer.swig
  #bodyEnd: source/_data/body-end.swig
  #variable: source/_data/variables.styl
  #mixin: source/_data/mixins.styl
  style: source/_data/styles.styl
```

5.2 调试样式方法
虽然能够自定义覆盖样式，但是配色总是要试试的嘛，怎么调试出自己喜欢的配色再添加到文件里呢？

chrome打开博客网站，右键你想要更改的元素，例如正文背景，在右键菜单中点【检查】，可以看到如图的调试台，右边则是相应的元素样式。如图：
![主要找右边的样式表](https://wx1.sinaimg.cn/mw1024/b8e57787gy1ggtuquyezgj20wn0di0v3.jpg)
比如这里我就把正文背景从原来的纯白，修改为了带点暖黄的护眼色。
然后把更改的这段复制到styles.styl即可，如下：
```css
//正文背景护眼色
:root {
    --body-bg-color: #f9dbb647;
}
```
重新生成文章即可，其他浏览器调试应该也是同理，没试过。



