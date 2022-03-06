module.exports = {
    title: 'idea小时',
    dest: 'dist',

    head: [
        ['link', {rel: 'icon', href: '/logo.jpg'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#409EFF'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'default'}],
        ['link', {rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.jpg'}],
        ['link', {rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#409EFF'}],
        ['meta', {name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.jpg'}],
        ['meta', {name: 'msapplication-TileColor', content: '#ffffff'}]
    ],
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {

        sidebar: {
            '/summary/': [
                '变量命名规范', '说说MySQL的那些日志', 'LeetCode刷题记录', '快速理解SSM三大流行框架', 'Maven安装及设置'
            ],
            '/stars/': ['前端那些Amazing的网站', '程序员学习网站精选', '学术研究类工具推荐', '程序员的工具箱',],
            '/small-white/': ['常用电脑快捷键（Windows系统）', '电脑选购指南'],

            '/': [
                '',
            ]

        },

        logo: '/favicon.ico',
        nav: [
            {text: '主页', link: '/'},
            {text: '收藏夹', link: '/stars/前端那些Amazing的网站'},
            {text: '资源', link: '/resources/'},
            {text: '推荐', link: '/recommend/'},
            {text: '经验总结', link: '/summary/变量命名规范'},
            {text: '电脑小白', link: '/small-white/常用电脑快捷键（Windows系统）'},
            {text: '情感分享', link: '/emotion/'},
            {text: 'Github', link: 'https://github.com/CoderSJX'},
        ],
        lastUpdated: '上次更新',
        smoothScroll: true

    },

    // ...
    plugins: ['fulltext-search', '@vuepress/back-to-top', '@vuepress/nprogress', '@vuepress/medium-zoom', ['@vuepress/pwa', {

        serviceWorker: true,
        generateSWConfig: {
            globPatterns: [
                '**\/*.{html,json,ico,css,js,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}',
            ],

        },
        updatePopup: true
    }],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    moment.locale(lang)
                    return moment(timestamp).fromNow()
                }
            }
        ], [
            '@vuepress/google-analytics',
            {
                'ga': '' // UA-00000000-0
            }
        ]],

}