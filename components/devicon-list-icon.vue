<template>
<div :class="'v-devicon-list--icon v-devicon-list--icon--' + (size || 'md')">
  <div 
    :class="`v-devicon-list--icon--cube show-${side}`"
  >
    <div 
      :class="`v-devicon-list--icon--cube__face v-devicon-list--icon--cube__face--${idx}`"
      v-for="(icon, idx) in icons" 
      :key="idx"
    >
      <img :alt="icon.alt" :src="icon.src"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "v-devicon-list-icon",

  /**
   * Component Props
   * an object of valid prop names
   */
  props: {
    icons: Array,
    side: Number,
    size: String
  },
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl'

* { box-sizing: border-box; }

v-devicon-list--icon($size, $name) {
  .v-devicon-list--icon--{$name} {
    width: $size;
    height: $size;
    perspective: $size * 2;
    box-sizing: content-box;
    background: white;

    .v-devicon-list--icon--cube {
      width: $size;
      height: $size;
      position: relative;
      background: inherit;
      transform-style: preserve-3d;
      transform: translateZ($size / 2 * -1);
      transition: transform 1.5s ease-in-out;
    }

    .v-devicon-list--icon--cube.show-0 { transform: translateZ($size / 2 * -1) rotateY(   0deg); }
    .v-devicon-list--icon--cube.show-1 { transform: translateZ($size / 2 * -1) rotateY( -90deg); }
    .v-devicon-list--icon--cube.show-2 { transform: translateZ($size / 2 * -1) rotateY(-180deg); }
    .v-devicon-list--icon--cube.show-3 { transform: translateZ($size / 2 * -1) rotateY(  90deg); }
    .v-devicon-list--icon--cube.show-4 { transform: translateZ($size / 2 * -1) rotateX( -90deg); }
    .v-devicon-list--icon--cube.show-5 { transform: translateZ($size / 2 * -1) rotateX(  90deg); }

    .v-devicon-list--icon--cube__face {
      position: absolute;
      width: $size;
      height: $size;
      background: inherit;
      padding: 5px;
    }

    .v-devicon-list--icon--cube__face img {
      filter: drop-shadow(1px 1px 2px #aaaaaa);
    }

    .v-devicon-list--icon--cube__face--0 { transform: rotateY(  0deg) translateZ($size / 2); }
    .v-devicon-list--icon--cube__face--1 { transform: rotateY( 90deg) translateZ($size / 2); }
    .v-devicon-list--icon--cube__face--2 { transform: rotateY(180deg) translateZ($size / 2); }
    .v-devicon-list--icon--cube__face--3 { transform: rotateY(-90deg) translateZ($size / 2); }
    .v-devicon-list--icon--cube__face--4 { transform: rotateX( 90deg) translateZ($size / 2); }
    .v-devicon-list--icon--cube__face--5 { transform: rotateX(-90deg) translateZ($size / 2); }
  }
}

v-devicon-list--icon(95px, "lg");
v-devicon-list--icon(65px, "md");
v-devicon-list--icon(35px, "sm");

.v-devicon-list--icon--sm {
  .v-devicon-list--icon--cube__face { padding: 4px; }
}
</style>
