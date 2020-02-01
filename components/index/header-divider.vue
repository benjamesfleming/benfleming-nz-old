<template>
    <div class="header--divider" :style="`--content-opacity: ${scrollTop}`"/>
</template>

<script>
export default {

    /**
     * Component Data
     * inital page starting data
     */
    data() {
        return {
            scrollTop: 0,
        };
    },

    /**
     * Component Methods
     * all the pages methods needed for dynamic content
     */
    methods: {
        handleScroll() {
            this.scrollTop = (80 - window.scrollY) / 80;
        }
    },

    /**
     * On Component Created
     * this method runs when the page is created
     */
    created() {
        if (!process.client) return;

        this.handleScroll();
        window.addEventListener("scroll", this.handleScroll);
    },

    /**
     * On Component Destory
     * this method cleans up when the page is destoryed
     */
    destroyed() {
        if (!process.client) return;

        window.removeEventListener("scroll", this.handleScroll);
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl';

.header--divider {
    display: block;
    flex: 1 1 0px;
    height: 0px;
    max-height: 0px;
    max-width: 100%;

    @media screen and (max-width: $breakpoint-sm) {
        display: none;
    }
}

.header--divider::after {
    content: 'Continue Down To Learn More';
    font-size: 24px;
    margin-top: -45px;
    width: 100%;
    text-align: center;
    position: absolute;
    color: #222 !important;
    letter-spacing: 0.1em !important;
    filter: drop-shadow(3px 3px 4px #aaaaaa);
    opacity: var(--content-opacity);

    @media screen and (max-width: $breakpoint-lg) {
        margin-top: -35px;
    }

    @media screen and (max-width: $breakpoint-md) {
        content: 'Continue Down';
    }

    @media screen and (max-width: $breakpoint-sm) {
        content: '';
    }
}
</style>