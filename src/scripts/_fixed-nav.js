import { $qs } from "./_utils"

let scrollPosition = pageYOffset

const updateNavBar = () => {
    const newScrollPosition = pageYOffset

    $qs("header").style.top =
        scrollPosition > newScrollPosition ? "0" : "-200px"

    scrollPosition = newScrollPosition
}

export default () => {
    addEventListener("scroll", updateNavBar)
}
