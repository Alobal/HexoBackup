---
title: Github+Hexo 搭建博客
date: 2020-07-15 01:01:11
categories: 
- 工具
tags:
- 博客
---

# github Pages + Hexo 博客搭建

**前置知识：git 使用方法，github 建库方法，会在命令行里敲东西**

##  安装环境
### 安装 node.JS
[官网下载安装程序，默认安装即可](https://nodejs.org/en/download/)

命令行运行``node -v`` ``npm -v``检查安装效果

### 安装 hexo
注意以下命令推荐使用字符支持良好的命令行，最好给管理员权限。我使用的是 git bash。

>可以使用 cmd，但我遇到了中文问题。
>
>powershell 运行会提示 “在此系统上禁止运行脚本”， 管理员权限下输入 `` set-executionpolicy remotesigned`` 更改安全策略，允许运行脚本。

运行``npm install -g hexo-cli``进行安装

再运行``hexo -v``检查安装效果，有版本信息即安装成功

##  配置项目

###初始化
安装成功后自己创建一个项目文件夹，命令行切换到文件夹路径进行以下初始化：

运行``hexo init``初始化

### 本地测试

运行以下命令部署默认网页进行测试：
```yml
hexo new test_my_site #创建新 test_my_site 的 markdown 文件

hexo g                # 从 md 文件生成 html 文件

hexo s                # 部署本地服务器
```
观察到命令行在持续运行时，则可打开浏览器输入本地服务器地址（默认是``localhost:4000``）访问试试看。

### 部署到网络
在文件夹根路径下面，找到_config.yml，打开修改

最后一段为：
```yml
deploy:
type: git
repo: 仓库的完整路径，推荐使用 ssh 路径，这样可以有 ssh 免密登录。例如我的 git@github.com:Alobal/HexoBackup.git
branch: master
```

URL 小段为：
```yml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: 访问网址，例如 https://alobal.github.io/Blog/
root: 仓库名，例如/Blog
```

保存关闭该文件

安装 hexo 的 git 部署插件```npm install hexo-deployer-git --save```

运行以下命令进行发布到网络
```yml
hexo clean
hexo g
hexo d
```
>在 hexo d 部署到 GitHub 时可能要求 GitHub 账号密码。

出现``Branch 'master' set up to track remote branch 'master' from 'https:..``大概就恭喜你成功了。

此时可以在 github 仓库看到 hexo 提交的文件。

以及能通过访问网址查看你刚才发布的默认博客。

## 选一个你喜欢的主题

### 下载主题

[hexo 主题库](https://hexo.io/themes/)

挑选一个合适的主题，比如很常见的 Next，复制 git 地址，在本地博客项目根目录下，命令行输入进行 git clone

例如``git clone https://github.com/next-theme/hexo-theme-next themes/next``

>如果使用 next 主题请注意， next 主题在 2020 之前是 theme-next 项目，2020 版本是 next-theme 项目，配置字段有点不同，根据需要选择。19 版本网上教程比较健全了。

### 配置主题

打开 _config.yml，修改 theme 字段：
```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: 主题名，例如 next
```

其中主题也有自己的配置文件，项目名/themes/主题名/_config.yml，可以根据需要进行修改。

比如 next 主题配置文件中，可以在四种风格中选一种，选一个取消注释就好了。想预览效果可以去找 next 官方文档。

```yml
# Schemes
#scheme: Muse
#scheme: Mist
scheme: Pisces
#scheme: Gemini
```

输入``hexo g;hexo d`` 重新生成网页并发布出去，可以自己偷偷欣赏欣赏。

>如果没看到生效，可能是因为浏览器缓存，关掉浏览器重新打开，或者 Ctrl+F5 强制刷新。

## hello，blog！
让我们试着发布第一篇博客，这里我把搭建博客全过程写下来作为第一篇发布。

项目路径下，命令行输入``hexo n "博客名"`` , 可以在 项目名/source/_posts/ 下面找到新建的 markdown 文件。

打开文件可以发现有预置的文件头，暂时不用管，后续要添加**分类**和**标签**功能的时候可以写一写。

在文件后之后，即``------``下面写入你的 markdown 格式内容即可。

关于 markdown 怎么书写，可以看我的 [markdown 简洁手册](https://alobal.github.io/Blog/2020/07/17/MarkDown%E7%AE%80%E6%B4%81%E6%89%8B%E5%86%8C/)。

## 参考
[知乎经典贴](https://zhuanlan.zhihu.com/p/26625249)

##  错误汇总
### can not find module xxx
- 命令行``npm install`` 安装所有依赖包完事。

### 没有启用代码高亮

根目录 config 里，修改配置如下：

```yml
highlight:
  enable: true
  line_number: true
  auto_detect: true
  tab_replace: ''
  wrap: true
  hljs: true
```
next 主题配置里，选择自己要的高亮样式：

```yml
codeblock:
  # Code Highlight theme
  # All available themes: https://theme-next.js.org/highlight/
  theme:
    light:  tomorrow-night-blue
    dark:  tomorrow-night-blue
  prism:
    light: tomorrow-night-blue
    dark: tomorrow-night-blue
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Available values: default | flat | mac
    style:
```
