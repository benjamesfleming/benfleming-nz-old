<template>
    <footer class="footer" style="max-width: 1024px;">
        <span>&copy; Ben Fleming 2019-{{ fullYear }}.&nbsp;</span>
        <span>All Rights Reserved</span>

        <v-spacer></v-spacer>
        
        <div class="footer--links">
            <a href="https://github.com/benjamesfleming" target="_blank" rel="noopener">Github</a> •
            <a href="mailto:ben@benfleming.nz" target="_blank">Email</a>
        </div>
    </footer>
</template>

<script>
export default {

    /**
     * Page Computed Date
     * dynamic data to render on the page
     */
    computed: {
        fullYear() {
            return new Date().getFullYear();
        },
    },
};
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl';

.footer {
    display: flex;
    margin: auto;
    padding: 0 24px;
    font-size: 20px;

    @media screen and (max-width: $breakpoint-sm) {
        flex-direction: column;
        font-size: 14px;
    }

    .footer--links a {
        color: $link-color;
        text-decoration: none;

        &:not(:last-child) {
            margin-right: 5px;
        }

        &:not(:first-child) {
            margin-left: 5px;
        }
    }
}
</style>
