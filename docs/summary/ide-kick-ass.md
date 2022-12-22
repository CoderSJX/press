---
title: 🍒 IDE Kick Ass
date: 2022-03-21
categories:
 - 编程之路
tags:
 - IDE
 - 工具使用技巧
---
## WebStorm

### 代码模版生成

不仅是WebStorm，包括IDEA、Pythoncharm等，只要是JetBrains家的软件都有这个功能，可以自定义代码片段。

举个例子：

在IDEA中，可以输入sout，按回车或者Tab键，生成System.out.println();

![sout](https://www.nullpointer.site/images/sout.png)

是不是很好奇这怎么实现的。IDEA好强！

其实是这样实现的。

Ctrl+Alt+s打开设置。

![live-templates](https://www.nullpointer.site/images/live-templates.png)

几个参数解释一下：

output是一个组名，这个组下面都是输出有关的代码模版。

sout就是这个组中一个代码模版，它的内容就是`System.out.println($END$);`

$END$是工具内置的变量，表示代码输入后，光标最后落的位置。此时光标落在了括号里。

![template-end](https://www.nullpointer.site/images/sout-end.png)

Applicable in XXX 后面有个change，可以指定这个模版可以在哪种文件里使用，比方说：上面指定sout在Java文件中才能使用。

> :smile: 如果你是初次知道有这么多代码模版，建议你立马去试试都有哪些模版。你会感觉，原来我平时写代码，白敲了这么多无用代码。



你还可以在模版代码里定义变量，并设置它的表达式，比方说你想输出当前时间：

![template-var](https://www.nullpointer.site/images/live-templates-var.png)

你得先写好$a$（定义好变量），右边的Edit variables才能点击。

另外，还有很多很好玩的玩法，去看下官网指南：[Live Templates 官方指南](https://www.jetbrains.com/help/webstorm/template-variables.html#ws_example_live_template_variables)

