import { EventBind, createEl } from "../common/common.js";

export default function Todo({ id, title, tag, created_at, updated_at, datas }) {
    const createTodo = () => {
        const $resultElement = createEl('div')('todo__wrap');
        $resultElement.setAttribute('id', id)

        setChildElement($resultElement, {
            $checkbox: ctrateTodoCheckbox(),
            $title: createTodoTitle(),
            $tag: createTagList(),
            $todoDate: createTodoDateWrap(),
            $deleteBtn: createDeleteBtn()
        })
        return $resultElement
    }

    const setChildElement = ($target, { $checkbox, $tag, $title, $todoDate, $deleteBtn }) => {
        $target.append($checkbox)
        $target.append($title)
        $target.append($tag)
        $target.append($todoDate)
        $target.append($deleteBtn)

        EventBind($checkbox)('change')(checkBoxClickEvent($target))
        EventBind($deleteBtn)('click')(deleteBtnClickEvent($target))
    }

    const ctrateTodoCheckbox = () => {
        const $checkbox = createEl('input')();
        $checkbox.setAttribute('type', 'checkbox')
        return $checkbox;
    }

    const checkBoxClickEvent = $target => {
        return event => {
            const { target: { checked } } = event;
            checked ? $target.classList.add('todo__done') : $target.classList.remove('todo__done')
        }
    }

    const deleteBtnClickEvent = $target => {
        return event => {
            if (!confirm('정말 삭제하시겠습니까?')) return;
            $target.remove()
        };
    }

    const createTodoTitle = () => {
        const $title = createEl('span')('todo__title');
        $title.innerText = title;
        return $title;
    }

    const createTagList = () => {
        const $tags = createEl('div')('todo__tags');
        tag.forEach(tagedId => {
            const $tag = createEl('div')('todo__tag');
            const tagedTodo = datas.find(data => data.id === tagedId);
            $tag.innerText = `@${tagedTodo.title}`;
            $tag.setAttribute('tag', tagedTodo.id)
            $tags.append($tag)
        })
        return $tags;
    }

    const createTodoDateWrap = () => {
        const $dateWrap = createEl('div')('todo__date_wrap');

        const $updatedDate = createEl('div')('todo__date_updated');
        $updatedDate.innerText = `updated at: ${updated_at}`;

        const $createdDate = createEl('div')('todo__date_created');
        $createdDate.innerText = `created at: ${created_at}`;

        $dateWrap.append($updatedDate)
        $dateWrap.append($createdDate)
        return $dateWrap
    }

    const createDeleteBtn = () => {
        const $deleteBtn = createEl('i')('todo__delete');
        $deleteBtn.innerText = 'delete';
        return $deleteBtn
    }

    return createTodo();
}