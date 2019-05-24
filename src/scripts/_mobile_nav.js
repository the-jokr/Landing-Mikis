import { $qs, toggleClass, $qsa, addClass, removeClass } from "./_utils"

const $menuTrigger = $qs(".hamburger")
const $header = $qs("header")

let isOpen = false

const openMenuSequence = () => {
    // Animate hamburger icon
    addClass($menuTrigger, "is-active")
    $menuTrigger.setAttribute("aria-expanded", true)

    // Open menu
    addClass($header, "is-open")

    // Prevent scrolling
    $qs("body").style.overflow = "hidden"
}

const closeMenuSequence = () => {
    // Animate hamburger icon
    removeClass($menuTrigger, "is-active")
    $menuTrigger.setAttribute("aria-expanded", false)

    // Close menu
    removeClass($header, "is-open")

    // Enable scrolling
    $qs("body").style.overflow = "auto"
}

const toggleMenu = () => {
    // Update state
    isOpen = !isOpen

    // Don't animate links if menu is not open
    if (!isOpen) return closeMenuSequence()

    openMenuSequence()

    // Stagger nav link animation
    $qsa(".nav-link").forEach(($link, index, all) => {
        const animationName = "fadeInDown"
        const totalAnimationDuration = 200
        const animationDelay = totalAnimationDuration / all.length
        const staggeredDelay =
            index === 0 ? index : (index + 1) * animationDelay

        addClass($link, animationName)
        $link.style.animationDelay = `${staggeredDelay}ms`

        if (!isOpen) removeClass($link, animationName)
    })
}

export default () => {
    $menuTrigger.addEventListener("click", toggleMenu)
}
