import Typed from "typed.js"

import { $qs } from "./_utils"

const jokes = [
    "You could write your dad jokes on paper...",
    "...but then they'd be tearable!"
]

const options = {
    strings: jokes,
    startDelay: 100,
    typeSpeed: 50,
    backSpeed: 10,
    backDelay: 3000,
    loop: true,
    showCursor: false
}

const typedClassname = ".typed-joke"

export default () => {
    $qs(typedClassname).textContent = ""

    const _ = new Typed(typedClassname, options)
}
