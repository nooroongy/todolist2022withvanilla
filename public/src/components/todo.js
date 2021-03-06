import { EventBind, createEl } from "../common/common.js";

export default function Todo({ id, title, tag, created_at, updated_at, datas }) {
    const createTodo = () => {
        const $resultElement = createEl('div')('todo__wrap');
        $resultElement.setAttribute('id', id)

        setChildElement($resultElement, {
            $checkbox: ctrateTodoCheckbox(),
            $title: createTodoTitle(),
            // $tag: createTagList(),
            $todoDate: createTodoDateWrap(),
            $deleteBtn: createDeleteBtn()
        })
        return $resultElement
    }

    const setChildElement = ($target, { $checkbox,  $title, $todoDate, $deleteBtn }) => {
        $target.append($checkbox)
        $target.append($title)
        $target.append($todoDate)
        $target.append($deleteBtn)

    }

    const ctrateTodoCheckbox = () => {
        const $checkbox = createEl('input')('todo__input');
        $checkbox.setAttribute('type', 'checkbox')
        return $checkbox;
    }

    const createTodoTitle = () => {
        const $title = createEl('span')('todo__title');
        $title.innerText = title;
        $title.append(createTagList())
        return $title;
    }

    const createTagList = () => {
        const $tags = createEl('span')('todo__tags');
        tag.forEach(tagedId => {
            const $tag = createEl('span')('todo__tag');
            const tagedTodo = datas.find(data => data.id === tagedId);
            if(tagedTodo){
                $tag.innerText = `@${tagedTodo?.title}`;
                $tag.setAttribute('tag', tagedTodo?.id)
                $tags.append($tag)
            }
        })
        return $tags;
    }

    const createTodoDateWrap = () => {
        const $dateWrap = createEl('div')('todo__date_wrap');

        const $updatedDate = createEl('div')('todo__date_updated');
        $updatedDate.innerText = `updated at: ${makingDate(updated_at)}`;

        const $createdDate = createEl('div')('todo__date_created');
        $createdDate.innerText = `created at: ${makingDate(created_at)}`;

        $dateWrap.append($updatedDate)
        $dateWrap.append($createdDate)
        return $dateWrap
    }

    const makingDate = date => `${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)}`

    const createDeleteBtn = () => {
        const $deleteBtn = createEl('i')('todo__delete');
        $deleteBtn.innerText = 'delete';
        return $deleteBtn
    }

    return createTodo();
}