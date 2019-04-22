<template>
  <v-app>
    <main v-reverse-order>

      <!-- Page Header -->
      <header class="header" v-angle="3">
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

      <v-divider class="header--divider" :style="`--content-opacity: ${scrollTop}`"></v-divider>
      <v-container fluid style="max-width: 1024px;">

        <!-- About Me Section -->
        <section class="section about-me">
          <h2 class="section--heading display-3 font-weight-bold black--text">About Me</h2>
          <v-icons :icons="content.icons"/>
          <div class="section--content-wrapper" v-html="content.about_me"></div>
        </section>

        <!-- My Project Section -->
        <section class="section my-projects">
          <h2 class="section--heading display-3 font-weight-bold black--text">My Projects</h2>
          <ul>
            <li v-for="(p, idx) in content.projects" :key="idx">{{ p.title }}</li>
          </ul>
        </section>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import Icons from "~/components/icons.vue";

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
  async asyncData ({ $axios }) {
    const { data } = await $axios.$get(`/_/items/home/1?fields=*,icons.directus_files_id.*`);
    const { data: projects } = await $axios.$get(`/_/items/projects?fields=*,icons.directus_files_id.*`);
    return {
      content: { ...data, projects }
    };
  },

  /**
   * Page Data
   * inital page starting data
   */
  components: { "v-icons": Icons },
  data () {
    return {
      scrollTop: 0,
      content: {
        icons: [],
        about_me: "",
        projects: []
      },
    };
  },

  /**
   * Page Methods
   * all the pages methods needed for dynamic content
   */
  methods: {
    handleScroll () {
      this.scrollTop = (80 - window.scrollY) / 80;
    }
  },

  /**
   * On Page Created
   * this method runs when the page is created
   */
  created () {
    if (!process.client) 
      return;
    
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  },

  /**
   * On Page Destory
   * this method cleans up when the page is destoryed
   */
  destroyed () {
    if (!process.client)
      return;
    
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="stylus" scoped>
$img-blur = 20px

@keyframes header--hue-rotate
  for i in 0..10
    {10% * i}
      filter: grayscale(85%) blur($img-blur) brightness(0.6) hue-rotate(((360/10)*i)deg)

.header--divider::after
  content: "Continue Down To Learn More"
  font-size: 24px
  margin-top: -45px
  width: 100%
  text-align: center
  position: absolute
  color: #222 !important
  letter-spacing: 0.1em !important
  filter: drop-shadow(3px 3px 4px #aaaaaa)
  opacity: var(--content-opacity)

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
</style>