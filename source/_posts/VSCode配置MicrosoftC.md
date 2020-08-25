---
title: VSCode 配置 Microsoft C++
date: 2020-08-25 08:46:05
categories:
- 工具
tags:
- C++
- VSCode
---

本文为翻译 Microsoft 的 [英文原文](https://code.visualstudio.com/docs/cpp/config-msvc)

因为自己刚学 C++的时候，直接是装的 Visual Studio 2017，一套 20G 的 IDE 解决所有事情，但是用着用着发现了 Visual Studio Code 这个极致现代美感的编辑器！再看 VS 那傻大粗的体量实在不想用。

然而 VSCode 只是个编辑器，要用来写 C++还需要配置相应的编译器环境。网上大部分配置教程都是从下一个 MinGW 出发 ... 然而我本身已经装过了 VS，Microsoft C++环境已经有了，想着能不能直接给 VSCode 用。

但是找了半天没发现什么有用的教程，最后在微软官方文档中找到了英文教程，虽然也不是很全面，但入门使用是够了的。

<!---more--->

## 预备环境

### 安装 [Visual Studio Code](https://code.visualstudio.com/download)

希望代码业非代码业都能试试这个编辑器（笑

无论敲 markdown 还是代码都很舒服。

### 安装 [VSCode 的 C/C++ 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

如果已经安装好了 VSCode，可以直接在如下的扩展视图 (Ctrl+Shift+X) 里搜索'C++'然后安装作者是 Microsoft 的即可。

![扩展视图](https://code.visualstudio.com/assets/docs/cpp/cpp/cpp-extension.png)

### 安装 Microsoft Visual C++ 编译工具集

本身之前在 VS 写 C++的人已经安装好了，不用管。

有 VS 的人可以直接在 VS Installer 中勾选 C++ 工具集进行安装即可。

没有 VS 的人可以直接单独下载 Microsoft C++ 工具集，去 [下载页面](https://visualstudio.microsoft.com/downloads#other) 滚动到最底部，展开 All downloads 直到找到 **Build Tools for Visual Studio**，进行下载。

![下载 Build Tools](https://code.visualstudio.com/assets/docs/cpp/msvc/build-tools-for-vs.png)

点击这个会运行 Visual Studio Installer， 然后会展示 Visual Studio 可用的构建工具集，选中 C++的安装即可。

![VS Installer 安装 C+=](https://code.visualstudio.com/assets/docs/cpp/msvc/cpp-build-tools.png)

### 检查安装效果

为了从命令行或者 VSCode 中使用 MSVC，你必须以 **VS 开发人员提示符 (Developer Command Prompt for Visual Studio)** 为基础运行。常规的 Shell，例如 PowerShell，Bash，或者 Windows 命令行都不具有必须的路径环境变量集。

为了打开 VS 开发人员提示符，在 Windows 开始菜单中搜索“开发人员”（安装的英文版请搜索"developer"），即可在搜索结果中打开。

![搜索“开发人员”](https://code.visualstudio.com/assets/docs/cpp/msvc/developer-cmd-prompt-menu.png)

你可以测试你是不是真的有了 C++ 编译器，``cl.exe``，在打开的提示符中输入 'cl'，如果输出版权和版本信息，以及基础用法描述，则恭喜你安装正确。

![安装正确](https://code.visualstudio.com/assets/docs/cpp/msvc/check-cl-exe.png)

在开始使用之前，如果提示符的初始路径是在构建工具集所在的位置，请将提示符中的当前目录切换到你想要的项目目录，毕竟你不会想要把程序写在那个疙瘩角落。

## 创建 Hello World
请跟着下面的代码做，在提示符中，创造一个新文件夹 “projects”，用于存储所有 VSCode 项目，然后创建一个子文件夹名叫“helloworld”，并且用 VSCode 打开这个子文件夹。

```shell
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

>注意这里个人推荐你使用纯英文路径。你永远不知道什么时候会挖一天一个月的中文路径 BUG。

``code .``命令会用 VSCode 打开当前目录，并且构建成“工作区（workspace）”，当你继续跟着教程走，最终会在这个工作区中创建一个``.vscode``文件夹，里面有文件如下：
- tasks.json （编译指令）
- launch.json （调试器设置）
- c_cpp_properties.json （编译器路径及 智能感知 IntelliSense 设置）

### 添加一个源代码文件

在 VSCode 资源管理器 (``Ctrl+Shift+E``) 中，点击**新建文件**按钮，并且命名为``helloworld.cpp``。

![new file](https://code.visualstudio.com/assets/docs/cpp/msvc/new-file-button.png)

打开新建的文件，粘贴如下代码：

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
    vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

    for (const string& word : msg)
    {
        cout << word << " ";
    }
    cout << endl;
}
```

然后按下``Ctrl+S``保存文件。注意你可以看到刚添加的文件会在 VSCode 的资源管理器中出现。

![出现文件](https://code.visualstudio.com/assets/docs/cpp/msvc/file-explorer.png)

你也可以在上方菜单栏的**文件**菜单下，打开**自动保存**，以自动保存文件的修改。

最左边的活动栏可以让你打开不同的视图，例如**搜索**，**源代码管理**，和**运行**。待会你会用到**运行**，其他的你可以在 VSCode 的 [用户交互文档](https://code.visualstudio.com/docs/getstarted/userinterface) 中查阅相关信息。

>注意当你保存或打开一个 C++文件时，你可能可以看到一个来自C/C++扩展的关于测试版本的通知，这可以让你体验扩展的新特性。你可以点``X``无视它。

