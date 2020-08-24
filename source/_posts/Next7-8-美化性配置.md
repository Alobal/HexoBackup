---
title: Hexo+Next7.8 美化性配置
date: 2020-07-24 20:19:42
categories:
- 工具
tags:
- 博客

---
# 前情提要

- Next 7.8.0
- hexo 4.2.1
- npm 6.14.5
- Next 配置文件指 项目根目录/themes/next/_config.yml
- 项目配置文件指 项目根目录/_config.yml
- 注意在配置文件中配置字段时，请严格控制缩进
- 安装命令没特别说明都在 项目根目录 下进行

**以下所有配置都建立在 7.8 版本的基础之上实现的，保新保质，绝对不是复制偷搬那些祖传博客。**


>^_^ 友情建议：进行较大更改之前，先通过如 ``git`` 等方式进行保存。并且更改后为了避免样式不刷新，尽量先``hexo clean``清除样式。生成后最好先在本地``hexo s``部署。确认没有千疮百孔再推到线上吧。

# 美化性配置
虽然功能有了，但没人想要自己的博客完全单调扁平，虽然 next 的设计已经清新的挺舒服了，但人总有自定义的需求嘛。

修改途径有两种：
- custom style 文件，覆盖单点样式，一般用于进行几个小地方的自定义等

- custom variable 文件，修改变量，变量会被其他样式引用到，因此一般修改都是整体性的，一般用于修改文章宽度，文章颜色等整体性的样式。
  >注意我在 variable 配置时发现，这里颜色字段只支持十六进制表示法，不支持 rgb 表示。

以下样式修改大多是在 styles 和 variables 两个文件中进行。

<!--more -->

## Next 样式结构

以**主题**目录为根目录，主要关注 ``./source/css`` 目录，偶尔需要 ``./layout`` 目录，结构如下：
```
NEXT
├─layout  布局相关，swig 文件，html 标记语言及嵌套语言，对新手比较难改。
│  ├─_macro
│  ├─_partials
│  ├─_scripts
│  └─_third-party
│    
│─source  资源相关
    ├─css css 样式相关
    │  ├─_common 公共部分，一般是些公共小组件的样式，什么 back 2 top 按钮
    │  │  ├─components 组件部分
    │  │  |    
    │  │  ├─outline  框架部分
    │  │  │  ├─footer  脚注
    │  │  │  ├─header  头部，菜单栏，github 彩带，书签等
    │  │  │  └─sidebar 侧栏，导航栏相关，站点概况区域相关
    │  │  |    
    │  │  └─scaffolding
    │  │      ├─highlight
    │  │      └─tags
    │  │      
    │  ├─_schemes 主题样式方案，四大主题的样式，内部调用了 variables 的值
    │  │  ├─Gemini 因此一般修改下面的_variables 的变量值就可以。
    │  │  ├─Mist
    │  │  ├─Muse
    │  │  └─Pisces
    │  │     
    │  └─_variables 以变量形式存储的 css 属性值，宽度，颜色，等全局性属性都在这里
    │  │  ├─base.styl 全局配置，下面四个为各样式对全局配置的覆盖字段
    │  │  ├─Gemini.styl
    │  │  ├─Mist.styl
    │  │  ├─Muse.styl
    │  │  └─Pisces.styl
```
variables 里配置字段非常多，基本假如修改的只是属性值的话，都可以在这里找到 ... 什么文章显示宽度、文章背景颜色，链接色 ... 详细有什么字段建议自己去摸一摸 ``base.styl``文件，变量名都很有可读性，实在看不懂自己可以修改看看变化。

variables 取值优先级：``custom variables 文件 > 主题 .styl 文件 > base.styl 全局配置``。

一般我们需要修改覆盖什么变量，即针对性的将赋值写在 custom variables 文件中即可。

>Windows 输出树形目录技巧：命令行输入 ``tree /?`` ，即可查阅 tree 命令的相关用法，照着用即可，生成的树形结构即可复制出来。

##  创建 custom 文件

在 next 配置文件中，找到下面这段，然后把需要的自定义字段取消注释，这里我们想要自定义 style 和 variable，因此取消注释这两个字段，之后可以在路径文件中写入你想要**覆盖**的样式。

**注意默认路径是 hexo 项目根目录下的 source/_data/styles.styl**，取消注释后按路径自己创建那个文件。

**再次强调，不是 next 主题目录为根的路径。**

```yml
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
  variable: source/_data/variables.styl
  #mixin: source/_data/mixins.styl
  style: source/_data/styles.styl
```

## 调试样式方法
虽然能够自定义覆盖样式，但是 css 配色总是要试试的嘛，怎么调试出自己喜欢的配色再添加到文件里呢？

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
重新生成文章即可，其他浏览器调试应该也是同理。

样式修改花样就太多了 ... 整个页面每个地方每个角落都能修改，具体每个想法怎么修改我肯定是覆盖不了的，一般通过浏览器调试找到相应的属性值修改就行。

因此下面通过几个简单的修改作为示例好了。

## 字体配置

在 next/_config.yml 里，找到 font 字段，一般配置 global 全局字体就行。

字体 CDN 默认是 google 的，可以去里面挑自己喜欢的字体，在 family 字段配置即可。

个人是比较喜欢思源宋体的。

示例如下：
```yml
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

## 标题阴影美化

标题虽然可以通过字体大小区分，但是光秃秃的几个字在全文里还是有比较混杂的感觉，即不方便分割上下文，也不凸显标题本身。

因此考虑添加阴影来增强标题感。

在 styles 中添加字段如下，具体颜色和大小参数自己配吧。
```css
.post-body h1, .post-body h2 {
    box-shadow: inset 0 -0.6em 0 #ffeb88; 
}
```

## 单句代码悬浮突出美化
单句代码无论用什么颜色修改感觉都差点意思，要么是太过鲜艳，在频繁的地方看的挺烦，要么是太过暗淡，又不够突出明显。

因此搬运了悬浮贴的 css 样式。

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

## 修改文章页面宽度
在``next\source\css\_variables``中找到对应子主题文件的如下字段：
```s
$content-desktop              = 'calc(100% - %s)' % unit($content-desktop-padding / 2, 'px');
$content-desktop-large        = 900px;
$content-desktop-largest      = 61%;
```

如果子主题文件没有，可以去``base.styl``里找。

或者自己在子主题文件里添加这个字段。

至于相应的值就自己调试成自己舒服的了。

>小提示：``hexo s``部署在本地后，可以直接修改这些 styl 文件，刷新页面即生效，不需要中断本地服务器。

## 修改文章背景色及透明度

在``next\source\css\_variables``中找到对应子主题文件的如下字段：
```s
$content-bg-color             =#ffffffc2;
```

如果子主题文件没有，可以去``base.styl``里找。

或者自己在子主题文件里添加这个字段。

值也自己调咯，推荐透明度在 0.9 左右。

# 参考美化

[randomyang 的 paper 设计](https://www.randomyang.top/2019/01/27/pixels%E5%B9%B6%E4%B8%8D%E7%AE%80%E5%8D%95/)

[co5=Shioko 个人博客](https://co5.me/)

[千灵](https://qianling.pw/)