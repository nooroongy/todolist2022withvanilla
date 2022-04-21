import Todo from "./components/todo.js"

export const app = function () {
    const contentsWrapper = document.querySelector('.contents__wrap');
    datas.forEach(data => contentsWrapper.appendChild(Todo({ ...data })))
}

const datas = [
    {id:'1', title: '청소하기', tag: ['3','5','6'], created_at: '20220421', updated_at: '20220421' },
    {id:'2', title: '공부하기', tag: [], created_at: '20220421', updated_at: '20220421' },
    {id:'3', title: '책상치우기', tag: [], created_at: '20220421', updated_at: '20220421' },
    {id:'4', title: '설거지하기', tag: [], created_at: '20220421', updated_at: '20220421' },
    {id:'5', title: '쓰레기버리기', tag: [], created_at: '20220421', updated_at: '20220421' },
    {id:'6', title: '물걸레질하기', tag: [], created_at: '20220421', updated_at: '20220421' },
]