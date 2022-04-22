import { createEl } from "../common/common.js";

export default function SearchArea() {
    const createSearch = () => {
        const $resultElement = createEl('div')('search__wrap');

        setChildElement($resultElement, {
            $input: ctrateSearchInput(),
            $button: createButton(),
        })
        return $resultElement
    }

    const setChildElement = (target, { $input, $button }) => {
        target.append($input);
        target.append($button);

    }
    const ctrateSearchInput = () => {
        const $resultElement = createEl('input')('search__input');
        $resultElement.setAttribute('placeholder','Search Todo...')
        return $resultElement
    }
    const createButton = () => {
        const $resultElement = createEl('button')('search__btn');
        $resultElement.innerText = 'Add Todo'
        return $resultElement

    }
    return createSearch()
}