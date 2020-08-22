---
title: 自定义 next 主题博客
date: 2020-07-15 01:36:25
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

Next 在 2020 更新了它的母仓库，由于原仓库的管理人员跑路玩失踪，没人理想提交更新的大大，于是他自己重新开了一个 2020 Next 8.0.0 版本的库。..

不过我刚入坑的时候试了下 8.0 版本，发现有些配置文件都改了。. 找不到对应的教程。而之前版本的教程更加详细丰富，因此我还是用了 7.8 版本。

以下所有配置都建立在 7.8 版本的基础之上实现的，保新保质，绝对不是复制偷搬那些祖传博客。

在吗？吐槽无数遍，2020 的人为什么写博客还抄的 Next4.0 版本<( ‵□′)>───就算你不想用 2020 大改版的版本，好歹和我一样用个 7.8 吧！！至少来个 7.0+吧孩子们！！退一万步 6.0+也是可以的啊！！哇的一声吼出来！！

>^_^ 友情建议：进行较大更改之前，先通过如 ``git`` 等方式进行保存。并且更改后为了避免样式不刷新，尽量先``hexo clean``清除样式。生成后最好先在本地``hexo s``部署。确认没有千疮百孔再推到线上吧。

 <!-- more --> 

# 功能性配置
 

一些比较常规的功能性配置 Next 文档里都有的。

虽然是英文文档，虽然可能和你的版本有一点点不同，但它是基本跟着最新版本，是真的好用！！（怒吼

比起网上到处炒几年前的旧版本冷饭有用多了！！！

另外可以多摸摸 Next 配置文件，里面注释写的蛮详细的，有些东西看注释就知道能开启什么功能，当然，有很多功能需要额外插件支持。

[Next 官方手册](https://theme-next.js.org/docs/)

##  站点概览描述
在项目配置里，第一段填写相关描述，如果是 next 主题，会显示在侧边栏中。
```yml
# Site
title: Sitch's Blog
subtitle: ''
description: '做什么，想做什么，为了什么去做，谁知道呢 随便了'
keywords: Sitch,Blog
author: Sitch
language: zh-CN
timezone: ''
```

## 配置头像
在 Next 配置文件下找到 ``avatar``字段，有如下配置项：

```yml
# Sidebar Avatar
avatar:
  # Replace the default image and set the url here. 你的头像图片路径
  url: /images/avatar.png
  # If true, the avatar will be dispalyed in circle. 要不要圆化
  rounded: false
  # If true, the avatar will be rotated with the cursor. 要不要在指针悬停时旋转头像
  rotated: false
```

如上给了个示例路径，然后将头像放在 **主题**目录下的 source/images/avatar.png 即可。

另外两个属性可以按需配置。

重新生成部署网站，瞅瞅你的大头照吧。

>头像图片大小没关系，会自动缩放，但是比例不变，即使圆化也会变成椭圆。因此请注意图片比例最好是正方形，美观。

## Next 的分类和标签
在 next 主题配置里，选择下列字段进行注释和取消注释即可启用相关页面，例如分类页和标签页。
>分类有层级，标签没有层级。

```yml
menu: # 子链接 || font-font awesome 图标
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
```md
categories: 
- 博客搭建
```

##  网易云音乐
先去网易云音乐里生成外链播放器， 不能生成的可查找特殊方法生成。

在 项目/themes/next/layout/_macro/sidebar.swig 中， 插入复制的代码，比如插入在最下面某一段。
>注意 2020 版本后缀不是 swig，相关文件也不一样

## 导入豆瓣评价页面

个人博客肯定想记录点自己生活向的东西，看过的电影，玩过的游戏就是一个很好的记录对象。

之前我是用 markdown 写了个文本条目性质的，不说难看吧，但起码豆瓣条目自带一些影片介绍信息。..

### 安装 hexo-douban 插件

命令行输入
```shell
npm install hexo-douban --save
```

将下面的配置写入**项目**配置文件：

```yml
douban: #不想启用的页面注释掉即可
  user: 豆瓣 id  
  builtin: false  #是否将生成豆瓣页面功能嵌入到 hexo s 和 hexo g
  book:
    title: 'This is my book title'  #页面标题
    quote: 'This is my book quote'  #页面序言
  movie:
    title: 'This is my movie title'
    quote: 'This is my movie quote'
  game:
    title: 'This is my game title'
    quote: 'This is my game quote'
  timeout: 10000 #爬取豆瓣数据的超时时间，别管了
```

豆瓣 id 可以在进入你的豆瓣个人主页，观察网址获得。通常为：

```
https://www.douban.com/people/你的 id/
```

### hexo douban 命令

用法如下：

```yml
Usage: 命令行输入 hexo douban

Description:
爬取生成豆瓣相关页面

Options: #默认参数 -bgm
  -b, --books   Generate douban books only
  -g, --games   Generate douban games only
  -m, --movies  Generate douban movies only
  -h，显示帮助
```

### 使用方法

- ``hexo douban ``生成相关页面再进行部署。
- builtin 开启时，直接 hexo s 和 hexo g 即包含生成过程。

>注意安装了 hexo-douban 之后，我们多了个``hexo douban``的命令，因此不能再用``hexo d``作为``hexo deploy``的缩写了。

### 开个主页栏

生成部署后就可以通过``/主网址/movies``类似的形式访问了，但这样显然不方便，因此我们开个主页栏给它。

和之前开启分类页一样，在**主题**配置文件中，找到 menu 字段，添加相应的值，如下以 movies 举例进行修改：

```yml
menu: # 子链接 || font-font awesome 图标
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  movies: /movies/ || fa fa-film  #添加了 movies 页
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat

```

但是这样开启之后，显示的是 movies ，想改成中文显示需要在``主题目录/languages/zh-CN``中配置一下，自己打开看看就懂得怎么配了，懒得贴实例了哈=。=

### 参考资料
[hexo-douban 文档](https://github.com/mythsman/hexo-douban)

## 字数统计和阅读时长

在 next 主题配置文件中搜索 wordcount，可以看到它默认支持的插件是 [hexo-symbols-count-time](https://github.com/theme-next/hexo-symbols-count-time)

使用命令行 npm 输入命令进行安装：``npm i hexo-symbols-count-time --save``

项目_config.yml 里追加一段（没追加这一段导致统计为 NaN
```yml
symbols_count_time:
	symbols: true
	time: true
	total_symbols: true
  total_time: true
  awl: 2      #设置 2 个字符看作一个字
  wpm: 200    #每分钟阅读字数
```

next 主题 _config.yml 里找到字段 symbols_count_time 按需配置即可：
```yml
# Post wordcount display settings
# Dependencies: https://github.com/theme-next/hexo-symbols-count-time
symbols_count_time:
  separated_meta: true
  item_text_post: true
  item_text_total: true

```

重新生成部署即可，如果没有效果，试试 hexo clean 再重新生成

## 首页摘要 阅读全文

如果你是找了半天博客，发现他们都说 Next 自带自动摘要功能，但自己这就是不起作用的时候，恭喜你，和我一起把那些馊饭博客砸了吧。

7.6 以后的 Next 删除了自动摘要功能，原因是它觉得它负担了太多。..

我 7.8 的 Next 配置文件里只有个``excerpt_description``，这个功能是自动将博客头描述里的``description``字段当作摘要。

所以现在首页摘要只有两种办法：

- 为每个博客写好 description
- 在博客中间手动添加`` <!-- more --> ``以截断

## 添加百度分析

登陆 [百度统计](https://tongji.baidu.com/web/10000256460/welcome/login)

进入个人页，选择侧栏的代码获取页

可以看到如下一段代码，找到``hm.js?``之后的序列号复制。
```js
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js? 复制这段";
  var s = document.getElementsByTagName("script")[0]; 
```

填写在 next 配置里的百度分析字段中：
```yml
# Baidu Analytics
baidu_analytics: 粘贴到这里
```

之后等待一段时间就可以去百度分析主页看网站情况啦。

然后你就能开心地发现几天，几十天，几百天，访问量蹭蹭蹭的涨，访问 ip 一直都只有 1 个 hhhh。

嗯，其实在被搜索引擎收录之前别人是搜不到你的博客的。

请捞一捞下面的 Google 收录方法。

## Google 收录

以 Next 主题为例

登录 [Google Search Console](https://search.google.com/search-console/)

>当然，没有账号的话需要自己搞好 Google 账号

### 选择资源类型

我是 GitHub Pages 域名的个人网站，所以选右边的单网址的资源类型。把博客网址复制过去即可创建资源。

### 验证网站所有权
Goolge 推荐验证方法是下载 HTML 文件。但是，我们不用。毕竟一个``hexo clean``网页就没了。..

选下面的 HTML 标记验证，可以看到形如下面的一段代码。

```html
<meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXXXXX">
```

把 xxxx 的东西复制好。

打开 Next 的配置文件，搜索到``google_site_verification``字段，把复制的字段填进去就好。

``hexo clean;hexo g;hexo d``一套刷新网站组合拳。

回刚才的 Google 家里点击进行验证即可。

验证成功后可以 Google 搜索``site: 你的网址``试试，理应看到你的博客网址。

>这里很多看很多博客都是在抄几年前的方法，明明 2020 了啊哥哥们，Next 已经传宗接代到 8.0 了！！已经有内置``google-site-verification``字段了！！
>
>明明限制了搜索时间是半年以内，结果 2020 年这群人写的教程还是抄的 10 年的东西看着好烦啊喂！！！！！！！！！！！！！！

### 添加站点地图 SiteMap

站点地图可以将我们网站的组织架构提供给 Google，都是为了搜索优化==

安装 hexo 自动生成站点地图的插件：

``npm install hexo-generator-sitemap --save``

安装成功后在项目配置文件中添加：

```yml
sitemap:
  path: sitemap.xml
```

这样插件每次会在``hexo g``时自动生成 sitemap.xml 文件，放在/public/下面。

>注意博客文件名带有``&``时，生成的 sitemap.xml 会有错误，我的解决办法是修改文件名。

其实我们也知道每次部署出去的网站也就是/public/目录，所以 sitemap.xml 相当于放在网站根目录下面。

因此我们把``你的网站地址/sitemap.xml``这个链接提交给 Google 即可。

执行``hexo g;hexo d``生成 sitemap 并部署出去。

在 [Google SearchConsole](https://search.google.com/search-console/sitemaps/) 侧栏找到站点地图，提交上面说的链接，完毕。

##  代码高亮 BUG
代码高亮只有背景和行号存在， 代码字体本身不变

打扰，hexo 自带的 hljs 简直是个巨坑，找了一整天的解决方案都没用。~~我恨不得删项跑路~~

>正确配置了项目设置里的 highlight 字段，和 next 主题设置里的 codeblock 风格

跑了跑了连夜跑了 ，~~隔壁 prism-plugin 真香~~。

>意外的是，prism 设置了 custom_css 的无效路径后，即使 hexo 自带 highlight 是关闭状态，代码高亮居然被 hexo 的 highlight 接管了，除了行号没有一切正常。当然，要正常使用还是用 prism 吧。

好吧也不是那么香，prism 的语法提示挺简陋的。.. 烦到，这个坑好大 (╯‵□′)╯︵┻━┻

被简陋到，改回 highlight 了，不知道为啥高亮又可以用了，但是觉得 next 的几款 highlight 都不太搭白底网站，于是摸了一遍发现``themes\next\source\css\_common\scaffolding\highlight\``路径下的文件存储着几套主题的配色，可以自己改一套喜欢的了。

# 美化性配置
虽然功能有了，但没人想要自己的博客完全单调扁平，虽然 next 的设计已经清新的挺舒服了。

修改途径有两种：
- 自定义 style 文件，覆盖样式，一般用于修改颜色等

- 修改``next\source\css\``下的文件，一般用于修改文章宽度，文章颜色等整体性的 css.
  >注意我自己在这里面的文件配置的时候发现，这里颜色只支持十六进制表示法，不支持 rgb 表示。..

##  自定义样式，如配色等
### 修改方法
在 next 配置文件中，找到下面这段，然后把需要的自定义字段取消注释，这里我们想要自定义 style，因此取消注释 style 字段，之后可以在路径文件中写入你想要**覆盖**的样式。

**注意是 hexo 项目根目录下的 source/_data/styles.styl**，没有则自己创建。
**注意不是 next 主题目录下的路径**
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
  #variable: source/_data/variables.styl
  #mixin: source/_data/mixins.styl
  style: source/_data/styles.styl
```
以下样式修改大多是在 styles 文件中进行。

>有些属性，像文章宽度，在``next\source\css\_variables``目录下的文件中修改，注意相应主题的文件会覆盖 base 文件。其中的字段意义大概看看英语就能懂，或者在页面 F12 调试的时候看看。

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

## 标题阴影配置

标题虽然可以通过字体大小区分，但是光秃秃的几个字在全文里还是有比较混杂的感觉，即不方便分割上下文，也不凸显标题本身。

因此考虑添加阴影来增强标题感。

在 styles 中添加字段如下，具体颜色和大小参数自己配吧。
```css
.post-body h1, .post-body h2 {
    box-shadow: inset 0 -0.6em 0 #ffeb88; 
}
```

## 单句代码悬浮突出配置
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

值也自己调咯，推荐透明度在0.9左右。

# 参考资料
[randomyang 的 paper 设计](https://www.randomyang.top/2019/01/27/pixels%E5%B9%B6%E4%B8%8D%E7%AE%80%E5%8D%95/)
[Next 进阶文档](https://theme-next.iissnan.com/third-party-services.html)
[Next Document](https://theme-next.js.org/docs/)