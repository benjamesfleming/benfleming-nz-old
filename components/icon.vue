<template>
  <v-tooltip bottom>
    <template slot="activator">
      <img :src="src"/>
    </template>
    <span>{{ alt }}</span>
  </v-tooltip>
</template>

<script>
export default {

  /**
   * Component Props
   * an array of valid prop names
   */
  props: { alt: String, src: String },
}
</script>

<style lang="stylus" scoped>

</style>
