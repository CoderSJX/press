# 🍤 深入理解JavaScript

## 闭包

### 定义

闭包：引用了其他函数的函数作用域中变量的函数。

> :sunrise_over_mountains: 闭包是函数，在函数中引用了其他函数的函数作用域中变量。

举例：

createComparsionFunction函数中返回的匿名函数就是一个闭包，因为它引用了createComparsionFunction函数作用域中的propertyName变量。

```java
    function createComparsionFunction(propertyName) {
        return function (object1, object2) {
            let value1 = object1[propertyName];
            let value2 = object2[propertyName];
            if (value1 < value2) { return -1 }
            else if (value1 > value2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
```



### 特殊情况

下面这种情况不是闭包，虽然在createComparsionFunction函数上声明了变量x，并且在test函数中引用了该变量，但是x变量并不属于createComparsionFunction函数内的变量，因此不是闭包。所以，通常闭包只会在嵌套函数中。

```js
    function createComparsionFunction(propertyName) {
        let b = 234;
    }
    createComparsionFunction.x = 1;
    function test(createComparsionFunction) {
       let y= createComparsionFunction.x
    }
    test(createComparsionFunction)
```



## 发布订阅模式

```html
</html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    输入框1. <input class="box_1" v-model="input1"></input>
    输入框2. <input class="box_2" v-model="input2"></input>
</body>
<script>
    let subscribeSystem = {
        messagesMap: {},
        register: function (registerId, message) {
            (this.messagesMap[registerId] || (this.messagesMap[registerId] = [])).push(message)
        },
        publish: function () {
            let registerId = Array.prototype.shift.call(arguments)
            let messages = this.messagesMap[registerId]
            if (!messages || messages.length === 0) return;
            for (let i = 0; i < messages.length; i++) {
                let m = messages[i];
                m.apply(this, arguments);
            }
        }
    }
    let data = {
        input1: {
            target: '.box_1',
            content: '内容1'
        },
        input2: {
            target: '.box_2',
            content: '内容2'
        },
    }

    let virtualData = {

    }
    function register({ data }) {
        for (const obj in data) {
            if (Object.hasOwnProperty.call(data, obj)) {
                const ele = data[obj];
                let el = document.querySelector(ele.target);
                el.value=ele.content
                let model = el.value;
                Object.defineProperty(virtualData, obj,
                    {
                        get: function () {
                            return model;
                        },
                        set:function(val){
                            model=val
                            subscribeSystem.publish(obj,val)
                        },

                    }
                )
                subscribeSystem.register(obj,function(content){
                    el.value=content
                })
            }
        }
    }
    register({data})
</script>

</html>
```

