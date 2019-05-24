import { $qs } from "./_utils"

class Carousel {
    constructor() {
        this.$ = $qs(".carousel")
        this.$viewport = this.$.$qs(".viewport")
        this.$slide = this.$viewport.$qs(".slide")

        this.currentPosition = 0
        this.contentLength = this.$slide.$qsa(".content").length

        this.$viewport.addEventListener(
            "click",
            this.handleNavigationEvent.bind(this)
        )
    }

    updateCurrentPosition(newPosition) {
        // If the new position is < 0
        if (newPosition < 0) {
            this.currentPosition = this.contentLength - 1
            return
        }

        // If the new position is >= contentLength
        if (newPosition >= this.contentLength) {
            this.currentPosition = 0
            return
        }

        this.currentPosition = newPosition
    }

    getFormattedPosition() {
        return this.currentPosition === 0
            ? `0`
            : `-${this.currentPosition * 100}%`
    }

    handleNavigationEvent({ target, clientX }) {
        const { left, width } = target.getBoundingClientRect()
        const x = clientX - left

        if (x < width / 2) {
            return this.next()
        }

        this.previous()
    }

    next() {
        this.updateCurrentPosition(this.currentPosition + 1)
        this.$slide.style.left = this.getFormattedPosition()
    }

    previous() {
        this.updateCurrentPosition(this.currentPosition - 1)
        this.$slide.style.left = this.getFormattedPosition()
    }
}

export default () => {
    new Carousel()
}
