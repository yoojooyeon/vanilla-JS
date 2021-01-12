const toDoForm = document.getElementById("js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoListPending = document.getElementById("js-toDoListPending"),
    toDoListFinished = document.getElementById("js-toDoListFinished");

const TODOS_P_LS = "Pending",
TODOS_F_LS = "Finished";

let toDos, toDosF;


function getTask(text) {
    return {
        id:String(Date.now()),
        text
    };
}

function setup(task) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = task.text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function savePending(task) {
    toDos.push(task);
}

function removePending(taskID) {
    toDos = toDos.filter(function(task) {
        return task.id !== taskID;
    });
}

function removeFinished(taskID) {
    toDosF = toDosF.filter(function(task) {
        return task.id !== taskID;
    });
}

function findPending(taskID) {
    return toDos.find(function(task) {
        return task.id === taskID;
    });
}

function findFinished(taskID) {
    return toDosF.find(function(task) {
        return task.id === taskID;
    });
}

function deleteTodo(event) {
    const btn_d = event.target.parentNode;
    btn_d.parentNode.removeChild(btn_d);
    removeFinished(btn_d.id);
    removePending(btn_d.id);
    saveToDos();
}

function checkToDo(event) {
    const btn_c = event.target.parentNode;
    btn_c.parentNode.removeChild(btn_c);
    const task = findPending(btn_c.id);
    removePending(btn_c.id);
    toDosF.push(task);
    paintToDoFin(task);
    saveToDos();
}

function rewindToDo(event) {
    const btn_r = event.target.parentNode;
    btn_r.parentNode.removeChild(btn_r);
    const task = findFinished(btn_r.id);
    removeFinished(btn_r.id);
    toDos.push(task);
    paintToDo(task);
    saveToDos();
}


function saveToDos() {
    localStorage.setItem(TODOS_P_LS, JSON.stringify(toDos)); 
    localStorage.setItem(TODOS_F_LS, JSON.stringify(toDosF));  
}

function paintToDo(text) {
    const li = setup(text);
    const checkBtn = document.createElement("button");
    checkBtn.innerText = "✅";
    checkBtn.addEventListener("click", checkToDo);
    li.append(checkBtn);
    toDoListPending.append(li);
}

function paintToDoFin(text) {
    const li = setup(text);
    const rewBtn = document.createElement("button");
    rewBtn.innerText = "⏪";
    rewBtn.addEventListener("click", rewindToDo);
    li.append(rewBtn);
    toDoListFinished.append(li);
}

function restoreToDos() {
    toDos.forEach(function(task) {
        paintToDo(task);
    });
    toDosF.forEach(function(task) {
        paintToDoFin(task);
    });
}



function loadToDos() {
    toDos = JSON.parse(localStorage.getItem(TODOS_P_LS)) || [];
    toDosF = JSON.parse(localStorage.getItem(TODOS_F_LS)) || [];
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = getTask(toDoInput.value);
    toDoInput.value = "";
    paintToDo(currentValue);
    savePending(currentValue);
    saveToDos();
    
}


function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    loadToDos();
    restoreToDos();
}

init();
