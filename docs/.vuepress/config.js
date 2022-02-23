module.exports = {
    title:'idea小时',
    dest:'dist',
    themeConfig: {

        sidebar: {
            '/summary/':[
                '变量命名规范','LeetCode刷题记录','快速理解SSM三大流行框架'
            ],
            '/stars/':['前端那些Amazing的网站','dubbo'],

            '/': [
                '',
            ]

        },

        logo:'/favicon.ico',
        nav: [
            { text: '主页', link: '/' },
            { text: '收藏夹', link: '/stars/前端那些Amazing的网站' },
            { text: '资源', link: '/resources/' },
            { text: '推荐', link: '/recommend/' },
            { text: '经验总结', link: '/summary/变量命名规范' },
            { text: '电脑小白', link: '/small-white/' },
            { text: '情感分享', link: '/emotion/' },
            { text: 'Github', link: 'https://github.com/CoderSJX' },
        ]
    }
}