<template>
  <v-app>
    <main v-reverse-order>

      <!-- Page Header -->
      <header v-angle="clipAngle">
        <v-layout class="header--content-wrapper">
          <v-img src="~/assets/header-img.jpg" position="center 25%"></v-img>
          <v-flex class="header--content xs12 sm8 py-5">
            <h2 class="display-3 font-weight-bold white--text">I'm Ben Fleming...</h2>
            <h2 class="display-1 font-weight-bold white--text">Web &amp; Software Developer</h2>
          </v-flex>
          <v-flex class="header--img-wrapper xs4 hidden-xs-only">
            <v-img src="~/assets/header-img-cut.png" aspect-ratio="0.5625"></v-img>
          </v-flex>
        </v-layout>
      </header>

      <!-- About Me Section -->
      <v-divider v-granim="gradients"></v-divider>
      <v-container fluid style="max-width: 1024px;">
        <section class="about-me">
          <h2 class="display-3 font-weight-bold black--text">About Me</h2>
          <div class="icons">
            <v-tooltip v-for="({name, icon}, idx) in allProficiencies" :key="idx" bottom>
              <template slot="activator">
                <img :src="icon"/>
              </template>
              <span>{{ name }}</span>
            </v-tooltip>
          </div>
          <div class="about-me--content-wrapper" v-html="about_me"></div>
        </section>
      </v-container>

    </main>
  </v-app>
</template>

<script>
import mkdn from "markdown-it";

import CSharpIcon from "~/assets/icons/csharp.svg";
import NodeJSIcon from "~/assets/icons/nodejs.svg";
import JSIcon from "~/assets/icons/javascript.svg";
import AWSIcon from "~/assets/icons/aws.svg";

export default {
  data () {
    return {
      gradients: [["#834D9B", "#D04ED6"], ["#1CD8D2", "#93EDC7"]],
      clipAngle: 5.75,
      languages: [
        {name: "C#", icon: CSharpIcon},
        {name: "NodeJS", icon: NodeJSIcon},
        {name: "Javascript", icon: JSIcon},
      ],
      skills: [
        {name: "AWS", icon: AWSIcon}
      ],
    }
  },
  async asyncData (ctx) {
    const { data: { data } } = await ctx.$axios.get(
      `https://directus.benfleming.io/_/items/homepage/1`
    )
    data.about_me = new mkdn().render(data.about_me);
    return { ...data }
  },
  computed: {
    allProficiencies() { 
      return [...this.languages, ...this.skills] 
    },
  }
};
</script>

<style lang="stylus" scoped>
$img-blur = 15px
$keyframe-name = pulse

@keyframes {$keyframe-name}
  for i in 0..10
    {10% * i}
      filter: grayscale(75%) blur($img-blur) brightness(0.6) hue-rotate(((360/10)*i)deg)

header
  width: 100%
  position: relative
  overflow: hidden
  &:not(:first-child)
    margin-top: -100px
  .header--content-wrapper
    background-size: 0
    z-index: 0
    > .v-image
      position: absolute
      top: -1*$img-blur
      left: -1*$img-blur
      width: "calc(100% + (%s * 2))" % ($img-blur)
      height: "calc(100% + (%s * 2))" % ($img-blur)
      animation: $keyframe-name 15s infinite
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
.home
  background: linear-gradient(to bottom right, #c6ffdd, #fbd786, #f7797d)
  width: 100vw
  height: 100vh
.about-me
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .about-me--content-wrapper
    font-size: 32px
    strong
      padding: 0 5px
  .icons
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
  h2
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