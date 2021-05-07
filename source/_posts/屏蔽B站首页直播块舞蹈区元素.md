---
title: 屏蔽B站PC首页直播块舞蹈区元素
date: 2021-01-28 20:57:55
categories:
- 工具
tags:
- B站
---

一直以来喜欢没事挂在B站首页，然后看看有没有些有趣的人直播好玩的东西什么的。然而，B站首推的主播大多都是舞见唱见，视频陪聊什么的，流量至上没有错，但是让我目标信息获取率极低就很烦。

因此找了找根据分区删除元素的方式：

``www.bilibili.com##.live-card:has-text(舞见)``

## 工具

- Chrome系浏览器，可以用Chrome插件

- 浏览器安装一个广告拦截插件，如Ads Killer Plus


<!---more--->

## 添加屏蔽规则
通常广告拦截插件都支持自定义规则，而显然舞见直播什么的不会被内置定义为广告，虽然实际上差不多。
因此我们要自己写选择舞见的过滤器。
以Ads Killer Plus为例：

首页直播块结构如下：.live-card > a > .up > .txt > . tag

tag值即是主播分区名，如视频唱见、舞见...

我们想要通过 tag=舞见 去删除.live-card元素，正常的类选择器好像只能根据父元素选择子元素，而不能反过来。

这时候就需要用到插件的扩展语法功能，例如这款插件有如下两个选择语法：

### subject:has(arg)
如果subject自身及其子元素有arg元素，则选定subject元素

使用方法即正常选择器选出一个subject对象，然后后面加上``:has(arg)``，arg 也是一个选择器对象。

- Description: Select element subject if and only if evaluating arg in the context of subject returns one or more elements.
- Chainable: Yes.
- subject: Can be a plain CSS selector, or a procedural cosmetic filter.
- arg: A valid plain CSS selector or procedural cosmetic filter, which is evaluated in the context of the subject element.

### subject:has-text(needle)
如果subject自身及其子元素有needle文本值，则选定subject元素。
needle可用正则表达式。

- Description: Select element subject if the text needle is found inside the element subject or its children.
- Chainable: Yes.
- subject: Can be a plain CSS selector, or a procedural cosmetic filter.
- needle: The literal text which must be found, or a literal regular expression. If using a literal regular expression, you can optionally use the i and/or m flags (version 1.15).


>注意冒号后面不能有空格

我们只需判断分区文本值，因此用has-text即可，最终在自定义规则列表中添加如下规则应用：

>www.bilibili.com##.live-card:has-text(/电台|陪伴学习|萌宠|唱见|舞见|视频|虚拟主播/)

## 后话

上述规则会选定整个live-card板块，因此删除后B站直播块可能会有点排版不整齐，如果仅删除live-card下的a元素，则删除后会在原位置保留一块空白，保持元素排版整齐。

另外这种方式应该适用于所有通过子类屏蔽父类的想法。
