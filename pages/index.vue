<template>
  <v-app>
    <main>
      <div class="background"></div>
      <div class="content">
        <h1 class="display-2 font-weight-black">This Website Is Getting Built,</h1>
        <h1 class="display-3 font-weight-black">Like, <span class="underline">RIGHT NOW</span>...</h1>
        <p class="display-1">
          In the mean time you can still check me out on <a href="https://github.com/benjamesfleming">GitHub</a>.
        </p>
      </div>
    </main>
  </v-app>
</template>

<script>
export default {

  /**
   * Page Head Options
   * set all the nessary <head> options
   */
  head () {
    return {
      titleTemplate: `home %s`
    }
  },
};
</script>

<style lang="stylus" scoped>
  main
    width 100vw
    height 100vh
    display flex
    align-items center
    justify-content center
    flex-direction column
    position relative
    z-index 0
    background linear-gradient(to right, #dae2f8, #d6a4a4)
    padding 20px

    .content
      display flex
      align-items center
      justify-content center
      flex-direction column
      max-width 1024px

    .background
      background-image url("../assets/images/circuit-board.svg")
      opacity 0.1
      background-repeat initial
      width  100vw
      height 100vh
      position absolute
      z-index: -1

    p
      margin-top 20px

    * > .underline
      position: relative
      &::before
        content: ""
        position: absolute
        bottom: 0
        left: 5px
        right: 5px
        height: 10px
        background-color: rgba(#222222, 0.5)
        transform: translate(0, -8px)
</style>