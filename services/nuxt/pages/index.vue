<template>
  <v-app>
    <main v-reverse-order>

      <!-- Page Header -->
      <header class="header" v-angle="5.75">
        <v-layout class="header--content-wrapper">
          <v-img src="~/assets/images/header--bg-img.jpg" position="center 25%"></v-img>
          <v-flex class="header--content xs12 sm8 py-5">
            <h2 class="display-3 font-weight-bold white--text">I'm Ben Fleming...</h2>
            <h2 class="display-1 font-weight-bold white--text">Web &amp; Software Developer</h2>
          </v-flex>
          <v-flex class="header--img-wrapper xs4 hidden-xs-only">
            <v-img src="~/assets/images/header--fg-img.png" aspect-ratio="0.5625"></v-img>
          </v-flex>
        </v-layout>
      </header>


      <v-divider v-granim="gradients"></v-divider>
      <v-container fluid style="max-width: 1024px;">

        <!-- About Me Section -->
        <section class="section about-me">
          <h2 class="section--heading display-3 font-weight-bold black--text">About Me</h2>
          <div class="about-me--icon-list">
            <v-tooltip bottom>
              <template slot="activator">
                <img src="~/assets/icons/csharp.svg"/>
              </template>
              <span>C-Sharp</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template slot="activator">
                <img src="~/assets/icons/nodejs.svg"/>
              </template>
              <span>Node-JS</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template slot="activator">
                <img src="~/assets/icons/javascript.svg"/>
              </template>
              <span>Javascript</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template slot="activator">
                <img src="~/assets/icons/aws.svg"/>
              </template>
              <span>Amazon-Web-Services</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template slot="activator">
                <img src="~/assets/icons/reactjs.svg"/>
              </template>
              <span>React-JS</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template slot="activator">
                <img src="~/assets/icons/vuejs.svg"/>
              </template>
              <span>Vue-JS</span>
            </v-tooltip>
          </div>
          <div class="section--content-wrapper" v-html="about_me"></div>
        </section>

        <!-- My Project Section -->
        <section class="section my-projects">
          <h2 class="section--heading display-3 font-weight-bold black--text">My Projects</h2>
        </section>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import mkdn from "markdown-it";

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

  /**
   * Async Data (NUXT)
   * get the api data while on the server, and render the inital html
   */
  asyncData ({ $axios }) {
    return $axios.$get(`/_/items/homepage/1`)
      .then(res => res.data)
      .then(data => {
        const about_me = new mkdn().render(data.about_me || "");
        return { ...data, about_me };
      });
  },
};
</script>

<style lang="stylus" scoped>
$img-blur = 15px

@keyframes header--hue-rotate
  for i in 0..10
    {10% * i}
      filter: grayscale(75%) blur($img-blur) brightness(0.6) hue-rotate(((360/10)*i)deg)

.header
  width: 100%
  position: relative
  overflow: hidden
  &:not(:first-child)
    margin-top: -100px
  .header--content-wrapper
    background-size: 0
    z-index: 0
    min-height: calc(100vh - 14px)
    > .v-image
      position: absolute
      top: -1*$img-blur
      left: -1*$img-blur
      width: "calc(100% + (%s * 2))" % ($img-blur)
      height: "calc(100% + (%s * 2))" % ($img-blur)
      animation: header--hue-rotate 15s infinite
    .header--content
      display: flex
      flex-direction: column
      align-content: center
      justify-content: center
      text-align: center
      text-shadow: 3px 3px 0px rgba(#aaaaaa, 0.5)
      z-index: 1
      transform: scale(1.2)
    .header--img-wrapper
      width: 100%
      height: inherit
      overflow: hidden
      .v-image
        width: 100%
        margin-top: -100px
        margin-bottom: -100px

.section
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .section--content-wrapper
    font-size: 32px
    strong
      padding: 0 5px
  .section--heading
    letter-spacing: 0.1em !important
    filter: drop-shadow(3px 3px 4px #aaaaaa)
    display: inline
    padding: 10px
    color: #222 !important
    position: relative
    &::before
      content: ""
      position: absolute
      bottom: 0
      left: 5px
      right: 5px
      height: 10px
      background-color: rgba(#222222, 0.2)
      transform: translate(0, -22px)

.about-me
  .about-me--icon-list
    display: flex
    padding: 30px 0px
    span
      position: relative
      filter: drop-shadow(3px 3px 4px #aaaaaa)
      margin: 0 25px
      &:not(:last-child)
        &::after
          content: ""
          position: absolute
          background: rgba(#222222, 0.8)
          width: 5px
          top: 7.5px
          bottom: 7.5px
          right: -27.5px
    img
      width: 64px
</style>