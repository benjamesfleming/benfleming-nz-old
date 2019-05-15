<template>
  <v-card class="project-card">

    <!-- Card Image -->
    <v-img
      class="white--text"
      position="center 100%"
      height="200px"
      :alt="title + ' project showcase'"
      :src="require(`~/assets/${image}`)"
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
      <a v-if="link" :href="link" target="_blank" rel="noopener" :aria-label="`Learn more about the ${title} project.`">
        <v-icon v-ripple>open_in_new</v-icon>
      </a>
      <v-spacer></v-spacer>
      <v-icon-list 
        v-for="(icon, idx) in icons" :key="idx" 
        scale="0.4"
      >
        <v-my-icon :alt="icon" :src="require(`~/assets/devicons/${icon}.svg`)"/>
      </v-icon-list>
    </v-card-actions>

  </v-card>
</template>

<script>
import IconList from "~/components/icon-list.vue";
import Icon from "~/components/icon.vue";

export default {

  /**
   * Component Depenencies
   * all the other componets this one relies on
   */
  components: {
    "v-icon-list": IconList,
    "v-my-icon": Icon
  },

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
      return (this.value && this.value.data && this.value.data.image) || "";
    },
    icons () {
      return (this.value && this.value.data && this.value.data.icons) || [];
    },
    title () {
      return (this.value && this.value.data && this.value.data.title) || "Untitled";
    },
    tagline () {
      return (this.value && this.value.data && this.value.data.tagline) || "No Tagline Defined!";
    },
    link () {
      return (this.value && this.value.data && this.value.data.link) || false;
    }
  }
}
</script>

<style lang="stylus" scoped>
.project-card
  >>> .v-image
    background-color: rgba(#444, 0.1)
</style>
