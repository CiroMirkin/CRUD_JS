let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let taskId = 0

const taskInput = document.getElementById('task-input')
const addTaskBtn = document.getElementById('add-task')
const taskListElement = document.getElementById('list')

addTaskBtn.addEventListener('click', () => {
  if(!!taskInput.value) {
    tasks.push({ task: taskInput.value, id: ++taskId })

    showTasks()
    taskInput.value = ''
  }
})

taskListElement.addEventListener('click', (e) => {
  if(e.target.innerText === 'Delete') {
    tasks = tasks.filter(task => task.id != e.target.parentNode.id) 
    showTasks()
  }

  if(e.target.innerText == 'Edit') {
    taskInput.value = e.target.parentNode.innerText.replace('Edit Delete','')
    tasks = tasks.filter(task => task.id != e.target.parentNode.id) 
    showTasks()
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
  
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

showTasks()         