<template>
  <div class="icon-list" :style="{'--icon-list-scale': scale || 1}">
    <v-tooltip v-for="(i, idx) in icons" :key="idx" bottom>
      <template slot="activator">
        <img :src="i.directus_files_id.data.full_url"/>
      </template>
      <span>{{ i.directus_files_id.title }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: { icons: Array, scale: Number },
}
</script>

<style lang="stylus" scoped>
.icon-list
  display: flex
  span
    position: relative
    filter: drop-shadow(3px 3px 4px #aaaaaa)
    margin: 0 calc(var(--icon-list-scale) * 25px) 0
    &:not(:last-child)
      &::after
        content: ""
        position: absolute
        background: rgba(#222222, 0.8)
        width: calc(var(--icon-list-scale) * 5px)
        top: calc(var(--icon-list-scale) * 12px)
        bottom: calc(var(--icon-list-scale) * 12px)
        right: calc(var(--icon-list-scale) * -27.5px)
  img
    width: calc(var(--icon-list-scale) * 64px)
</style>
