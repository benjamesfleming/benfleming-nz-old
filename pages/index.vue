<template>
  <v-app>
    <main v-reverse-order>

      <!-- Page Header -->
      <header class="header" v-angle="headerAngle">
        <v-layout class="header--content-wrapper">
          <v-img src="~/assets/images/header--bg-img.jpg" position="center 25%"></v-img>
          <v-flex class="header--content sm12 lg8 py-5">
            <h2 class="header--content-title font-weight-bold white--text">I'm Ben Fleming...</h2>
            <h2 class="header--content-tagline font-weight-bold white--text">Web &amp; Software Developer</h2>
            <div class="header--content-icons">
              <a href="https://github.com/benjamesfleming" target="_blank"><img src="~/assets/icons/github.svg"/></a>
              <a href="mailto:ben@benfleming.io" target="_blank"><img src="~/assets/icons/envelope.svg"/></a>
            </div>
          </v-flex>
          <v-flex class="header--img-wrapper lg4 hidden-md-and-down">
            <v-img src="~/assets/images/header--fg-img.png" aspect-ratio="0.5625"></v-img>
          </v-flex>
        </v-layout>
      </header>

      <v-divider class="header--divider" :style="`--content-opacity: ${scrollTop}`"></v-divider>
      <v-container fluid style="max-width: 1024px;">

        <!-- About Me Section -->
        <section class="section about-me">
          <h2 class="section--heading font-weight-bold black--text">About Me</h2>
          <v-icon-list :scale="iconScale">
            <v-my-icon alt="Amazon Web Services" :src="require(`~/assets/devicons/amazonwebservices.svg`)"/>
            <v-my-icon alt="C-Sharp" :src="require(`~/assets/devicons/csharp.svg`)"/>
            <v-my-icon alt="Git" :src="require(`~/assets/devicons/git.svg`)"/>
            <v-my-icon alt="NodeJS" :src="require(`~/assets/devicons/nodejs.svg`)"/>
            <v-my-icon alt="JavaScript" :src="require(`~/assets/devicons/javascript.svg`)"/>
            <v-my-icon alt="MySQL" :src="require(`~/assets/devicons/mysql.svg`)"/>
          </v-icon-list>
          <div class="section--content-wrapper">
            <p>
              Hey there... I'm <strong>Ben Fleming</strong>, a passionate <em>Web &amp; Software</em> developer. 
              I have a keen interest in all things tech. I have become proficient in languages including <strong>HTML</strong>, <strong>CSS</strong>, <strong>Javascript</strong>, <strong>VueJS</strong> and others.
            </p>
            <p>
              I also like to keep an eye on all areas of <strong><em>I.T.</em></strong>, having played around with <strong>AWS</strong>, <strong>Azure</strong>, <strong>Serverless</strong>, etc.
            </p>
          </div>
        </section>

        <!-- My Project Section -->
        <section class="section my-projects">
          <h2 class="section--heading font-weight-bold black--text">My Projects</h2>
          <div class="my-projects--grid">
            <v-project-card 
              v-for="(project, idx) in content.projects"
              :value="project" 
              :key="idx"
            />
            <v-card class="my-projects-placeholder hidden-xs-only" elevation="0">
              <span class="display-3 font-weight-bold">MORE COMING SOON</span>
            </v-card>
          </div>
        </section>
      </v-container>

      <!-- Page Footer  -->
      <footer class="footer" style="max-width: 1024px;">
        <span>&copy; Ben Fleming 2019-{{ fullYear }}.</span>
        <span>All Rights Reserved</span>
        <v-spacer></v-spacer>
        <div class="footer--links">
          <a href="https://github.com/benjamesfleming" target="_target">Github</a> • 
          <a href="mailto:ben@benfleming.io" target="_blank">Email</a>
        </div>
      </footer>
    </main>
  </v-app>
</template>

<script>
import IconList from "~/components/icon-list.vue";
import Icon from "~/components/icon.vue";
import ProjectCard from "~/components/project-card.vue";
import getProjects from "~/content/getProjects.js";

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
  async asyncData () {
    const projects = await getProjects();
    
    return {
      content: { projects }
    };
  },

  /**
   * Page Depenencies
   * all the other componets this page relies on
   */
  components: { 
    "v-icon-list": IconList,
    "v-my-icon": Icon, 
    "v-project-card": ProjectCard 
  },

  /**
   * Page Data
   * inital page starting data
   */
  data () {
    return {
      scrollTop: 0,
      date: new Date(),
      content: {
        projects: []
      },
    };
  },

  /**
   * Page Computed Date
   * dynamic data to render on the page
   */
  computed: {
    fullYear () {
      return this.date.getFullYear();
    },
    headerAngle () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 5
        default  : return 3
      }
    },
    iconScale () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '0.4'
        default  : return '1.0'
      }
    }
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
  @media screen and (max-width: 1264px)
    margin-top: -35px
  @media screen and (max-width: 960px)
    content: "Continue Down"
  @media screen and (max-width: 600px)
    font-size: 16px
    margin-top: -22px

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
      .header--content-title
        font-size: 56px
        @media screen and (max-width: 600px)
          font-size: 20px
      .header--content-tagline
        font-size: 32px
        @media screen and (max-width: 600px)
          font-size: 16px
      .header--content-icons
        margin: 20px 0 0 0
        a > img
          width: 48px
          height: 48px
          filter: drop-shadow(3px 3px 6px rgba(#aaaaaa, 0.5))
          @media screen and (max-width: 600px)
            width: 32px
            height: 32px
        a:not(:last-child)
          margin: 0 10px 0 0
    .header--img-wrapper
      width: 100%
      height: inherit
      overflow: hidden
      align-self: flex-end
      .v-image
        width: 100%
        margin: -100px 0

.footer
  display: flex
  margin: auto
  padding 0 24px
  font-size: 20px
  @media screen and (max-width: 600px)
    flex-direction: column
    font-size: 14px
  .footer--links a
    text-decoration: none
    &:not(:last-child)
      margin-right: 5px
    &:not(:first-child)
      margin-left: 5px

.section
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .section--content-wrapper
    width: 100%
    font-size: 32px
    @media screen and (max-width: 600px)
      font-size: 22px
    strong
      padding: 0 5px
  .section--heading
    letter-spacing: 0.1em !important
    filter: drop-shadow(3px 3px 4px #aaaaaa)
    display: inline
    padding: 10px
    color: #222 !important
    position: relative
    white-space: nowrap
    font-size: 56px
    @media screen and (max-width: 600px)
      font-size: 36px
    &::before
      content: ""
      position: absolute
      bottom: 5px
      left: 5px
      right: 5px
      height: 10px
      background-color: rgba(#444, 0.1)
      transform: translate(0, -22px)
  
.my-projects
  .my-projects--grid
    width: 100%
    display: grid
    grid-gap: 10px
    grid-template-columns: 1fr 1fr 1fr
    @media screen and (max-width: 960px)
      grid-template-columns: 1fr 1fr
    @media screen and (max-width: 600px)
      grid-template-columns: 1fr
  .my-projects-placeholder
    background: none
    display: flex
    align-items: center
    justify-content: center
    span 
      text-align: center
      color: rgba(#444, 0.1)
      text-shadow: 1px 1px white, -1px -1px rgba(#444, 0.1);
</style>