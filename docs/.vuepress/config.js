module.exports = {
    title: 'idea小时',
    dest: 'dist',
    theme: 'reco',
    head: [
        ['link', {rel: 'icon', href: '/logo.jpg'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#409EFF'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'default'}],
        ['link', {rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.jpg'}],
        ['link', {rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#409EFF'}],
        ['meta', {name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.jpg'}],
        ['meta', {name: 'msapplication-TileColor', content: '#ffffff'}],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
            },
        },
        authorAvatar: '/logo.jpg',
        subSidebar: 'auto',
        sidebarDepth: 2,
        noFoundPageByTencent: false,
        sidebar: {
            '/summary/': [
                'spring-boot-annotation',
                'var-naming',
                'leetcode-log',
                'maven-setting',
                'mysql-log',
                'ssm-quick-guide',
                'deep-in-js',
                'vue-src-analysis',
                'js-tricks',
                'pit',
                'ide-kick-ass',
            ],
            '/stars/': [
                'research-util',
                'scientific-research',
                'front-end-webs',
                'web-for-coder-study',
                'util-for-coder',
                'deep-in-coding',
            ],
            '/small-white/': [
                'short-cut-for-windows',
                'guide-for-ebooks',
                'guide-for-pc-buy',
            ],
            '/recommend/': [
                'house-rent',
            ],
            '/resources/': [
                'library-for-coder',
                'app-for-study',
                'ebooks-for-coder',
                'tuling-books'
            ],
            '/emotion/': [
                'psychology',
            ],
            '/': [
                '',
            ]

        },
        searchMaxSuggestions: 10,
        logo: '/favicon.ico',
        nav: [
            {text: '首页', link: '/',icon: 'reco-home'},
            {text: '时间轴', link: '/timeline/', icon: 'reco-date'},
            {text: 'Github', link: 'https://github.com/CoderSJX', icon: 'reco-github'},
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
                'vuepress-plugin-clean-urls',
                {
                    normalSuffix: '/',
                },
            ],
            [
                '@vuepress/google-analytics',
                {
                    'ga': '' // UA-00000000-0
                }
            ]],

}