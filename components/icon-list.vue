<template>
  <div class="icon-list" :style="{'--icon-list-scale': scale || 1}">
    <slot></slot>
  </div>
</template>

<script>
export default {

  /**
   * Component Props
   * an array of valid prop names
   */
  props: { scale: Number },
}
</script>

<style lang="stylus" scoped>
.icon-list
  display: flex
  margin: 0 0 20px 0
  >>> span
    position: relative
    filter: drop-shadow(3px 3px 4px #aaaaaa)
    margin: 0 calc(var(--icon-list-scale) * 15px) 0
    &:not(:last-child)
      &::after
        content: ""
        position: absolute
        background: rgba(#222222, 0.8)
        width: calc(var(--icon-list-scale) * 5px)
        top: calc(var(--icon-list-scale) * 12px)
        bottom: calc(var(--icon-list-scale) * 12px)
        right: calc(var(--icon-list-scale) * -17.5px)
  >>> img
    width: calc(var(--icon-list-scale) * 64px)
</style>
