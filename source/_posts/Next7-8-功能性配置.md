---
title: Hexo+Next7.8 功能性配置
date: 2020-07-23 01:36:25
categories: 
- 工具
tags:
- 博客
---

环境信息：
- Next 7.8.0
- hexo 4.2.1
- npm 6.14.5
- Next 配置文件指 项目根目录/themes/next/_config.yml
- 项目配置文件指 项目根目录/_config.yml
- 注意在配置文件中配置字段时，请严格控制缩进
- 安装命令没特别说明都在 项目根目录 下进行

Next 在 2020 更新了它的母仓库，由于原仓库的管理人员跑路玩失踪，没人理想提交更新的大大，于是他自己重新开了一个 2020 Next 8.0.0 版本的库。..

不过我刚入坑的时候试了下 8.0 版本，发现有些配置文件都改了 ... 找不到对应的教程。而之前版本的教程更加详细丰富，因此我还是用了 7.8 版本。

**以下所有配置都建立在 7.8 版本的基础之上实现的，保新保质，绝对不是复制偷搬那些祖传博客。**

在吗？吐槽无数遍，2020 的人为什么写博客还抄的 Next4.0 版本<( ‵□′)>───就算你不想用 2020 大改版的版本，好歹和我一样用个 7.8 吧！！至少来个 7.0+吧孩子们！！退一万步 6.0+也是可以的啊！！

>^_^ 友情建议：进行较大更改之前，先通过如 ``git`` 等方式进行保存。并且更改后为了避免样式不刷新，尽量先``hexo clean``清除样式。生成后最好先在本地``hexo s``部署。确认没有千疮百孔再推到线上吧。

 <!-- more --> 


 

一些比较常规的功能性配置 Next 文档里都有的。

虽然是英文文档，虽然可能和你的版本有一点点不同，但它是基本跟着最新版本，是真的好用！！
比起网上到处炒几年前的旧版本冷饭有用多了！！！

另外可以多摸摸 Next 配置文件，里面注释写的蛮详细的，有些东西看注释就知道能开启什么功能，当然，有很多功能需要额外插件支持。

[Next 官方手册](https://theme-next.js.org/docs/)

##  站点概览描述
在项目配置里，第一段填写相关描述，如果是 next 主题，会显示在侧边栏中。
```yml
# Site
title: 我是一个标题
subtitle: ''
description: '我是一段描述'
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

需要生成两个对应主页，在项目根目录下输入相应命令，创建相关页面。
- ``hexo new page categories``
- ``hexo new page tags``

并且打开生成的页面，在元数据中相应添加字段
- ``type: categories``
- ``type: tags``。

想要为博客分类，即在自己的每篇博客描述头中，加入``categories:`` ``tags:``的相关字段，例如这篇：
```md
categories: 
- 博客搭建
```

## hexo文章资源管理


想要简单使用懒得管理，直接放在 **项目目录/source/images** 中。然后通过 **/images/something.jpg** 路径进行调用。

想要有规律的整理的话，hexo也有自带组织方式。资源管理功能打开后，Hexo会在hexo new的时候创建一个和文章同名文件夹，将文章相关资源放进去即可。生成网页时资源和文章在同一路径，因此可以利用相对路径直接调用资源。

[hexo文档相关章节](https://hexo.io/zh-cn/docs/asset-folders)

项目配置中设置：
```yml
post_asset_folder: true
```

>图片推荐使用Win10照片编辑器质量调整进行压缩。
用照片编辑器打开图片，右键--调整大小--自定义尺寸--质量40%。压缩比高的惊人，粗略观感也没有太大区别。例如我1.8KB的图片质量40%可以变成0.09KB。

## 音乐

###  网易云音乐
先去网易云音乐里歌曲页面生成**外链播放器**， 不能生成的可查找特殊方法生成。

在 项目/themes/next/layout/_macro/sidebar.swig 中， 插入复制的代码，比如插入在最下面某一段。
>注意 2020 版本后缀不是 swig，相关文件也不一样

### aplayer全局音乐播放器

虽然网易云音乐足够播放一首歌或一个歌单，但是仅限定于网易云可怜的版权库里。

通过使用APlayer播放器，可以播放任意来源的音乐，例如QQ音乐【我喜欢】的歌单。

>注意是原版APlayer，不是hexo-tag-aplayer

无基础偷懒可以复制以下代码至 **主题目录/layout/_layout.swig** 中，我放在了``</html>``的前一行。

>有基础可以去看看中文文档，安装npm包，并且自定义使用。

可以通过文档查看各个参数的意义，进行播放的设置。
示例代码中是以**QQ音乐**为服务器，以**我自己的歌单**为播放列表。

```html
<body>
<!-- require APlayer -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
<!-- require MetingJS -->
<script src="https://cdn.jsdelivr.net/npm/meting@1.2.0/dist/Meting.min.js"></script>
</body>
<!--如果将本体放在body里面，导致页面加载出现问题，请尝试放到body体后面-->
<div class="aplayer" 
	data-id="3036324986" 
	data-server="tencent" 
	data-type="playlist" 
	data-fixed="true"	
	data-order="list"
	data-volume="0.65"
	data-autoplay="false"   
	date-preload="auto"
	data-theme="#cc543a">
</div>
```

当然，全局播放器会在每一次切换站内页面时中断。
要不中断播放请安装pjax功能，详见下一节。

>我为了百度统计，hexo-douban等功能关闭了pjax。


参考资料：[Macyrate的APlyaer博客](https://hakurei.red/2019/11/25/%E4%B8%BAHexo%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E5%85%A8%E5%B1%80APlayer%E6%92%AD%E6%94%BE%E5%99%A8/)

[Aplayer文档](https://aplayer.js.org/#/zh-Hans/)


## pjax

pjax可以使网页变成单页应用，即在站内切换页面并不会刷新网页，极大提高网页运行速度。

但是！这么好的东西为什么不是默认开启的呢？
pjax会扰乱网站的一些其他功能。如hexo-douban页面，百度统计的访客记录 ......

如果网站没有其他功能需求，建议开Pjax，否则建议不安装。


在Next配置文件中设置pjax为true，并且去对应网站查看安装插件的方法。
如git clone安装：``git clone https://github.com/theme-next/theme-next-pjax themes/next/source/lib/pjax``。

```yml
# Easily enable fast Ajax navigation on your website.
# Dependencies: https://github.com/theme-next/theme-next-pjax
pjax:
  enable: true
```

而且，next里设置pjax为false不起作用？

想要关闭pjax功能直接删掉git clone的pjax库。
并且将 **主题目录/layout/_scripts/pjax.swig** 内容注释掉

## 导入豆瓣评价页面

个人博客肯定想记录点自己生活向的东西，看过的电影，玩过的游戏就是一个很好的记录对象。

之前我是用 **markdown** 写了个文本条目性质的，不说难看吧，但起码豆瓣条目自带一些影片介绍信息。..

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

next 主题的_config.yml 里找到字段 symbols_count_time 按需配置即可：
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

## 搜索引擎收录

以 Next 主题配置 Google 收录为例。

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

### 百度收录

百度收录也是完全同理，next 也内置了验证字段。需要注意的是，百度收录仅支持一级域名收录，所以假如没有自己的域名，GitHub Pages 必须是个人主页，而不是项目主页。

## 站内本地搜索

安装插件：
```s
npm install hexo-generator-searchdb --save
```

编辑**项目**配置文件，新增字段：
```yml
search:
  path: search.json  #支持 json 或者 xml，默认 xml，但我用的有问题，推荐 json
  field: post
  format: html
  limit: 10000
```

编辑**主题**配置文件，修改字段：
```yml
# Local search
local_search:
  enable: true
```

## 评论系统 Valine

>“会有人讨论吗？”——好的，回来填评论系统的坑了。

Next 支持多评论系统同时存在 ... 虽然我不知道哪个憨憨会同时装躲个评论系统，评论数据又不能共享。

Next 内建支持很多评论系统，我选择了在国内支持比较友好的 Valine。

可以跟着 Next 官方教程做，当然不愿意看英文也无所谓，欢迎继续跟着我~

[Next-Valine](https://theme-next.js.org/docs/third-party-services/comments.html)

### [LeanCloud 注册登录](https://leancloud.cn/dashboard/login.html#/signin)

没啥好说的，Valine 使用了 LeanCloud 作为数据段，因此去 LeanCloud 注册登录就行，然后创建应用。

虽然这个注册需要实名制 ... 有点小小小在意。

### 获取 ID 和 Key

进入创建好的应用，选择``设置->应用 Keys``子页，复制``APP ID ``和``App Key``。

### Next 配置
在**主题**配置文件中搜索 comments, 找到字段如下，这里基本不用修改，按需看注释选择配置吧：
```yml
# Multiple Comment System Support
comments:
  # Available values: tabs | buttons
  style: tabs
  # Choose a comment system to be displayed by default.
  # Available values: changyan | disqus | disqusjs | gitalk | livere | valine
  active: valine
  # Setting `true` means remembering the comment system selected by the visitor.
  storage: true
  # Lazyload all comment systems.
  lazyload: false
  # Modify texts or order for any navs, here are some examples.
  nav:
    #disqus:
    #  text: Load Disqus
    #  order: -1
    #gitalk:
    #  order: -2
```

在**主题**配置文件中搜索 valine ，找到相应的字段如下：

```yml
valine:
  enable: false
  appid: #你的 APPID
  appkey: #你的 APPkey
  notify: false # 邮件提醒
  verify: false # 验证码
  placeholder: 欢迎用你的脸滚一滚键盘~  #评论输入框预置文字
  avatar: mm # Gravatar style
  guest_info: nick,mail,link # 自定义评论区头部
  pageSize: 10 # 分页限制大小
  language: # 语言，可用值：en, zh-cn
  visitor: false # Article reading statistic
  comment_count: true # If false, comment count will only be displayed in post page, not in home page
  recordIP: false # 是否记录 IP
  serverURLs: # When the custom domain name is enabled, fill it in here (it will be detected automatically by default, no need to fill in)
  #post_meta_order: 0
```

把 enable 置 true，并且对应粘贴好之前的 AppID 和 AppKey。

重新部署就可以用了，默认为每个页面开启评论系统。

### 页面单独关闭评论

在 markdown 文件的元数据描述符中，添加``comments: false``，即可在当前页面关闭评论。

>推荐导航栏的那几个导航页都关掉，例如分类页、标签页、关于页。

### 管理评论数据

登录 LeanCloud 对应应用的管理页面，选择``存储->结构化数据->Comment``，即可看到评论数据，并且可以偷偷行使你的管理权限。

### 拓展插件 valine-admin

[官网地址](https://github.com/zhaojun1998/Valine-Admin)

是个中文教程，写的很详细，我就不重复了。我目前没有装它的需求

## Hexo忽略文章

不要用Hexo配置文件的 exclude字段来忽略 'source/_posts/' 中的文章，这样没有用。
在要忽略的文件的文件名之前加一个下划线"_"即可忽略。

>使用 'skip_render'可跳过指定文件的渲染，即将文件原封不动发布。

## hightlight代码配色

觉得 next 的几款 highlight 都不太搭白底网站，于是摸了一遍发现``themes\next\source\css\_common\scaffolding\highlight\``路径下的文件存储着几套主题的配色，可以自己改一套喜欢的了。

## 参考资料
[Next Document](https://theme-next.js.org/docs/)
[Next 中文入门文档](http://theme-next.iissnan.com/)