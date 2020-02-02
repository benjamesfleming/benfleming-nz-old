import Vue from "vue"

const BREAKPOINT_MATRIX = [
    [600, "xs"],
    [960, "sm"],
    [1264, "md"],
    [9999, "xl"]
]

const BreakpointsPlugin = () => {}

BreakpointsPlugin.install = Vue => {
    Vue.prototype.$breakpoints = {
        /**
         * Get the name of the current breakpoint
         */
        get name() {
            if (!process.client) return BREAKPOINT_MATRIX[0][1]

            for (let [size, name] of BREAKPOINT_MATRIX) {
                if (window.innerWidth < size) {
                    return name
                }
            }

            return "xs"
        }
    }
}

Vue.use(BreakpointsPlugin)
