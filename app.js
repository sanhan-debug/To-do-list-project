// Btun HTML  elementleri shecmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch")


let todos = [];

// Butun event funksiyalarinin ishlemesi uchun ayri funksiya yaziriq
runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoUI);
    clearButton.addEventListener("click", allTodosEverywhere);
    filterInput.addEventListener("keyup", filter);
}



function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoSiyahisi = document.querySelectorAll(".list-group-item");

    if (todoSiyahisi.length > 0) {
        todoSiyahisi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                // 
                todo.setAttribute("style", "display : block");
            } else {
                todo.setAttribute("style", "display : none !important");
            }
        });

    } else {
        showAlert("warning", "Axtarmaq uchun todo olmalidir!");
    }
}

function allTodosEverywhere() {
    const todoSiyahisi = document.querySelectorAll(".list-group-item");
    if (todoSiyahisi.length > 0) {
        // Ekrandan silme
        todoSiyahisi.forEach(function (todo) {
            todo.remove();
        })
        // Storageden silme
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", " Todolar ugurlu shekilde silindi!");
    } else {
        showAlert("warning", "Silmek uchun en az 1 Todo olmalidir!");
    }

}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


function removeTodoUI(e) {
    if (e.target.className === "fa fa-remove") {
        // Ekrandan silmek
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        // Storageden silmek
        removeTodoToStorage(todo.textContent);


        showAlert("success", "Todo silindi!")
    }
}



function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("danger", "Zehmet olmasa bir shey yazin!")
    } else {
        // Sehifeye elave etmek
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "To do elave olundu.");
        todoRemove(todo);

    }


    // storage elave etmek
    e.preventDefault();
}


function addTodoToUI(newTodo) {
    // HTML Elementini yaratmaq
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
                            <a href="#" class="delete-item">
                                <i class="fa fa-remove"></i>
                            </a>
                        </li> */
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);


    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    /*
    <div class="alert alert-warning" role="alert">
   This is a warning alert—check it out!
 </div>
 */

    const div = document.createElement("div");
    // div.className = "alert alert-"+type;
    div.className = `alert alert-${type}`;//literial template
    div.role = "alert";
    div.textContent = message;

    firstCardBody.appendChild(div);

    // alertin saniyesini mueyyen edir
    setTimeout(function () {
        div.remove();
    }, 2000);

}


