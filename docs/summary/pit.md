---
title: 😅 坑
date: 2022-03-18
categories:
 - 编程之路
tags:
 - 踩坑记录
---

## NBSP（不间断空格）

> :anger: 复制别人的SQL时，一定要写复制进文本文件里，再复制出来。

```html
UPDATE dict_column 
SET disp_position = 0 
WHERE
     obj_id = 'sysMsg' 
	 AND field_name IN ( 'data_status', 'submit_time' );
UPDATE dict_column 
SET edit_style = 10 
WHERE
	obj_id = '234';
```

看起来没有啥问题吧？确实看不出来有啥问题。

但是用Navicat就报错。
> 1064 - You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'obj_id = 'sysMsg' 
> AND field_name IN ( 'data_status', 'submit_time' )' at line 4
> 时间: 0s

它说我obj_id周围有问题，可周围啥也没有啊。

但是我把这个语句放进VsCode中就出现了这个提示。

![vscode-nbsp](https://www.nullpointer.site/images/vscode-nbsp.png)

什么？这里还有个字符？我怎么看不到？

我又放进了WebStorm里。

![webstorm-nbsp](https://www.nullpointer.site/images/webstorm-nbsp.png)

还真有这个字符。

又去找了找这个字符是啥。

![unicode-nbsp](https://www.nullpointer.site/images/unicode-nbsp.png)

好嘛，是个空格。

我这段代码是在DataGrip的console中编辑的，用了代码美化，通过微信复制发给同事，同事复制粘贴到Navicat中运行，就报错了。

现在已发现，把SQL放进VsCode，再从VsCode中复制出来发送到微信上，再从微信上复制出来，就会带NBSP了。

而直接从DataGrip复制出来，再放到微信，再复制出来，却没有这个问题。

有可能是VsCode复制时的问题。

