---
title: '阅读：Win the car,dodge the goat'
date: 2020-08-31 08:23:44
categories:
- 考研
tags:
- 英语
---

# Did you solve it? Win the car, dodge the goat
你搞定了吗？赢得汽车，躲避山羊

Earlier today I set you the following problem, about a game show where objects are hidden behind three doors. Behind one door is a car. Behind a second door are the car keys. Behind the third door is a goat. The car, the keys and the goat were placed there randomly, meaning that each item has a 1/3 chance of being behind any particular door.

早些天我给你们留了如下谜题，它是一个东西藏在三扇门后面的游戏秀。其中一扇门之后是一辆车，另一扇门之后是车钥匙，第三扇门之后是一个山羊。车，钥匙，山羊是随机分布在门后的，这意味着每扇门后每个东西出现的机会都是 1/3.


<!---more-->

Twins Timmy and Tammy, the **contestants**, are backstage on the game show. They are told the rules:

参赛者Timmy和Tammy双胞胎，在游戏秀的后台被告知如下规则：

1) Timmy will be taken on stage first. He will be asked to open two of the doors, and then shut them. Timmy will then be led off stage to a holding room on his own.

1）Timmy会先被带上舞台。他将被要求打开两扇门，并且紧接着就关上。Timmy之后则会被带离舞台，到达一个独处的等待室。

2) Tammy will then be taken on stage. She will be asked to open two of the doors.

2）然后就是Tammy被带上舞台，她也要打开两扇门。

If Timmy opens the door with the car, and Tammy opens the door with the keys, then they both get to keep the car. In all other outcomes, they leave with nothing.

如果Timmy打开了车的那扇门，Tammy打开了钥匙的那扇门，那么他俩都可以带走那辆车。而其他任何的结果下，他们都不能带走任何东西。

The twins are given 10 minutes to think up a door-opening strategy before Timmy goes on stage. What strategy gives them the best chance of winning the car?

这对双胞胎在Timmy上台前有十分钟的时间去思考一个开门的策略。什么策略能给他们赢得汽车的最大机会呢？

Just to be clear: The twins do not know what is behind any of the doors before they ask for a door to be opened. When one door is opened, all they can see is what is behind that door. The car, car keys and goat stay behind the same door for the duration of the programme. When Timmy is on stage opening his two doors, Tammy cannot see or hear what is going on. Thus when Tammy is choosing her two doors, she has no idea what was behind the two doors that Timmy opened. Also (as was pointed out by readers of the earlier article), Timmy does not need to open both his doors at the same time. He can open one, and then based on what he sees, decide which one to open second. As can Tammy.

先搞清楚：双胞胎在开门之前不知道门后会有什么。当开了一扇门，他们仅能看到这扇门后面的东西。在游戏过程中，汽车、钥匙、山羊都会在同一扇门后面不变。当Timmy在台上开两扇门的时候，Tammy看不到听不到发生了什么。因此Tammy选开哪两个门的时候，无法利用Timmy开门的信息。并且（这是读者在前期的文章中指出的）Timmy不需要同时开两扇门。他可以先开一个，然后根据他看到的什么再选另一个。Tammy也一样。

If the twins had no strategy, that is, if both of them choose two doors at random, the probability Timmy gets the car is 2/3, and the probability Tammy gets the keys is also 2/3. The probability they get to keep the car is thus 2/3 x 2/3 = 4/9 = 44 per cent.

如果双胞胎没有任何策略，即他们都是随机选门，Timmy有2/3的几率开到车，Tammy有2/3的几率开到钥匙，他们都能赢得汽车的概率是2/3 x 2/3 =4/9 = 44%。

Yet, rather incredibly, there is a strategy that gives them well over 50 per cent chance of keeping the car. What is it?

不过，让人难以置信的是，这有一个策略可以让他们有超过50%的概率赢得汽车。是什么呢？

>盲猜利用了 Timmy开的两扇门其中一扇门后面是汽车 的信息hhh，这样Tammy可以避开这个门，只要预设好Timmy开门的选择。

Solution
解决方案

Let’s call the doors 1, 2 and 3. The **optimal** strategy is for Timmy to open 1 first. If it reveals either the car or the keys, he should open door 2 next. But if door 1 reveals the goat, he should open door 3.

让我们将门命名为1，2，3。最优策略是。Timmy先开1门。如果开的是汽车或者钥匙，则继续开2门。反之如果1门开的是山羊，则他应该接着开3门。

Tammy should then open door 2. If it reveals either the car or the keys, she should open door 1 next. But if door 2 reveals the goat, he should open door 3.

Tammy应该开2门。如果开的是汽车或者是钥匙，则她接着开1门。如果2门是山羊，则开3门。

Here are the six possible arrangements of car, keys and goat behind doors 1, 2 and 3:
以下是车、钥匙、山羊在门1、2、3后的排列组合。

- **CKG**
- **CGK**
- KGC
- **KCG**
- GCK
- **GKC**

I have marked in bold the ones in which Timmy gets the car, and Tammy the keys, which happens in four out of the six equally likely cases. This the chances of them winning the car is 4/6 = 66 per cent.

我把Timmy开到汽车，而Tammy开到钥匙的情况用粗体标了出来，而这有4/6=66%的概率.

If you discovered this solution, please discuss your thought processes below.
如果你想出了这个解法，请在下面讨论一下你的思路。

Today’s puzzle is taken from Surprises in Probability- Seventeen Short Stories, by Dutch mathematician Henk Tijms

今天的谜题是 Surprises in Probability- Seventeen Short Stories中的，作者是 Dutch mathematician Henk Tijms。

I set a puzzle here every two weeks on a Monday. I’m always on the look-out for great puzzles. If you would like to suggest one, email me.

每两周的周一我都会留下一个谜题。我总是在寻找很棒的谜题，如果你想推荐几个，请发邮件给我。


### [阅读原文](https://www.theguardian.com/science/2020/aug/24/did-you-solve-it-win-the-car-dodge-the-goat)

# 词汇
- contestants 参赛者
- optimal 最佳