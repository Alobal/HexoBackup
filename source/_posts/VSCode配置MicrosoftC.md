---
title: VSCode 配置 Microsoft C++
date: 2020-08-25 08:46:05
categories:
- 工具
tags:
- C++
- VSCode
---
## 前言

本文是我自己翻译 Microsoft 的 [英文原文](https://code.visualstudio.com/docs/cpp/config-msvc)

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

>注意当你保存或打开一个 C++文件时，你可能可以看到一个来自 C/C++扩展的关于测试版本的通知，这可以让你体验扩展的新特性。你可以点``X``无视它。

### 探索智能感知（IntelliSense）
在你新建的``helloworld.cpp``文件中，鼠标悬浮在``vector``或``string``上可以看到相应的类型信息。在``msg``的声明语句之后，敲入``msg.``以尝试调用一个成员函数。这是你会立刻看到一个语法补全列表，展示了所有的成员函数，并且还能看到一个有关``msg``类型信息的窗口。

![msg](https://code.visualstudio.com/assets/docs/cpp/wsl/msg-intellisense.png)

你可以按下``Tab``直接插入选中的那一项。之后，当你输入小括号时，你可以看到有关函数参数的相关信息。

### 编译 helloworld.cpp

接下来，你将创建一个``tasks.json``文件，以告诉 VSCode 怎么去编译这个程序。这个编译配置（task）会唤醒 Microsoft C++ 编译器，编译这个源代码生成可执行文件。

在主菜单中，点击 **终端 > 配置默认生成任务**，这会展示一系列预定义好的 C++ 编译器编译配置，选择``C/C++ cl.exe build active file``，这会在当前目录中生成一个``.vscode``子文件夹，并且在里面创建``tasks.json``文件。

你新建的``tasks.json``文件应该长得和下面差不多：
```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "shell",
			"label": "C/C++: cl.exe build active file",
			"command": "cl.exe",
			"args": [
				"/Zi",
				"/EHsc",
				"/Fe:",
				"${fileDirname}\\${fileBasenameNoExtension}.exe",
				"${file}"
			],
			"options": {
				"cwd": "${workspaceFolder}"
			},
			"problemMatcher": [
				"$msCompile"
			],
			"group": {
                "kind": "build",
                "isDefault": true
            }
		}
	]
}
```

- **command** 指定了想要运行的程序是"cl.exe"
- **args** 指定了 cl.exe 的一系列命令行参数，这些参数必须按照编译器期望的顺序进行指定。
- **/Fe:** 指定生成可执行文件的输出目录
这个配置告诉 C++ 编译器去找到``${file}``文件，编译它，并且在当前目录``${fileDirname}``下生成和源文件同名但扩展名是``.exe``的可执行文件``${fileBasenameNoExtension}.exe``，在我们的例子中会得到``helloworld.exe``。

>你可以在 [变量参考](https://code.visualstudio.com/docs/editor/variables-reference) 中了解更多关于``tasks.json``的信息

- label 的值是你在配置列表里看到的关于配置的描述，你可以随便乱改。
- problemMatcher 的值指定了用于查找错误或警告的输出解析器。对于 cl.exe ，``$msCompile``是最好的选择。
- isDefault: true 是指定了当你按下``Ctrl+Shift+B``时，会运行的配置。仅仅是图个方便而已。设为 false 了一样可以从 **终端 > 运行生成任务**中运行。

### 编译运行

1. 返回``helloworld.cpp``页面。因为你想要编译``helloworld.cpp``，而你的配置会编译当前文件（the active file）。

2. 按下``Ctrl+Shift+B``或者从 **终端 > 运行生成任务**中运行编译任务。

3. 编译开始后，你可以看到 VSCode 的集成终端面板会出现在源代码编辑器的下方。在编译完成后，可以看到编译成功或者失败。假如成功，输出应该长这样（中文环境应该是如图的对应翻译）

    ![successful output](https://code.visualstudio.com/assets/docs/cpp/msvc/build-output-in-terminal.png)

4. 点击终端面板的``+``按钮创建一个新的终端。在里面输入运行``ls``，你可以看到``helloworld.exe``文件和一些 C++ 中间文件已经生成了，并且还有 Debug 相关文件（``helloworld.obj``,``helloworld.pbd``）

![ls](https://code.visualstudio.com/assets/docs/cpp/msvc/helloworld-in-terminal.png)

5. 你可以命令行输入``./helloworld.exe``运行文件。

### 修改 tasks.json
你可以用``${workspaceFolder}\\*.cpp``代替``${file}``，以同时编译多个 C++ 文件。这回编译所有的当前目录下的 ``.cpp``文件。当然你也可以通过修改``${fileDirname}\\${fileBasenameNoExtension}.exe``，以替换输出文件的名字。

## 调试 helloworld.cpp

接下来你会创建一个``launch.json``文件，以配置当你按下``F5``进行调试时，VSCode 怎么去运行 Microsoft C++ 调试器。在主菜单中，点击``运行 >  添加配置``，选择 **C++ （Windows）**。

接下来可以看到一个预定义的调试配置列表，选择 ``cl.exe build and debug active file``。

![debug](https://code.visualstudio.com/assets/docs/cpp/msvc/build-and-debug-active-file.png)

这时 VSCode 会创建一个``launch.json``的文件如下：
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "cl.exe build and debug active file",
      "type": "cppvsdbg",
      "request": "launch",
      "program": "${fileDirname}\\${fileBasenameNoExtension}.exe",
      "args": [],
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}",
      "environment": [],
      "externalConsole": false,
      "preLaunchTask": "cl.exe build active file"
    }
  ]
}
```

- program 指定了想要调试的程序，即当前目录下，和当前文件同基础名的``.exe``文件。
- stopAtEntry 默认为 false，调试器不会事先添加任何断点。我们修改为``true``，则会在进入``main``函数时暂停并等待我们的调试。

### 开始调试

1. 返回``helloworld.cpp``，这样它就是“当前文件”了。

2. 按``F5``或者点击``运行 > 启动调试``。此时会有一些 UI 界面的变化：
- 集成终端会在底部出现，在 ``调试输出``标签下，你可以看到体现调试器正在运行的输出。
- 在``main``函数的第一行编辑器会产生高亮。这是之前的修改导致的 C++ 扩展预先帮我们打好的断点。

    ![main](https://code.visualstudio.com/assets/docs/cpp/msvc/stopAtEntry.png)

- 左边侧栏会出现**运行**视图

- 编辑器上方会出现调试控制面板。你可以随便挪动。

### 逐步执行代码
现在我们已经做好了逐步执行代码的准备。

1. 在调试控制面板点击**单步跳过（F10）**按钮，直到语句``for (const string& word : msg)``高亮。

    ![Step Over](https://code.visualstudio.com/assets/docs/cpp/cpp/step-over-button.png)

    **单步跳过**命令会跳过在``msg``变量创建并初始化时，所有``vector``和``string``类的内部函数调用。注意到左边**变量**窗口，此时看起来可能有点不对劲。虽然调试器已经能看到循环控制的变量名了，但此时当前语句还没有执行，因此读取不到变量值。另一方面，因为``msg``的语句执行完了，它的值是可以看到的。

2. 再按一下**单步跳过**以进入下一条语句（跳过了所有内部代码）。此时**变量*窗口可以看到循环变量的信息了。

3. 再按一下**单步跳过**以执行``cout``语句。**注意**如果是 2019.3 的扩展版本，直到循环完成前是看不到任何输出的。

4. 你可以一直按下去直到所有输出结束。当然如果你想要更细致一点，试着点击**单步调试（F11）**, 以逐步执行 C++ 标准库中的内部代码。

    ![incode](https://code.visualstudio.com/assets/docs/cpp/msvc/msvc-system-header-stepping.png)

    如果想要返回你自己的代码。可以一直按**单步跳过**直到返回。另外也可以切换到``helloworld.cpp``中在某个语句处按``F9``打一个断点，此时在左边会出现一个红点表明这一行已经打上了断点：

    ![breakpoint](https://code.visualstudio.com/assets/docs/cpp/cpp/breakpoint-in-main.png)

    这时按下``F5``会自动执行到断点处再次暂停。再次在断点位置按``F9``也可以取消掉断点。

### 设置监视
调试时，有些时候我们想要盯着程序中某些变量进行观察。可以通过**监视变量**功能实现这一想法。

1. 在调试时，左侧的**监视**窗口，点击``+``按钮，即可创建一个新的监视对象，例如输入循环控制变量的名字``word``,此时监视窗口会一直显示这个变量的值。请在逐步执行循环时观察监视窗口的变化。

    ![watch](https://code.visualstudio.com/assets/docs/cpp/cpp/watch-window.png)

2. 同样的，假如修改程序，在循环语句前假如``int i=0;``，在循环内部假如``++i;``。此时我们可以和刚才一样添加对``i``的监视。

3. 为了在暂停时快速查看任何变量的值，我们也可以把鼠标指针悬浮在变量上，即显示变量值。

    ![hover](https://code.visualstudio.com/assets/docs/cpp/cpp/mouse-hover.png)

## C/C++ 配置

如果你想要更多关于 C/C++ 扩展的配置，你可以创建一个``c_cpp_properties.json``文件，在其中你可以修改编译器路径、编译C++标准等等。

通过（Ctrl+Shift+P）打开命令面板，输入``C/C++: 编辑配置(UI)（ C/C++: Edit configurations(UI) ）``，你可以查看 C/C++ 的UI配置界面。

![C++ UI](https://code.visualstudio.com/assets/docs/cpp/cpp/command-palette.png)

这会打开 **C/C++ 配置页面** ，当你在这里进行修改，VSCode会把变动写进``.vscode``文件夹下的``c_cpp_properties.json``文件中。

![C/C++](https://code.visualstudio.com/assets/docs/cpp/msvc/configurations-ui.png)

如果你直接打开json文件，可以看到长得如下：

```json
{
  "configurations": [
    {
      "name": "Win32",
      "includePath": ["${workspaceFolder}/**"],
      "defines": ["_DEBUG", "UNICODE", "_UNICODE"],
      "windowsSdkVersion": "10.0.18362.0",
      "compilerPath": "C:/Program Files (x86)/Microsoft Visual Studio/2019/BuildTools/VC/Tools/MSVC/14.24.28314/bin/Hostx64/x64/cl.exe",
      "cStandard": "c11",
      "cppStandard": "c++17",
      "intelliSenseMode": "msvc-x64"
    }
  ],
  "version": 4
}
```

如果你的程序包含 不在当前目录或者不在标准库路径的 头文件，则你只需要在这里添加**IncludePath**即可。

### 编译器路径

``compilerPath``编译器路径配置是十分重要的一项配置。扩展会利用它推断 C++ 标准库头文件的路径。只有当扩展知道怎么去找这些文件了，它才能提供**智能补全**和**找到定义**的相关功能。

C/C++ 扩展会尝试通过它在你系统上找到的默认编译器位置，自动填充``compilePath``。

一般搜索路径和顺序如下：
- 首先检查 Microsoft Visual C++ compilerOpe
- 然后检查 Windows Subsystem for Linux (WSL) 的g++
- 之后是 Mingw-w64的 g++

如果你安装了 g++ 或者 WSL，你可能需要更改``compilerPath``以匹配项目偏好的编译器。对于 Microsoft C++，编译器路径一般和下面差不多，但是根据特定安装版本不同而有差异：

```
C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16.27023/bin/Hostx64/x64/cl.exe
```

>注意，你可能不是安装在默认C盘位置。找到你的VS安装位置，然后找里面的VC子目录即可。

## 复用 C++ 配置

VSCode 现在已经配置好使用 Microsoft C++ 编译器了。这个配置目前仅对当前工作区生效。为了复用配置，请把``.vscode``中的JSON文件复制到新的项目文件夹中，并且按需修改相关源文件和可执行文件的名字。

## 错误排除

### 无法识别"cl.exe"
如果你看到：

- cl : 无法将“cl”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
- The term 'cl.exe' is not recognized as the name of a cmdlet, function, script file, or operable program.

这通常意味着你不是通过 **VS开发人员命令提示符（Developer Command Prompt for Visual Studio ）**打开的VSCode，因此VSCode不知道``cl.exe``编译器的路径。

你总是可以通过在VSCode终端中输入``cl``检查有没有在开发人员提示符中打开VSCode。

> ...这个官方解决方案和没说一样，可以自行配置全局Path系统变量。

## 更进一步

- 探索[VSCode 用户指南](https://code.visualstudio.com/docs/editor/codebasics)

- 复习[C++ 扩展概述](https://code.visualstudio.com/docs/languages/cpp)

- 创建一个新的工作区，复制``.vscode``下的JSON文件过去，并且对设置进行适当的调整，开始你的代码生活！