module.exports = {
    title:'idea小时',
    themeConfig: {

        sidebar: {
            '/summary/':[
                '','LeetCode刷题记录','快速理解SSM三大流行框架'
            ],
            '/stars/':['V2Ray使用方法和节点','dubbo'],

            '/': [
                '',
            ]

        },

        logo:'/favicon.ico',
        nav: [
            { text: '主页', link: '/' },
            { text: '收藏夹', link: '/stars/dubbo' },
            { text: '资源', link: '/resources/' },
            { text: '推荐', link: '/recommend/' },
            { text: '经验总结', link: '/summary/' },
            { text: '电脑小白', link: '/small-white/' },
            { text: '情感分享', link: '/emotion/' },
            { text: 'Github', link: 'https://github.com/CoderSJX' },
        ]
    }
}