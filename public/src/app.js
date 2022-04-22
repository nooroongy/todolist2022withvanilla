import { EventBind } from "./common/common.js";
import SearchArea from "./components/SearchArea.js";
import Todo from "./components/Todo.js"

export const app = function () {
    const $contentsWrapper = document.querySelector('.contents__wrap');

    const EventBinder = EventBind($contentsWrapper);

    EventBinder('click')(({ target }) => {
        if (checkTagClick(target)) {
            const id = target.getAttribute('tag')
            const $target = [...document.querySelectorAll('.todo__wrap')]
                .find(el => el.getAttribute('id') === id)
            $target.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(7px)' },
                { transform: 'translateX(-7px)' },
                { transform: 'translateX(7px)' },
                { transform: 'translateX(-7px)' },
                { transform: 'translateX(7px)' },
                { transform: 'translateX(0)' },
            ], 500);
        }
    })

    EventBinder('input')(({ target }) => {
        if (checkSearchInput(target)) {
            const { value } = target;
            const filterData = value === '' ? datas : datas.filter(data => data.title.includes(value))
            renderTodoList(filterData);
        }
    })

    EventBinder('click')(({ target }) => {
        if (checkSearchButtonClick(target)) {

        }
    })


    const checkMatchTarget = selector => target => target.matches(selector)
    const checkSearchInput = checkMatchTarget('.search__input');
    const checkSearchButtonClick = checkMatchTarget('.search__btn');
    const checkTagClick = checkMatchTarget('.todo__tag');

    const render = () => {
        $contentsWrapper.append(SearchArea())
        const $todoList = document.createElement('div')
        $todoList.classList.add('todo__List_wrap')
        $contentsWrapper.append($todoList)
        renderTodoList(datas)
    }

    const renderTodoList = (datas) => {
        const $todoList = document.querySelector('.todo__List_wrap')
        $todoList.innerHTML = '';
        datas.forEach(data => $todoList.appendChild(Todo({ ...data, datas })))

    }


    return render();
}

let datas = [
    { id: 1, title: '청소하기', tag: [3, 5, 6], created_at: '20220421', updated_at: '20220421' },
    { id: 2, title: '공부하기', tag: [], created_at: '20220421', updated_at: '20220421' },
    { id: 3, title: '책상치우기', tag: [1], created_at: '20220421', updated_at: '20220421' },
    { id: 4, title: '설거지하기', tag: [], created_at: '20220421', updated_at: '20220421' },
    { id: 5, title: '쓰레기버리기', tag: [1], created_at: '20220421', updated_at: '20220421' },
    { id: 6, title: '물걸레질하기', tag: [1], created_at: '20220421', updated_at: '20220421' },
]