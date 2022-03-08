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
        sidebarDepth: 2,
        sidebar: {
            '/summary/': [
                'var-naming',
                'leetcode-log',
                'maven-setting',
                'mysql-log',
                'ssm-quick-guide',
            ],
            '/stars/': [
                'front-end-webs',
                'web-for-coder-study',
                'research-util',
                'util-for-coder',
                'v2ray',
            ],
            '/small-white/': [
                'guide-for-pc-buy',
                'short-cut-for-windows'
            ],
            '/recommend/': [
                'house-rent',
            ],
            '/resources/': [
                'library-for-coder',
                'app-for-study',
            ],
            '/': [
                '',
            ]

        },

        logo: '/favicon.ico',
        nav: [
            {text: '首页', link: '/'},
            {text: '网站收藏夹', link: '/stars/front-end-webs'},
            {text: '资源分享', link: '/resources/library-for-coder'},
            {text: '推荐与避坑', link: '/recommend/house-rent'},
            {text: '编程之路', link: '/summary/var-naming'},
            {text: '电脑小白', link: '/small-white/guide-for-pc-buy.md'},
            {text: '情感分享', link: '/emotion/'},
            {text: 'Github', link: 'https://github.com/CoderSJX'},
        ],
        lastUpdated: '上次更新',
        smoothScroll: true

    },

    // ...
    plugins:
        [
            'fulltext-search',
            '@vuepress/back-to-top',
            '@vuepress/nprogress',
            '@vuepress/medium-zoom',
            ['@vuepress/pwa', {

                serviceWorker: true,
                generateSWConfig: {
                    globPatterns: [
                        '**\/*.{html,json,ico,css,js,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}',
                    ],

                },
                updatePopup: {
                    message: "发现内容更新，快刷新看看吧",
                    buttonText: "点此刷新"
                }
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
            ],
            [
                'vuepress-plugin-clean-urls',
                {
                    normalSuffix: '',
                },
            ],
            [
                '@vuepress/google-analytics',
                {
                    'ga': '' // UA-00000000-0
                }
            ]],

}