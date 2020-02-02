<template>
<fragment>
    <!-- Page Header -->
    <bf-header />
    <bf-header-divider />

    <!-- Page Content -->
    <v-container fluid style="max-width: 1024px;">

        <!-- About Me Section -->
        <section class="section about-me">
            <h2 class="section--heading">About Me</h2>
                
            <bf-devicon-list
            :interval="3000"
                    :box-count="iconCount"
            :size="iconScale"
                    :icons="[
                        'Amazon Web Services',
                        'C-Sharp',
                        'Git',
                        'NodeJS',
                        'JavaScript',
                        'MySQL'
                    ]"
            />

            <div class="section--content-wrapper">
                <p>
                    Hey there... I'm
                    <strong>Ben Fleming</strong>, a passionate
                    <em>Web &amp; Software</em> developer. I have a keen interest in
                    all things tech. I have become proficient in languages including
                    <strong>HTML</strong>, <strong>CSS</strong>,
                    <strong>Javascript</strong>, <strong>VueJS</strong> and others.
                </p>
                <p>
                    I also like to keep an eye on all areas of
                    <strong> <em>I.T.</em> </strong>, having played around with <strong>AWS</strong>,
                    <strong>Azure</strong>, <strong>Serverless</strong>, etc.
                </p>
            </div>

        </section>

        <!-- My Project Section -->
        <section class="section my-projects">
            <h2 class="section--heading">My Projects</h2>
            <div class="my-projects--grid">

            <bf-project-card
                v-for="(project, idx) in content.projects"
                :key="idx"
                        :value="project"
            />

            <v-card
                class="my-projects-placeholder hidden-xs-only"
                elevation="0"
            >
                <span class="display-3 font-weight-bold">
                    MORE COMING SOON
                </span>
            </v-card>
                    
            </div>
        </section>

    </v-container>

    <!-- Page Footer -->
    <bf-footer />
</fragment>
</template>

<script>
import DeviconList from "~/components/devicons/list.vue"
import ProjectCard from "~/components/project-card.vue"
import Header from "~/components/index/header.vue"
import HeaderDivider from "~/components/index/header-divider.vue"
import Footer from "~/components/index/footer.vue"
import getProjects from "~/content/getProjects.js"

export default {
    /**
     * Page Head Options
     * set all the nessary <head> options
     */
    layout: "index",
    head() {
        return {
            titleTemplate: `home %s`
        }
    },

    /**
     * Page Depenencies
     * all the other componets this page relies on
     */
    components: {
        "bf-devicon-list": DeviconList,
        "bf-project-card": ProjectCard,
        "bf-header": Header,
        "bf-header-divider": HeaderDivider,
        "bf-footer": Footer
    },

    /**
     * Async Data (NUXT)
     * get the api data while on the server, and render the inital html
     */
    async asyncData() {
        const projects = await getProjects()

        return {
            content: { projects }
        }
    },

    /**
     * Page Data
     * inital page starting data
     */
    data() {
        return {
            content: {
                projects: []
            }
        }
    },

    /**
     * Page Computed Date
     * dynamic data to render on the page
     */
    computed: {
        iconCount() {
            return this.$breakpoints.name == "xs" ? 4 : 5
        },
        iconScale() {
            return this.$breakpoints.name == "xs" ? "md" : "lg"
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl';

.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &--content-wrapper {
        width: 100%;
        font-size: 32px;
        margin-top: 20px;

        @media screen and (max-width: $breakpoint-sm) {
            font-size: 22px;
        }

        strong {
            padding: 0 5px;
        }
    }

    &--heading {
        letter-spacing: 0.1em !important;
        filter: drop-shadow(3px 3px 4px #aaaaaa);
        display: inline;
        padding: 10px;
        color: #222 !important;
        position: relative;
        white-space: nowrap;
        font-size: 56px;
        font-weight: bold;

        @media screen and (max-width: $breakpoint-sm) {
            font-size: 36px;
        }

        &::before {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 5px;
            right: 5px;
            height: 10px;
            background-color: rgba(#444, 0.1);
            transform: translate(0, -22px);

            @media screen and (max-width: $breakpoint-sm) {
                bottom: 0px;
            }
        }
    }

    .v-devicon-list {
        >>> &--icon {
            background: #fafafa;
        }
    }
}

.my-projects {
    .my-projects--grid {
        width: 100%;
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;

        @media screen and (max-width: $breakpoint-md) {
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: $breakpoint-sm) {
            grid-template-columns: 1fr;
        }
    }

    .my-projects-placeholder {
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            text-align: center;
            color: rgba(#444, 0.1);
            text-shadow: 1px 1px white, -1px -1px rgba(#444, 0.1);
        }
    }
}
</style>
