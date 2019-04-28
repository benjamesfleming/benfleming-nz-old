<template>
  <v-card class="project-card">

    <!-- Card Image -->
    <v-img
      class="white--text"
      position="center 100%"
      height="200px"
      :src="image"
      contain
    ></v-img>

    <!-- Card Text / Info -->
    <v-card-title>
      <div>
        <span class="grey--text">{{ tagline }}</span><br>
        <span class="headline">{{ title }}</span>
      </div>
    </v-card-title>

    <!-- Card Actions -->
    <v-card-actions v-if="!hideActions">
      <a v-if="link" :href="link" target="_blank">
        <v-icon v-ripple>open_in_new</v-icon>
      </a>
      <v-spacer></v-spacer>
      <v-icons :icons="icons" scale="0.4"/>
    </v-card-actions>

  </v-card>
</template>

<script>
import Icons from "~/components/icons.vue";

export default {

  /**
   * Component Depenencies
   * all the other componets this one relies on
   */
  components: { "v-icons": Icons },

  /**
   * Component Props
   * an array of valid prop names
   */
  props: { value: Object, hideActions: Boolean },

  /**
   * Component Computed Values
   * all the dynamic values needed for the component, based off props
   */
  computed: {
    image () { 
      return (this.value && this.value.image && this.value.image.data && this.value.image.data.full_url) || "";
    },
    icons () {
      return (this.value && this.value.icons) || [];
    },
    title () {
      return (this.value && this.value.title) || "Untitled";
    },
    tagline () {
      return (this.value && this.value.tagline) || "No Tagline Defined!";
    },
    link () {
      return (this.value && this.value.link) || false;
    }
  }
}
</script>

<style lang="stylus" scoped>
.project-card
  >>> .v-image
    background-color: rgba(#444, 0.1)
</style>
