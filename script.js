const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || []
const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks))

let tasks = getTasks()
let taskId = 0

const taskInput = document.getElementById('task-input')
const addTaskBtn = document.getElementById('add-task')
const taskListElement = document.getElementById('list')

addTaskBtn.addEventListener('click', () => {
  if(!!taskInput.value) {
    tasks.push({ task: taskInput.value, id: ++taskId })

    showTasks()
    saveTasks()
    taskInput.value = ''
  }
})

taskListElement.addEventListener('click', (e) => {
  if(e.target.innerText === 'Delete') {
    tasks = tasks.filter(task => task.id != e.target.parentNode.id) 
    showTasks()
    saveTasks()
  }

  if(e.target.innerText == 'Edit') {
    taskInput.value = e.target.parentNode.innerText.replace('Edit Delete','')
    tasks = tasks.filter(task => task.id != e.target.parentNode.id) 
    showTasks()
    saveTasks()
  }
})

const showTasks = () => {
  taskListElement.innerHTML = tasks.map(({ task, id }) => { 
    return `<li id="${id}">
      <span>${task}</span>
      <button>Edit</button> 
      <button>Delete</button>
    </li>`
  }).reverse().join('')
}

showTasks()
saveTasks()         