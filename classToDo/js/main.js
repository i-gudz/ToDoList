$(document).ready(function () {
    $('.datepicker').datepicker({format: 'yyyy-mm-dd'});
    $('.collapsible').collapsible();
    $('select').formSelect();
});

let date = new Date();

let taskList = [
    {
        title: "приготовить пирог",
        description: "сходить на кухню сделать пирог",
        date: "2019-09-03",
        priority: 5,
        done: true
    },

    {
        title: "сделать дз",
        description: "заверстать сайт",
        date: "2019-12-03",
        priority: 6,
        done: false
    },

    {
        title: "выгулять пса",
        description: "сходить на кухню сделать пирог",
        date: "2019-10-03",
        priority: 10,
        done: false
    }
],
    duplicateTaskList = taskList;

let renderTaskList = () => {
    let elementCollapse = document.getElementById('collapsible');
    let content = '';
    let dateFormate = date.getFullYear()+"-"+((date.getMonth()+1) >= 10 ? date.getMonth()+1: '0'+(date.getMonth() + 1))+"-"+date.getDate();

    taskList.map( (item, index) => {

        let color = '';

        if (!item.done && item.date < dateFormate) {
            color = 'red'
        } else if (item.done) {
            color = 'green'
        }

        content += `<li>
                        <div class="collapsible-header">
                            ${item.title}<i class='material-icons' style='color: ${color}' >access_time</i>
                        </div>
    
                        <div class="collapsible-body">
                            <span>${item.description}</span>
                            
                            <div class="priority-circle">${item.priority}</div>
                            
                            <p>Done:${item.date}</p>
    
                            <div class="checkbox_done">
                                <p>
                                    <label>
                                        <input type="checkbox" ${item.done ? 'checked' : ''} onchange="changeTask(${index})"/>
                                        <span>Done task</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </li>`
    });

    elementCollapse.innerHTML = content;
};

let createNewTask = (e) => {
    e.preventDefault();

    let newTask = {
        title: e.target.elements.titleTask.value,
        description: e.target.elements.descriptionTask.value,
        date: e.target.elements.dateTask.value,
        priority: e.target.elements.priority.value,
        done: false
    };

    taskList.push(newTask);
    renderTaskList();
};

let changeTask = (indexTask) => {
    console.log(indexTask);
    let cloneTaskList = taskList;

    cloneTaskList.map((item,index) => {
        item.done = (index === indexTask) ? !item.done : item.done;
        return item;
    });

    let collectionList = document.getElementById('collapsible').children;
    for (let item of collectionList) {
        if (item.className === "active") {
            setTimeout(() => {
                $('.collapsible').collapsible("close",indexTask );
            }, 500);
        }
    }

    taskList = cloneTaskList;
    duplicateTaskList = taskList;

    setTimeout(renderTaskList, 800)
};

let filterTaskList = (value) => {
    let dateFormate = date.getFullYear()+"-"+((date.getMonth()+1) >= 10 ? date.getMonth()+1: '0'+(date.getMonth() + 1))+"-"+date.getDate();
    taskList = duplicateTaskList;
    switch (value) {
        case 'current':
            taskList = taskList.filter( item =>{
                return (!item.done && item.date >= dateFormate)
            });
            break;
        case 'expired':
            taskList = taskList.filter( item =>{
                return (!item.done && item.date < dateFormate)
            });
            break;
        case 'completed':
            taskList = taskList.filter( item =>{
                return (item.done)
            });
            break;
        default:
            taskList = duplicateTaskList;
            break;
    }

    renderTaskList();
};

let sortTaskList = () =>{

    let value = document.getElementById('sortElement').value;

    switch (value){
        case 'dateUp':
            taskList.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
            break;

        case 'dateDown':
            taskList.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
            break;

        case 'priorityUp':
            taskList.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
            break;

        case 'priorityDown':
            taskList.sort((a,b) => (a.priority < b.priority) ? 1 : ((b.priority < a.priority) ? -1 : 0));
            break;
    }
    renderTaskList();
};

let showBlock = ()=> {
    document.getElementById('myShowBlock').style.height ='250px';
}

let noShowBlock = ()=> {
    if(!document.getElementById('title-task').value){
        document.getElementById('myShowBlock').style.height ='0';
    }
    
}

document.getElementById('title-task').onfocus =showBlock;
document.getElementById('title-task').onblur = noShowBlock;

sortTaskList();

window.onload = renderTaskList();