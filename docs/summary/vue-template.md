---
title: 🥳 Vue模版编译
date: 2022-03-29
categories:
 - 编程之路
tags:
 - 编程经验
 - 深入理解
 - Vue
 - JavaScript
 - 源码解析
---

## 模版编译概览

Vue.js把模版通过模版编译，生成**渲染函数**，通过执行渲染函数，生成虚拟DOM，拿到虚拟DOM的vnode，然后渲染成真正的DOM。

这就是为什么可以在Vue的模版里插入很多变量，是模版编译赋予了模版能够使用变量的能力，不然在HTML中是不能使用变量的。

::: tip 提示

模版编译的目的就是生成渲染函数。

:::

## 编译过程

过程：

1. 将模版解析成AST(抽象语法树)
2. 用AST生成渲染函数

但是因为静态节点不需要总是重新渲染，因此，还存在一步优化，就是标记哪些节点为静态节点，后面不会重新渲染它。

所以过程分为三步：

1. 模版解析为AST
2. 遍历AST，标记静态节点
3. 用AST生成渲染函数

上述过程抽象出三个模块：

	1. 解析器
	1. 优化器
	1. 代码生成器



### 解析器

目标：将模版解析成AST

包含：过滤器解析器、文本解析器和HTML解析器，通过一条主线把这些解析器组装到一起



文本解析器：主要是解析带变量的文本，例如{{name}}

HTML解析器：每当解析到HTML的标签的开始、结束、文本或者注释时，就会触发钩子函数，把相关信息通过参数传递出来。

主线：监听HTML解析器，每当触发钩子函数时，就生成一个对应的AST节点。生成AST节点前，会根据不同的类型生成不同的AST。（类似于vnode）



### 优化器

目标：遍历所有的AST，标记出所有的静态节点

每次重新渲染时，不需要为标记的及诶点创建新的虚拟节点，而是直接克隆已经存在的虚拟节点。



### 代码生成器

代码生成器将AST转换会渲染函数中的内容，这个内容被称为“代码字符串”。

例如下面with开头的就是上面p标签的代码字符串。

```js
 <p title="Berwin" @click="c">1</p>

with (this) {
                return _c
                (
                    'p',
                    {
                        attrs: {'title': 'Berwin'},
                        on: {"click": c},
                    },
                    [_v("1")]
                )
            }
```

代码字符串中有很多函数调用，通过这些函数调用，可以生成vnode。

## 解析器
