---
title: VMware-虚拟机繁忙卡死-vmware-vmx进程杀不掉-拒绝访问
categories:
- 工具
date: 2020-02-17 02:17:00
---
##  问题：
#####     前几天win10系统更新到了1909，打开VMware 15.0.2时系统通知该版本可能无法运行= =没管它开了虚拟机，结果就是虚拟机黑屏卡死，vm工作台无法结束，后台vmware-vmx进程拒绝访问。

##  解决步骤：
1. 打开windows【服务】面板

    1.1 可以WIN+R 输入 services.msc 打开

    1.2 也可以在win10的搜索框中直接搜索 “服务”

2. 按【v】键，快速找到vmware相关服务，全部 右键-属性-禁用，且停止运行。
3. 全部停止运行后，任务管理器已经可以关掉vm的主进程，但其实后台还有一个vmware-vmx没关掉，也关不掉。
4. 此时【重启】电脑，注意是重启，不是关机再开机，可以发现vmware-vmx已经没有了
5. 但和其他博客说的不同，此时恢复vmware相关服务，再开虚拟机一样是卡死，同样的问题。
6. 因此打开vmware的安装程序，准备修复，先别点下修复= =（文件夹里找，或者控制面板-卸载或更改程序里找）
7. 我修复运行的时候，提示无法写入文件glib-2.0.dll，vmPerfmon.dll，所以修复之前可以手动先删除这两个文件看看= =在vmware安装目录下面，假如无法删除可以把后缀名改为.txt，这样就不会阻碍vmware的修复程序。
8. 修复程序运行完成，打开vmware，提示你更新新版本，或者你自己选项里检查更新一下= =，换到新版本。当然你直接卸载下一个应该也是一样。
9. 我升级到15.5.1，重启之后可以正常运行，并且之前的虚拟机信息没有丢失。

##  总结：
#####     应该是win 1909 和 vmware的15.0的版本冲突，看其他人说1903也有问题。总之要听信windows为数不多的劝告，换新版本吧= =
