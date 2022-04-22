import { createEl, EventBind } from "./common/common.js";
import SearchArea from "./components/SearchArea.js";
import Todo from "./components/Todo.js"

export const app = function () {
    const $contentsWrapper = document.querySelector('.contents__wrap');
    const SHOW_TODOS_NUMBER_IN_PAGE = 5;

    const EventBinder = EventBind($contentsWrapper);

    EventBinder('click')(({ target }) => {
        if (checkTagClick(target)) {
            const id = target.getAttribute('tag')
            const $target = [...document.querySelectorAll('.todo__wrap')]
                .find(el => el.getAttribute('id') === id)
            shakeTarget($target)
        }
    })

    const shakeTarget = target => {
        target.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(7px)' },
            { transform: 'translateX(-7px)' },
            { transform: 'translateX(7px)' },
            { transform: 'translateX(-7px)' },
            { transform: 'translateX(7px)' },
            { transform: 'translateX(0)' },
        ], 500);
    }

    EventBinder('input')(({ target }) => {
        if (checkSearchInput(target)) {
            const { value } = target;
            reRenderTodoList(value)
        }
    })

    const reRenderTodoList = value => {
        const filterData = value === '' ? datas : datas.filter(data => data.title.includes(value))
        currentData = filterData
        renderTodoList(filterData);
    }

    EventBinder('click')(({ target }) => {
        if (checkSearchButtonClick(target)) {

        }
    })

    EventBinder('change')(({ target }) => {
        if (checkBoxClick(target)) {
            checkBoxClickEvent(target)
        }
    })

    EventBinder('click')(({ target }) => {
        if (checkDelteBtnClick(target)) {
            deleteBtnClickEvent(target)
        }
    })

    EventBinder('click')(({ target }) => {
        if (checkPageClick(target)) {
            paging(target.innerText * 1 - 1)
            reRenderTodoList(document.querySelector('.search__input').value)
        }
    })


    const checkBoxClickEvent = target => {
        const { checked } = target
        const TodoElemtnt = target.closest('.todo__wrap')
        const tagedIds = [...TodoElemtnt.querySelectorAll('.todo__tag')].map(tagEl => tagEl.getAttribute('tag'))

        const allTodos = [...document.querySelectorAll('.todo__wrap')]

        const beforCompleteTags = allTodos.filter(
            todo => tagedIds.includes(todo.getAttribute('id')) && !todo.classList.contains('todo__done')
        )

        if (beforCompleteTags.length > 0)
            shakeTarget(TodoElemtnt)

        checked ?
            beforCompleteTags.length === 0 ?
                TodoElemtnt.classList.add('todo__done') : target.checked = false
            : TodoElemtnt.classList.remove('todo__done')


    }

    const deleteBtnClickEvent = target => {
        const TodoElemtnt = target.closest('.todo__wrap')
        if (!confirm('정말 삭제하시겠습니까?')) return;
        TodoElemtnt.remove()
    }


    const checkMatchTarget = selector => target => target.matches(selector)
    const checkSearchInput = checkMatchTarget('.search__input');
    const checkSearchButtonClick = checkMatchTarget('.search__btn');
    const checkTagClick = checkMatchTarget('.todo__tag');
    const checkBoxClick = checkMatchTarget('.todo__input');
    const checkDelteBtnClick = checkMatchTarget('.todo__delete');
    const checkPageClick = checkMatchTarget('.paging__page');

    const render = () => {
        $contentsWrapper.append(SearchArea())
        const $todoList = document.createElement('div')
        $todoList.classList.add('todo__List_wrap')
        $contentsWrapper.append($todoList)
        const $paging = document.createElement('div')
        $paging.classList.add('paging__wrap')
        $contentsWrapper.append($paging)
        renderTodoList(datas)
    }

    const renderTodoList = (datas) => {
        const $todoList = document.querySelector('.todo__List_wrap')
        $todoList.innerHTML = '';

        datas.filter((_, index) => index >= paging() * SHOW_TODOS_NUMBER_IN_PAGE && index < ((paging() + 1) * SHOW_TODOS_NUMBER_IN_PAGE)).
            forEach(data => $todoList.appendChild(Todo({ ...data, datas })))

        renderPaging(datas.length)
    }

    const renderPaging = (todoNum) => {
        const $paging = document.querySelector('.paging__wrap')
        $paging.innerHTML = '';
        const pageNumbering = new Array(Math.floor((todoNum - 1) / SHOW_TODOS_NUMBER_IN_PAGE) + 1).fill(0).map((_, i) => (i + 1))

        pageNumbering.forEach(index => {
            const $page = createEl('span')('paging__page')
            $page.innerText = index
            $paging.append($page)
        })

        const pagElArr = [...document.querySelectorAll('.paging__page')]
        pagElArr.forEach($el => $el.classList.remove('paging__current'))
        pagElArr.find($el => $el.innerText == paging() + 1).classList.add('paging__current')
    }

    const paging = (() => {
        let currentPage = 0;
        return (init) => {
            currentPage = init ?? currentPage;
            return currentPage;
        }
    })()

    return render();
}

let datas = [
    { id: 1, title: '청소하기', tag: [3, 5, 6], created_at: '20220401', updated_at: '20220421' },
    { id: 2, title: '공부하기', tag: [], created_at: '20220402', updated_at: '20220416' },
    { id: 3, title: '책상치우기', tag: [2], created_at: '20220403', updated_at: '20220414' },
    { id: 4, title: '설거지하기', tag: [], created_at: '20220404', updated_at: '20220416' },
    { id: 5, title: '쓰레기버리기', tag: [2], created_at: '20220405', updated_at: '20220421' },
    { id: 6, title: '물걸레질하기', tag: [2], created_at: '20220406', updated_at: '20220418' },
    { id: 7, title: '점심먹기', tag: [], created_at: '20220406', updated_at: '20220418' },
    { id: 8, title: '집에 가는길에 병원들리기', tag: [], created_at: '20220406', updated_at: '20220418' },
    { id: 9, title: '운동하기', tag: [], created_at: '20220406', updated_at: '20220418' },
    { id: 10, title: '세수하기', tag: [6], created_at: '20220406', updated_at: '20220418' },
    { id: 10, title: '세수하기', tag: [6], created_at: '20220406', updated_at: '20220418' },
]

let currentData =[]