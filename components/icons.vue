<template>
  <div class="icon-list">
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
  props: ["icons"],
}
</script>

<style lang="stylus" scoped>
.icon-list
  display: flex
  padding: 10px 0px 20px
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
