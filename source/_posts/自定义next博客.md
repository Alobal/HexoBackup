---
title: 自定义 next 主题博客
date: 2020-07-15 01:36:25
categories: 博客搭建
tags:
---
# 功能性配置

##  站点概览描述
在项目配置里，第一段填写相关描述，如果是 next 主题，会显示在侧边栏中。
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
## Next 的分类和标签
在 next 主题配置里，选择下列字段进行注释和取消注释即可启用相关页面，例如分类页和标签页。
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

但相关页面还需要自己生成，在项目根目录下输入相应命令，创建相关页面。
- ``hexo new page categories``
- ``hexo new page tags``

并且打开生成的页面，在元数据中相应添加字段
- ``type: categories``
- ``type: tags``。

然后在自己的每篇博客描述头中，加入``categories:`` ``tags:``的相关字段，例如这篇：
```python
categories: 
- 博客搭建
```

##  网易云音乐
先去网易云音乐里生成外链播放器， 不能生成的可查找特殊方法生成。

在 项目/themes/next/layout/_macro/sidebar.swig 中， 插入复制的代码，比如插入在最下面某一段。
>注意 20 版本后缀不是 swig，相关文件也不一样



##  代码高亮 BUG
代码高亮只有背景和行号存在， 代码字体本身不变

打扰，hexo 自带的 hljs 简直是个巨坑，找了一整天的解决方案都没用
>正确配置了项目设置里的 highlight 字段，和 next 主题设置里的 codeblock 风格

跑路保平安，改用 prism-plugin。

**意外的是，prism 设置了 custom_css 的无效路径后，即使 hexo 自带 highlight 是关闭状态，代码高亮居然被 hexo 的 highlight 接管了，除了行号没有一切正常。**



# 美化性配置
虽然功能有了，但没人想要自己的博客完全单调扁平，虽然next的设计已经清新的挺舒服了。

##  自定义样式，如配色等
### 修改方法
在 next 配置文件中，找到下面这段，然后把需要的自定义样式取消注释，在路径文件中写入你想要**覆盖**的样式。
**注意是 hexo 项目根目录下的 source/_data/styles.styl**，没有则自己创建。
**注意不是 next 主题目录下的路径**
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
以下样式修改大多是在styles文件中进行。

### 调试样式方法
虽然能够自定义覆盖样式，但是配色总是要试试的嘛，怎么调试出自己喜欢的配色再添加到文件里呢？

chrome 打开博客网站，右键你想要更改的元素，例如正文背景，在右键菜单中点【检查】，可以看到如图的调试台，右边则是相应的元素样式。如图：
![主要找右边的样式表](https://wx1.sinaimg.cn/mw1024/b8e57787gy1ggtuquyezgj20wn0di0v3.jpg)
比如这里我就把正文背景从原来的纯白，修改为了带点暖黄的护眼色。
然后把更改的这段复制到 styles.styl 即可，如下：
```css
//正文背景护眼色
:root {
    --body-bg-color: #f9dbb647;
}
```
重新生成文章即可，其他浏览器调试应该也是同理，没试过。


## 字体配置

在 next/_config.yml 里，找到 font 字段，一般配置global全局字体就行。

字体CDN默认是google的，可以去里面挑自己喜欢的字体，在family字段配置即可。

个人是比较喜欢思源宋体的。

示例如下:
```python
font:
  enable: true

  # Uri of fonts host, e.g. https://fonts.googleapis.com (Default).
  host:

  # Font options:
  # `external: true` will load this font family from `host` above.
  # `family: Times New Roman`. Without any quotes.
  # `size: x.x`. Use `em` as unit. Default: 1 (16px)

  # Global font settings used for all elements inside <body>.
  global:
    external: true
    family: Noto Serif SC
    size:
```

## 标题阴影配置

标题虽然可以通过字体大小区分，但是光秃秃的几个字在全文里还是有比较混杂的感觉，即不方便分割上下文，也不凸显标题本身。

因此考虑添加阴影来增强标题感。

在styles中添加字段如下，具体颜色和大小参数自己配吧。
```css
.post-body h1, .post-body h2 {
    box-shadow: inset 0 -0.6em 0 #ffeb88; 
}
```

## 单句代码悬浮突出配置
单句代码无论用什么颜色修改感觉都差点意思，要么是太过鲜艳，在频繁的地方看的挺烦，要么是太过暗淡，又不够突出明显。

因此搬运了悬浮贴的css样式。

单句代码和代码块都在``code``类下面，因此最好加个``p``类限制为仅单句代码。
```css
p code {
    font-size: 1em;
    line-height: 1.5rem;
    color: #333;
    font-weight: bold;
    border: 1px solid #ebc65a;
    background: #fff;
    box-shadow: 0.2em 0.2em 0 0 #ebc65a;
    padding: 0.1em 0.4em;
    margin: 0 0.4em;
    vertical-align: bottom;
}
```

# 参考设计
[randomyang的paper设计](https://www.randomyang.top/2019/01/27/pixels%E5%B9%B6%E4%B8%8D%E7%AE%80%E5%8D%95/)