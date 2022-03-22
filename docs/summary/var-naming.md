---
title: 🍄变量命名规范
date: 2022-02-23
categories:
 - 编程之路
tags:
 - 编程经验
 - 编程技巧
---

## 开篇点题

很多同学写代码，或因技术菜、或因项目急，或因英语不好，种种原因，导致命名变量时大脑一片空白，好一点的会用些简单的单词，实在想不出来就用拼音代替。

真的，绝了。

这篇文章，就是帮助同学更好更快地命名变量。主要讲下优秀的变量命名是怎样的，以及列出命名变量时常用的单词词汇。

> ⛰️ We are poets and artists. Yeah, We write poems not shit.
> 我们是诗人，我们是艺术家。对，我们是在作诗。
>                                                                                                          — idea小时

## 最佳的变量名

> 通常，对变量的描述就是最佳的变量名。
>                                                                                  —《代码大全（第二版）》


📘 《代码大全》这本书不要看名字很土，感觉就像小学不知道名字的出版社的《作文大全》，实际上是翻译的问题，英文原版名字叫《Code Complete》，意为“代码完成“，是微软公司出的一本书，很有权威性。

> 我的观点和本书作者不谋而合。
>                                                                                   — idea小时

四舍五入 → 我也是个“大佬”，嘿嘿。😘

## 用对变量的描述来命名变量

集合 ：

可以用`XXXList`、`XXXMap`、`XXXSet`来表示，例如`menuList`、`fieldList`、`referenceMap`

也可以用集合表示的事物的复数形式，`XXXs`，`XXXes`，例如：`rows`、`cols`、`users`、`details`、`items`

特殊状态：

开发中经常遇到需要处理的数据，比方需要进行过滤挑选的数据、选中的数据、未保存的数据、当前数据，这类变量必须在前面加上修饰词、限定词。例如：`filteredDetails`、`selectedRows`、`unSavedRecords`、`currentIndex`、`totalCount`、`defaultPassword`、`commonTarget`、`expiredKeys`

标志性变量：

这类变量通常是布尔变量，只有`true`和`false`。表示是否可以用`isXXX`，`notXXX`，`flag`例如：`isLogin`、`isLast`；表示开关可以用`enable`、`disable`、`switchOn`、；表示成功失败，可以用`succeed`、`failed`、

带层级关系变量：

这种变量在处理嵌套数据的时候最常见，可以使用表示层级关系的形容词修饰。

例如：`outerContainer`、`nestedException`、`innerPage`、`wrapedData`、`includedFiles`、`coveredDetail`、`parentObj`、`enclosedArea`

特定范围：

范围类的形容词包含时间、地点、位置等几大类。

时间有现在、过去、未来，例如：`lastestOperation`、

地点有国内、国外、当地、远程，例如：`localMachine`、`remoteClient`、

位置有上下左右前后，例如：`currentItem`，`leftSide`，`topPanel`

对象属性：

对于对象的属性名，最好加上对象本身的名字，用xxxProperty表示，例如：`userInfo`、`objId`、`tabName`、`requestData`、`sysOption`、`tokenTime`

另一种表示形式是把属性名放在对象名之前，用`xxxOfXxx`，例如`lengthOfSubstr`、`complexcityOfPassword`、`fieldsOfObj`

交互型变量：

系统间交互、方法间调用都可以用下面这种形式来体现交互性。例如：`responseForPos`、、`tasksToExecute`

角色型变量：

这种变量最能体现面向对象编程。面向对象编程，通俗来讲就是各司其职，每个对象都有自己的专属工作。

这种变量形如事物+动作的执行者。

例如：`eventHandler`、`dataConverter`、`loadBalancer`、`messageGenerator`、`requestDispatcher`、`healthIndicator`、`ConfigurationImportSelector`、`cacheLoader`、

描述型变量：

这种变量后面通常会添加一个体现该变量作用的类名。(这种方式在给类起名字时最常用、Java类名首字母要大写)

例如：`userEntity`、`serviceInstance`、`orgQueryService`、`redisConfig`、`netConstant`

临时变量：

有些临时变量，不必大费周章。当你在小的for循环中、嵌套的for循环中需要给对象的属性命名时，不要给它加上限定词。例如下面的代码，for循环的 i 不需要currentIndex这种，写了反而看着很累。

```jsx
        let objs = [];
        for (let i = 0; i < idList.length; i++) {
            let item = that.vm.getObjById(idList[i]);
            objs.push(item);
        }
        return objs;
```

[百度翻译-200种语言互译、沟通全世界！](https://fanyi.baidu.com/)

## 变量单词词汇

[词汇表](https://bossshi.notion.site/23a1ce8becbe4e979f8c6c3727941d0a?v=26c0cbd967294c279fa53469fa6352c3)

## 神器：变量命名网站

[CODELF](https://unbug.github.io/codelf/)