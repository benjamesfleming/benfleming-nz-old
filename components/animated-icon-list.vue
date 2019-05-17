<template>
  <div class="list">
    
    <template
      v-for="idx in 5" 
    >
      <v-animated-icon 
        :icons="icons" 
        :side="showIconMap[idx - 1]"
        :key="idx" 
      />
      <div class="divider" :key="idx + .5"></div>
    </template>
  </div>
</template>

<script>
import AnimatedIcon from "./animated-icon.vue";

export default {
  name: "v-animated-icon-list",

  /**
   * Component Depenencies
   * all the other componets this one relies on
   */
  components: {
    "v-animated-icon": AnimatedIcon,
  },

  /**
   * Component Props
   * an object of valid prop names
   */
  props: {
    icons: Array,
    interval: Number
  },

  /**
   * Component Data
   * an inital data set
   */
  data() {
    return {
      showIconMap: [
        0, 1, 2, 3, 4
      ],
      hiddenIcon: 5, 
      lastAnimatedBox: 0,
      lastAnimatedBoxTime: 0
    };
  },

  /**
   * Component Methods
   * all component methods
   */
  methods: {

    getNextBoxIdx() {
      let boxIdx = Math.floor(Math.random() * 5);
      if (boxIdx == this.lastAnimatedBox)
        boxIdx = (boxIdx == 5 ? 0 : boxIdx + 1);
      return boxIdx;
    },

    tick(timestamp) {
      if (timestamp - this.lastAnimatedBoxTime >= this.interval) {
        const boxIdx = this.getNextBoxIdx();
        const newHiddenIcon = this.showIconMap[boxIdx];

        this.$set(
          this.showIconMap, boxIdx, this.hiddenIcon
        );

        this.lastAnimatedBox = boxIdx;
        this.lastAnimatedBoxTime = timestamp;
        this.hiddenIcon = newHiddenIcon;
      }

      requestAnimationFrame(this.tick);
    }
  },

  /**
   * Component Mounted
   * a method to run when the component has been mounted
   */
  mounted() {
    requestAnimationFrame(this.tick);
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl'

.list
  display flex
  justify-content space-between
  max-width 75%
  width 100%

  @media screen and (max-width $breakpoint-md)
    max-width 85%
  @media screen and (max-width $breakpoint-sm)
    max-width 100%
    
  > .rotating-cube
    position: relative;

  > .divider
    margin 18px 0
    width 6px
    background-color rgba(#444, 0.1)

    @media screen and (max-width $breakpoint-sm)
      display none

  > .divider:last-child
    display: none
</style>
