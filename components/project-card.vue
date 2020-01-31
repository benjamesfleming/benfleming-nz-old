<template>
  <v-card class="project-card">

    <!-- Card Image -->
    <div class="v-card-img">
      <img
        class="white--text"
        :alt="title + ' project showcase'"
        :srcset="require(`~/assets/images/${slug}.png`).srcSet"
      />
    </div>

    <!-- Card Text / Info -->
    <v-card-title>
      <div class="v-card-title">
        <span class="v-card-title--tagline">{{ tagline }}</span><br>
        <span class="v-card-title--title headline">{{ title }}</span>
      </div>
    </v-card-title>

    <!-- Card Actions -->
    <v-card-actions v-if="!hideActions">
      <a v-if="link" :href="link" target="_blank" rel="noopener" :aria-label="`Learn more about the ${title} project.`">
        <v-icon v-ripple>open_in_new</v-icon>
      </a>
      <v-spacer></v-spacer>
      <v-devicon-list
        :boxCount="3"
        :interval="-1"
        :icons="icons"
        size="sm"
      />
    </v-card-actions>

  </v-card>
</template>

<script>
import DeviconList from "~/components/devicon-list.vue";

export default {

  /**
   * Component Depenencies
   * all the other componets this one relies on
   */
  components: {
    "v-devicon-list": DeviconList,
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
      return ((this.value && this.value.data && this.value.data.icons) || [])
        .map(
          v => {
            const _temp = v.split('::');
            return {
              alt: _temp[0],
              src: require(`~/assets/devicons/${_temp[1]}.svg?data`)
            };
          }
        );
    },
    title () {
      return (this.value && this.value.data && this.value.data.title) || "Untitled";
    },
    tagline () {
      return (this.value && this.value.data && this.value.data.tagline) || "No Tagline Defined!";
    },
    slug () {
      return (this.value && this.value.data && this.value.data.slug) || false;
    },
    link () {
      return (this.value && this.value.data && this.value.data.link) || false;
    }
  },
}
</script>

<style lang="stylus" scoped>
.project-card
  .v-card-title
    &--tagline
      color #212121
  .v-card-img
    background-color rgba(#444, 0.1)
    > img
      border-radius 5px
      filter drop-shadow(0px 0px 5px rgba(#444, 0.5)) brightness(120%)
      width 80%
      margin 10% 10% 5%
  .v-devicon-list
    width auto
    >>> .v-devicon-list--icon
      background white
</style>
