---
title: 👀 Vue面试题
date: 2022-04-11
categories:
 - 编程之路
tags:
 - 编程经验
 - 深入理解
 - Vue
 - JavaScript
 - 源码解析
---

## 解释下响应式系统

响应式系统的数据模型仅仅是JavaScript对象，而当你修改它们的时候，视图会进行更新。简而言之就是，视图随数据变化而变化。

## 说下Vue的响应式原理

Vue响应式的核心在于变化侦测。

在JS中有两种方法可以检测到对象的变化，一种是Object.defineProperty方法，另一种是ES6的Proxy。由于ES6在浏览器中的支持效果不理想，所以Vue2.0使用的是前者来实现变化侦测。

通过Object.defineProperty方法将属性转换成getter/setter的形式，读取数据时会触发getter，修改数据时会触发setter。在getter中收集有哪些依赖使用了数据，当setter被触发时，通知这些依赖数据发生了变化。为了更好地管理依赖，使用Watcher数据结构来定义依赖，使用Dep来管理依赖：包括收集依赖、删除依赖和向依赖发送消息。Watcher的使用原理是将自己设置到全局唯一的指定位置（window.target)，然后读取数据，从而触发这个数据的getter，此时，getter就会读取全局唯一的Watcher，把这个Watcher收集到Dep中。当数据发生了变化，就会触发setter，从而向Dep中的Watcher发送通知，Watcher收到通知后向外界发送通知，此后就可以触发视图更新。最后通过Observer类，把一个object中所有的数据（包括子数据）都转换成响应式的。

## Vue如何检测数组的变化

出于性能考虑，并没有使用defineProperty对数组的每一项进行拦截，而是通过对7种数组操作方法进行覆盖来拦截数组的变化。

这7种方法包括push、pop、shift、unshift、splice、reverse、sort。

具体是使用一个拦截器覆盖Array.prototype，对这7种方法，都使用Object.defineProperty方法进行拦截，之后，每当使用Array原型上的方法操作数组时，其实执行的都是拦截器中提供的方法。因此，可以在自定义的方法中调用原生数组操作的方法和做一些其他的事情，比如说：发送变化通知。

为了避免污染全局的Array，我们通过Observer类来将希望变成响应式Array的数组具备响应式能力。

最后，将具有拦截功能的arrayMethods挂在到数组的\_proto\_来实现覆盖原型的功能。

然而，对于不支持使用\_proto\_的情况，Vue的做法非常粗暴，直接将这些方法设置到被侦测的数组上。



## 讲一下Vue的生命周期方法

**beforeCreate**：发生在new Vue之后，此时data、methods、computed以及watch上的数据和方法都不能访问。

**created**：在实例创建完成后被调用。在此之前进行了data、methods、computed以及watch的初始化，此时已经可以访问上述数据和方法。但是此时并不能和DOM进行交互，如果必须交互的话，可以使用vm.$nextTick 来访问DOM。

**beforeMount**：在DOM挂载前被调用：渲染函数首次被调用。

**mounted**：在DOM挂载完成后发生，此时真实DOM已经挂载完毕，可以访问DOM节点。

**beforeUpdate**：数据更新时被调用。发生在虚拟DOM重新渲染和patch之前，可以在此时进一步的更改状态。

**updated**：发生在更新完成之后，此时组件的DOM已经完成更新。需要注意是避免在此时更改数据，可能会导致无限循环更新，此钩子函数在服务器渲染期间不被调用。

**beforeDestory**：实例销毁之前调用。此时，实例仍然可用，可进行清尾工作，比如清除定时器。

**destroyed**：实例销毁后调用。此时，Vue实例所指示的所有东西都会解绑，所有的事件监听器都会移除，所有的子实例也会被销毁。此钩子函数在服务器渲染期间不被调用。

**activated**：keep-alive专属，组件被激活时调用。

**deactivated**：组件被销毁时调用。



可以在钩子函数 created、beforeMount、mounted 中进行异步请求，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

如果异步请求不需要依赖 DOM，推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面  loading 时间；
- ssr  不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性



## v-if 和 v-show 的区别

v-if 在编译过程中会被转化成三元表达式,条件不满足时不渲染此节点。

v-show 会被编译成指令，条件不满足时控制样式将对应节点隐藏 （display:none）

**使用场景**

v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景

v-show 适用于需要非常频繁切换条件的场景



## Vue组件通讯方式有哪些

1. 父组件可以通过props向子组件传递数据，可以通过$refs来访问子组件。
2. 子组件可以通过发出emit事件来和父组件进行通信，父组件通过处理emit事件来响应。
3. 可以通过$parent和$children来获取当前组件的父组件和子组件。
4. 可以通过Vuex的状态管理进行数据通信



## 为什么Vue data是个函数

data返回一个函数，是为了每次复用组件，都会返回一个新的data，给每个组件实例创建了一个私有的数据空间，让实例维护各自的数据。如果写成对象形式，就使得所有实例公用一份data。



## Vue3.0 和 2.0 的响应式原理区别

Vue3.x 改用 Proxy 替代 Object.defineProperty。因为 Proxy 可以直接监听对象和数组的变化，并且有多达 13 种拦截方法。



## 讲下虚拟DOM

因为DOM操作是非常昂贵的，频繁地操作DOM会产生一定的性能问题。因此为了避免频繁操作DOM，产生了虚拟DOM。虚拟DOM本质上是一个JS对象，用此对象来描述一个真实的DOM节点，是对DOM的一层抽象。

优点：

1. 保证性能下限：虽然虚拟DOM的性能并不是最优的，但是他能保证在大部分不手动优化的情况下，能够提供不错的性能。
2. 提高开发效率：因为不需要手动操作DOM，开发者只需关注View-Model的代码逻辑，极大地提高了开发效率。
3. 跨平台：虚拟DOM是JS对象，而真实DOM与平台强相关，因此，虚拟DOM的跨平台性更好，可以进行服务端渲染、weex开发等

缺点：

1. 无法进行极致的优化：在一些性能要求极高的应用中，利用虚拟DOM无法进行更好地优化。
2. 首次渲染大量DOM时，因为多了一层虚拟DOM的计算，会比innerHTML插入慢。



## 使用过 Vue SSR 吗？说说 SSR

SSR就是服务端渲染，也就是本该在客户端将标签渲染成HTML的工作交给了服务端完成，然后把HTML返回给客户端。

优点：SSR具有更好的SEO，并且首屏加载速度更快。

缺点：开发条件受限，SSR只支持beforeCreate和created两个钩子，且需要处于Node.js环境中。另外服务器会有更大的负载需求。











