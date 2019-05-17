<template>
  <div class="list">
    <v-animated-icon 
      v-for="idx in 5" 
      :key="idx" 
      :icons="icons" 
      :side="showIconMap[idx - 1]"
    />
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
      lastAnimatedBox: 0
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

    next() {
      const boxIdx = this.getNextBoxIdx();
      const newHiddenIcon = this.showIconMap[boxIdx];

      this.$set(
        this.showIconMap, boxIdx, this.hiddenIcon
      );
      this.lastAnimatedBox = boxIdx;
      this.hiddenIcon = newHiddenIcon;
    }
  },

  /**
   * Component Mounted
   * a method to run when the component has been mounted
   */
  mounted() {
    // self calling loop initiator
    (function tick(i, fn) {
      setTimeout(() => { fn(); tick(i, fn); }, i);
    })(this.interval || 3000, this.next);
  }
}
</script>

<style lang="stylus" scoped>
.list {
  display: flex;

  > .rotating-cube {
    position: relative;

    $margin = 50px;
    &:not(:last-child) {
      margin-right: $margin;

      &::after {
        content: "";
        position: absolute;
        top: 12px;
        bottom: 12px;
        right: (($margin / 2) + 2) * -1;
        width: 4px;
        background-color: #444;
      }
    }
  }
}
</style>
