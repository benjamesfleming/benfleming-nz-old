import Granim from "granim"
import Vue from "vue"

const options = {
    bind(el, binding) {
        console.log(process.client)
        if (!process.client) {
            return
        }
        // generate the canvas
        const canvas = window.document.createElement("canvas")
        canvas.id =
            "v-granim-canvas--" + Math.round(Math.random() * (100 - 0) + 0)

        // style the canvas
        canvas.style.position = "absolute"
        canvas.style.width = "100%"
        canvas.style.height = "100%"
        canvas.style.top = "0"
        canvas.style.left = "0"

        // style the parent
        el.style.position = "relative"
        el.prepend(canvas)

        // start the granim instance
        const options = {
            element: "#" + canvas.id,
            direction: "left-right",
            isPausedWhenNotInView: true,
            states: {
                "default-state": {
                    gradients: binding.value
                }
            }
        }
        Vue.nextTick(() => new Granim(options))
    }
}

export default ["granim", options]
