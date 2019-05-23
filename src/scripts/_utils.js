// DOM Selector Wrappers
export const $qs = document.querySelector.bind(document)
export const $qsa = document.querySelectorAll.bind(document)

Element.prototype.$qsa = function(...args) {
    return this.querySelectorAll.call(this, args)
}
Element.prototype.$qs = function(...args) {
    return this.querySelector.call(this, args)
}

// DOM Class Name Manipulation Wrappers
export const containsClass = ($el, className) =>
    $el.classList.contains(className)
export const toggleClass = ($el, className) => {
    $el.classList.toggle(className)
}
export const addClass = ($el, className) => {
    $el.classList.add(className)
}
export const removeClass = ($el, className) => {
    $el.classList.remove(className)
}
