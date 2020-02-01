<template>
  <div class="v-devicon-list">
    <template v-for="(box, idx) in allBoxes">
      <bf-devicon :icons="box.icons" :side="box.side" :size="size" :key="idx" />
      <div class="v-devicon-list--divider" :key="idx + 0.5"></div>
    </template>
  </div>
</template>

<script>
import Devicon from "./icon.vue";

class Box {
  icons = [];
  side = 0;

  get currentIcon() {
    return this.icons[this.side];
  }

  constructor(icons, side) {
    this.icons = icons;
    this.side = side;
  }
}

export default {
  name: "bf-devicon-list",

  /**
   * Component Depenencies
   * all the other componets this one relies on
   */
  components: {
    "bf-devicon": Devicon
  },

  /**
   * Component Props
   * an object of valid prop names
   */
  props: {
    size: String,
    icons: Array,
    boxCount: Number,
    interval: Number
  },

  /**
   * Component Data
   * an inital data set
   */
  data() {
    const icons = Array.from(this.icons);
    const boxes = Array.from({ length: this.boxCount }).map(
      (_, idx) => new Box(Array.from(icons), idx)
    );

    return {
      allBoxes: boxes,
      hiddenIcons: icons.splice(this.boxCount, icons.length),
      lastAnimatedBox: 0,
      lastAnimatedBoxTime: 0
    };
  },

  /**
   * Component Methods
   * all component methods
   */
  methods: {
    getRandomInt(min, max, excludes = []) {
      let idx;
      while (idx == null || excludes.indexOf(idx) != -1) {
        idx = Math.floor(Math.random() * (max - min)) + min;
      }
      return idx;
    },

    tick(timestamp) {
      if (timestamp - this.lastAnimatedBoxTime >= this.interval) {
        const boxIndex = this.getRandomInt(0, this.boxCount, [
          this.lastAnimatedBox
        ]);
        const nextSide = this.getRandomInt(0, 5, [
          this.allBoxes[boxIndex].side
        ]);

        // add current side to hidden
        this.hiddenIcons.push(this.allBoxes[boxIndex].currentIcon);

        // update the boxs icons
        this.$set(
          this.allBoxes[boxIndex].icons,
          nextSide,
          this.hiddenIcons.shift()
        );

        // update the boxs current side
        this.allBoxes[boxIndex].side = nextSide;

        this.lastAnimatedBox = boxIndex;
        this.lastAnimatedBoxTime = timestamp;
      }

      requestAnimationFrame(this.tick);
    }
  },

  /**
   * Component Mounted
   * a method to run when the component has been mounted
   */
  mounted() {
    if (this.interval == -1) return;

    requestAnimationFrame(this.tick);
  }
};
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl'

.v-devicon-list
  display flex
  justify-content space-between
  max-width 75%
  width 100%

  @media screen and (max-width $breakpoint-md)
    max-width 85%
  @media screen and (max-width $breakpoint-sm)
    max-width 100%

  &--icon
    position relative

  &--divider
    margin 18px 0
    width 6px
    background-color rgba(#444, 0.1)

    @media screen and (max-width $breakpoint-sm)
      display none

  &--divider:last-child
    display none
</style>
