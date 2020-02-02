const pkg = require("./package")

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin")
const { VuetifyProgressiveModule } = require("vuetify-loader")

module.exports = {
    mode: "universal",

    /*
     ** Headers of the page
     */
    head: {
        title: "| benfleming.nz",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: pkg.description
            }
        ],
        link: [
            { rel: "preconnect", href: "https://storage.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://ajax.cloudflare.com" }
        ]
    },

    /*
     ** PWA Manifest Options
     */
    manifest: {
        name: "benfleming.nz",
        lang: "en"
    },

    /*
     ** PWA Workbox Options
     */
    workbox: {
        runtimeCaching: [
            {
                urlPattern: "https://fonts.googleapis.com/.*",
                handler: "cacheFirst",
                method: "GET",
                strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
            },
            {
                urlPattern: "https://fonts.gstatic.com/.*",
                handler: "cacheFirst",
                method: "GET",
                strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
            }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: "#fff",
        height: "5px"
    },

    /*
     ** Global CSS
     */
    css: ["~/assets/style/app.styl"],

    /*
     ** Web Fonts to load without render blocking
     */
    webfontloader: {
        google: {
            families: ["Roboto:300,400,500,700", "Material+Icons"] //Loads Lato font with weights 400 and 700
        }
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        "~/plugins/vuetify",
        "~/plugins/breakpoints",
        "~/plugins/directives/index"
    ],

    /*
     ** Nuxt.js modules
     */
    modules: ["@nuxtjs/pwa", "nuxt-webfontloader"],

    /*
     ** Build configuration
     */
    build: {
        transpile: ["vuetify/lib"],
        plugins: [new VuetifyLoaderPlugin()],
        loaders: {
            stylus: {
                import: ["~assets/style/variables.styl"]
            }
        },

        /*
         ** You can extend webpack config here
         */
        extend(config) {
            const vueLoader = config.module.rules.find(
                rule => rule.loader === "vue-loader"
            )
            const imgLoader = config.module.rules.find(
                rule =>
                    rule.test.test(".png") &&
                    rule.test.test(".jpg") &&
                    rule.test.test(".gif") &&
                    rule.test.test(".webp") &&
                    rule.test.test(".svg")
            )

            vueLoader.options.compilerOptions = {
                modules: [VuetifyProgressiveModule]
            }

            // Disable non-responsive loader for all but gifs
            imgLoader.test = /\.(gif)$/i

            // Response loader rule
            config.module.rules.push({
                test: /\.(png|jpe?g|webp)$/,
                use: [
                    {
                        loader: "responsive-loader",
                        options: {
                            name: "img/[hash:7]-[width].[ext]",
                            placeholder: false,
                            min: 640,
                            max: 1080,
                            quality: 65,
                            steps: 5
                        }
                    }
                ]
            })

            // SVG rule for ?inline & ?data
            config.module.rules.push({
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /inline/,
                        use: [
                            {
                                loader: "vue-svg-loader",
                                options: {
                                    svgo: false
                                }
                            }
                        ]
                    },
                    {
                        resourceQuery: /data/,
                        loader: "url-loader",
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "file-loader"
                    }
                ]
            })

            // Markdown rule
            config.module.rules.push({
                test: /\.md$/i,
                use: [{ loader: "gray-matter-loader" }]
            })
        }
    }
}
