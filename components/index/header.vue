<template>
    <header v-angle="headerAngle" class="header">
        <v-layout class="header--content-wrapper">
            <img
                :srcset="require('~/assets/images/header--bg-img.jpg').srcSet"
            />
            <v-flex class="header--content sm12 lg12 py-5">
                <h2 class="header--content-title">
                    I'm Ben Fleming...
                </h2>
                <h2 class="header--content-tagline">
                    Technology Enthusiast
                </h2>
                <div class="header--content-icons">
                    <!-- Github Link -->
                    <a
                        href="https://github.com/benjamesfleming"
                        target="_blank"
                        rel="noopener"
                        aria-label="Have a browse of my GitHub."
                    >
                        <img
                            alt="github icon"
                            src="~/assets/icons/github.svg?data"
                        />
                    </a>

                    <!-- Email Link -->
                    <a
                        href="mailto:ben@benfleming.nz"
                        target="_blank"
                        aria-label="Send me an Email."
                    >
                        <img
                            alt="email icon"
                            src="~/assets/icons/envelope.svg?data"
                        />
                    </a>
                </div>
            </v-flex>
        </v-layout>
    </header>
</template>

<script>
export default {
    /**
     * Page Data
     * inital page starting data
     */
    data() {
        return {
            scrollTop: 0
        }
    },

    /**
     * Page Computed Date
     * dynamic data to render on the page
     */
    computed: {
        headerAngle() {
            return this.$breakpoints.name == "xs" ? 5 : 3
        }
    },

    /**
     * On Page Created
     * this method runs when the page is created
     */
    created() {
        if (!process.client) return

        this.handleScroll()
        window.addEventListener("scroll", this.handleScroll)
    },

    /**
     * On Page Destory
     * this method cleans up when the page is destoryed
     */
    destroyed() {
        if (!process.client) return

        window.removeEventListener("scroll", this.handleScroll)
    },

    /**
     * Page Methods
     * all the pages methods needed for dynamic content
     */
    methods: {
        handleScroll() {
            this.scrollTop = (80 - window.scrollY) / 80
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl';

$img-blur = 20px;

@keyframes header--hue-rotate {
  for i in 0 .. 10 {
    {10% * i} {
      filter: grayscale(85%) blur($img-blur) brightness(0.6) hue-rotate(((360 / 10) * i)deg);
    }
  }
}

.header {
    width: 100%;
    position: relative;
    overflow: hidden;

    &:not(:first-child) {
        margin-top: -100px;
    }

    .header--content-wrapper {
        background-size: 0;
        background-color: #222;
        z-index: 0;
        height: calc(100vh - 14px);

        @media screen and (max-width: $breakpoint-sm) {
            height: calc(50vh - 14px);
        }

        > img {
            position: absolute;
            top: -1 * $img-blur;
            left: -1 * $img-blur;
            width: 'calc(100% + (%s * 2))' % $img-blur;
            animation: header--hue-rotate 15s infinite;
        }

        .header--content {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            text-align: center;
            text-shadow: 3px 3px 0px rgba(#aaaaaa, 0.5);
            z-index: 1;
            transform: scale(1.3);

            @media screen and (max-width: $breakpoint-sm) {
                text-shadow: 2px 2px 0px rgba(#aaaaaa, 0.5);
            }

            .header--content-title {
                color: white;
                font-weight: bold;
                font-size: 56px;

                @media screen and (max-width: $breakpoint-sm) {
                font-size: 20px;
                }
            }

            .header--content-tagline {
                color: white;
                font-weight: bold;
                font-size: 32px;

                @media screen and (max-width: $breakpoint-sm) {
                font-size: 16px;
                }
            }

            .header--content-icons {
                margin: 20px 0 0 0;

                a > img {
                width: 48px;
                height: 48px;
                filter: drop-shadow(3px 3px 6px rgba(#aaaaaa, 0.5));

                @media screen and (max-width: $breakpoint-sm) {
                    width: 32px;
                    height: 32px;
                }
                }

                a:not(:last-child) {
                margin: 0 10px 0 0;
                }
            }
        }

        .header--img-wrapper {
            align-self: flex-end;
        }
    }
}
</style>
