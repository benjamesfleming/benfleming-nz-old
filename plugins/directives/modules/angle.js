import Vue from "vue"

const updateUI = (el, binding, wrapper) => {
    const sq = x => Math.pow(x, 2)

    let angleA = binding.value * (Math.PI / 180)
    let angleB = 90 * (Math.PI / 180)
    let angleC = Math.PI - angleB - angleA

    let sideC = wrapper.clientWidth
    let sideA = (sideC * Math.sin(angleA)) / Math.sin(angleC)
    let sideB = Math.sqrt(
        sq(sideA) + sq(sideC) - 2 * sideA * sideC * Math.cos(angleB)
    )

    let maxHeight = wrapper.offsetHeight * 0.125
    if (sideA > maxHeight) {
        sideB = Math.sqrt(
            sq(maxHeight) + sq(sideC) - 2 * maxHeight * sideC * Math.cos(angleB)
        )

        angleA = Math.acos(
            (sq(sideB) + sq(sideC) - sq(maxHeight)) / (2 * sideB * sideC)
        )
        angleC = Math.PI - angleB - angleA

        sideA = (sideC * Math.sin(angleA)) / Math.sin(angleC)
    }

    wrapper.style.clipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${sideA}px), 0% 100%)`
    el.style.filter = "drop-shadow(0 5px 3px rgba(0, 0, 0, 0.4))"

    const sibling = el.nextElementSibling
    if (sibling) {
        sibling.style.marginTop = `-${sideA}px`
        sibling.style.paddingTop = `calc(${sideA}px + 14px)`
    }
}

const options = {
    bind(el, binding) {
        const wrapper = window.document.createElement("div")
        wrapper.id =
            "v-angle-wrapper--" + Math.round(Math.random() * (100 - 0) + 0)

        wrapper.append(...el.childNodes)
        el.prepend(wrapper)

        Vue.nextTick(() => updateUI(el, binding, wrapper))
        window.addEventListener("resize", () => updateUI(el, binding, wrapper))
    },
    unbind() {
        window.removeEventListener("resize", () => updateUI())
    }
}

export default ["angle", options]
