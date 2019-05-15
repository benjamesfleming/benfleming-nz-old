const pkg = require('./package')

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const { VuetifyProgressiveModule } = require('vuetify-loader')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '| benfleming.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#fff',
    height: '5px'
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Web Fonts to load without render blocking 
  */
  webfontloader: {
    google: {
      families: ['Roboto:300,400,500,700', 'Material+Icons'] //Loads Lato font with weights 400 and 700
    }
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/directives/index'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader')
      const imgLoader = config.module.rules.find((rule) => rule.test.test('.png'))

      vueLoader.options.compilerOptions = {
        modules: [VuetifyProgressiveModule]
      }

      imgLoader.test = /\.(png|jpe?g|gif|webp)(\?.*)?$/i
      imgLoader.use = [
        {
          loader: 'vuetify-loader/progressive-loader',
          options: { graphicsMagick: true }
        },
        {
          loader: 'url-loader',
          options: { limit: 8000 }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            webp: {
              quality: 75
            }
          }
        }
      ]

      config.module.rules.push({
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8000 }
          }
        ]
      })

      config.module.rules.push({
        test: /\.md$/i,
        use: [
          { loader: 'gray-matter-loader' }
        ],
      })
    }
  }
}
