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



## Promise

```js
let syncResolve;
let p = new Promise((resolve => {
    syncResolve = function () {
        console.log('resolve started')
        resolve();
        console.log("resolve ended")
    }
}), console.log("with promise"));
console.log("after new promise")
p.then(() => console.log('then handler returns'));
syncResolve();
console.log("after syncResolve ")

//with promise
//after new promise
//resolve started
//resolve ended
//after syncResolve 
//then handler returns
```

1. 伴随new Promise的函数会同步执行。
2. 在Promise变为resolve时，会将resolve的处理程序放进执行任务队列里，其他同步代码照常先执行完毕
3. 同步代码执行完毕后，才会执行任务队列里的函数。



```js
let p = new Promise((resolve, reject) => {
    console.log(123)
    reject('2')
});
p.
then((value => console.log(value))).
catch(value => console.log(value)).
finally(() => {
    console.log("finally")
})
```

then在promise返回resolve时调用，catch在promise返回reject时调用，这两个都可以带参数，finally是不管是resolve还是reject都会调用。

可以在new Promise的时候就调用resolve，生成一个已经resolve的Promise。



```js
let p = new Promise((resolve, reject) => {
    setTimeout(reject, 3000)
});
p.catch(()=>{
    console.log("rejected")
})
```

可以设置超时之后自动进行reject或resolve。



### Promise连锁

实现异步任务串行化

```js
let p1 = new Promise((resolve, reject) => {
    console.log("p1 executor")
    setTimeout(resolve, 1000)
});
p1.then(() => {
    new Promise((resolve, reject) => {
        console.log("p2 executor")
        setTimeout(resolve, 1000)
    }).then(() => {
        new Promise((resolve, reject) => {
            console.log("p3 executor")
            setTimeout(resolve, 1000)
        }).then(() => {
            new Promise((resolve, reject) => {
                console.log("p4 executor")
                setTimeout(resolve, 1000)
            })
        })
    })
})
//注意then的位置，是在每个new后面
//打印结果：每隔一秒打印一个executor
```

把生成Promise的代码提取到一个工厂函数中，解决回调地狱问题。

```js
function delay(message) {
    return new Promise(((resolve, reject) => {
        console.log(message);
        setTimeout(resolve, 1000);
    }))
}

delay("p1 executor")
    .then(() => delay("p2 executor"))
    .then(() => delay("p3 executor"))
    .then(() => delay("p4 executor"))
```

因为then、catch、finally都返回Promise，因此可以串联起来。

```js
let p = new Promise((resolve, reject) => {
    console.log(123)
    reject('2')
});
p.
then((value => console.log(value))).
catch(value => console.log(value)).
finally(() => {
    console.log("finally")
})
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



