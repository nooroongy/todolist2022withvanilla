export const EventBind = $element => eventName => callback => $element.addEventListener(eventName, callback)

export const createEl = tagName => className => {
    const $element = document.createElement(tagName);
    if (className)
        $element.classList.add(className)
    return $element;
}
