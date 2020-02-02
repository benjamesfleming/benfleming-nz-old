<template>
    <div :class="'bf-devicon bf-devicon--' + (size || 'md')">
        <div :class="`bf-devicon--cube show-${side}`">
            <div
                :class="`bf-devicon--cube__face bf-devicon--cube__face--${idx}`"
                v-for="(name, idx) in icons"
                :key="idx"
            >
                <img
                    :alt="name"
                    :src="
                        require(`~/assets/devicons/${formatName(name)}.svg?data`)
                    "
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    /**
     * Component Props
     * an object of valid prop names
     */
    props: {
        icons: Array,
        side: Number,
        size: String
    },

    /**
     * Component Methods
     * all the pages methods needed for dynamic content
     */
    methods: {
        formatName(name) {
            if (typeof name !== "string")
                throw new Error("[Devicons] Icon name must be a string.")

            return name
                .toString()
                .toLowerCase()
                .replace(/( |-){1,}/g, "")
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~assets/style/variables.styl'

* { box-sizing: border-box; }

bf-devicon($size, $name) {
    .bf-devicon--{$name} {
        width: $size;
        height: $size;
        perspective: $size * 2;
        box-sizing: content-box;
        background: $bg-color;

        .bf-devicon--cube {
            width: $size;
            height: $size;
            position: relative;
            background: inherit;
            transform-style: preserve-3d;
            transform: translateZ($size / 2 * -1);
            transition: transform 1.5s ease-in-out;
        }

        .bf-devicon--cube.show-0 { transform: translateZ($size / 2 * -1) rotateY(   0deg); }
        .bf-devicon--cube.show-1 { transform: translateZ($size / 2 * -1) rotateY( -90deg); }
        .bf-devicon--cube.show-2 { transform: translateZ($size / 2 * -1) rotateY(-180deg); }
        .bf-devicon--cube.show-3 { transform: translateZ($size / 2 * -1) rotateY(  90deg); }
        .bf-devicon--cube.show-4 { transform: translateZ($size / 2 * -1) rotateX( -90deg); }
        .bf-devicon--cube.show-5 { transform: translateZ($size / 2 * -1) rotateX(  90deg); }

        .bf-devicon--cube__face {
            position: absolute;
            width: $size;
            height: $size;
            background: inherit;
            padding: 5px;
        }

        .bf-devicon--cube__face img {
            filter: drop-shadow(1px 1px 2px #aaaaaa);
        }

        .bf-devicon--cube__face--0 { transform: rotateY(  0deg) translateZ($size / 2); }
        .bf-devicon--cube__face--1 { transform: rotateY( 90deg) translateZ($size / 2); }
        .bf-devicon--cube__face--2 { transform: rotateY(180deg) translateZ($size / 2); }
        .bf-devicon--cube__face--3 { transform: rotateY(-90deg) translateZ($size / 2); }
        .bf-devicon--cube__face--4 { transform: rotateX( 90deg) translateZ($size / 2); }
        .bf-devicon--cube__face--5 { transform: rotateX(-90deg) translateZ($size / 2); }
    }
}

bf-devicon(95px, "lg");
bf-devicon(65px, "md");
bf-devicon(35px, "sm");

.bf-devicon--sm {
    .bf-devicon--cube__face { padding: 4px; }
}
</style>
