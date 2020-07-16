---
title: Github+Hexo 搭建博客
date: 2020-07-15 01:01:11
categories: 博客搭建
tags:
---

# github Pages + Hexo 博客搭建

**前置知识：git使用方法，github建库方法，会在命令行里敲东西**

## 1. 安装环境
### 1.1 node.JS
[官网下载安装程序，默认安装即可](https://nodejs.org/en/download/)

命令行运行``node -v`` ``npm -v``检查安装效果

### 1.2 安装hexo
注意以下命令推荐使用字符支持良好的命令行，最好给管理员权限。我使用的是git bash。

>可以使用cmd，但我遇到了中文问题。
>
>powershell运行会提示 “在此系统上禁止运行脚本”， 也有相关方法解决， 但麻烦。

运行``npm install -g hexo-cli``进行安装

再运行``hexo -v``检查安装效果，有版本信息即安装成功

### 1.3 配置项目

安装成功后自己创建一个项目文件夹，命令行切换到文件夹路径进行以下初始化：

运行``hexo init``初始化

运行以下命令部署默认网页进行测试：
```python
hexo new test_my_site

hexo g

hexo s
```

在文件夹根路径下面，找到_config.yml，打开修改

最后一段为：
```python
deploy:
type: git
repo: 仓库的完整路径，例如我的https://github.com/Alobal/Blog.git
branch: master
```

URL小段为：
```python
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: 访问网址，例如https://alobal.github.io/Blog/
root: 仓库名，例如/Blog
```

保存关闭该文件


安装hexo的git部署插件```npm install hexo-deployer-git --save```


### 1.4 测试发布效果
运行以下命令进行测试
```python
hexo clean
hexo g
hexo d
```

出现``Branch 'master' set up to track remote branch 'master' from 'https:``大概就成功了。

此时可以在github仓库看到hexo提交的文件
以及能通过访问网址查看你发布的默认博客


### 1.5 选一个你喜欢的主题
[hexo主题库](https://hexo.io/themes/)

挑选一个合适的主题，比如很常见的Next，复制git地址，在本地项目文件夹下，命令行输入进行git clone

例如``git clone https://github.com/next-theme/hexo-theme-next themes/next``

>注意next主题在2020之前是theme-next项目，2020版本是next-theme项目，配置字段有点不同，根据需要选择。19版本网上教程比较健全了。

打开_config.yml，修改theme字段：
```python
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: 主题名，例如next
```

其中主题也有自己的配置文件，项目名/themes/主题名/_config.yml，可以根据需要进行修改。
比如next主题配置文件中，可以在四种风格中选一种，选一个取消注释就好了。
```python
# Schemes
scheme: Muse
#scheme: Mist
#scheme: Pisces
#scheme: Gemini
```

重新``hexo g`` ``hexo d`` 发布出去，让我们来看看效果。
>如果没看到生效，可能是因为浏览器缓存，关掉浏览器重新打开，或者Ctrl+F5强制刷新。


## 2.hello，blog！
让我们试着发布第一篇博客，这里我把搭建博客全过程写下来作为第一篇发布。

项目路径下，命令行输入``hexo n "博客名"`` ,可以在 项目名/source/_posts/ 下面找到新建的markdown文件,文件头不动的情况下，写入你的markdown格式内容即可。

## 3. 参考
[知乎经典贴](https://zhuanlan.zhihu.com/p/26625249)

## 4. 错误汇总
4.1 can not find module xxx
- 命令行``npm install`` 安装所有依赖包完事。

4.2 代码高亮无效
- 根目录config里，修改配置如下：
```python
highlight:
  enable: true
  line_number: true
  auto_detect: true
  tab_replace: ''
  wrap: true
  hljs: true
```
- next主题配置里，选择自己要的高亮样式：
```python
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
