export let todos = [];

function makeDateString(dateText) {
  let dateString = "";
  if (dateText === "") {
    return dateString;
  }
  let aDate = new Date(`${dateText}`).toDateString();
  let newDate = aDate.slice(4, 10) + ", " + aDate.slice(11);
  return newDate;
}

export function addNewTodoInterface(container, theTodo) {
  // descriptions goes here

  todos.push(theTodo);

  const aTodo = document.createElement("div");
  aTodo.classList.add("a-todo");
  aTodo.setAttribute("list-number", `${theTodo.getListNumber}`);
  aTodo.setAttribute("todo-number", `${theTodo.getTodoNumber}`);
  if (theTodo.getPriority === "none") {
    aTodo.classList.toggle("none");
  } else if (theTodo.getPriority === "medium") {
    aTodo.classList.toggle("medium");
  } else if (theTodo.getPriority === "high") {
    aTodo.classList.toggle("high");
  } else if (theTodo.getPriority === "normal") {
    aTodo.classList.toggle("normal");
  }
  container.appendChild(aTodo);

  const aList = document.createElement("div");
  aList.classList.add("a-list");
  aTodo.appendChild(aList);

  const description = document.createElement("div");
  description.classList.add("description");
  description.textContent = theTodo.getDescription;
  aTodo.appendChild(description);

  const collapse = document.createElement("div");
  collapse.classList.add("collapse");
  aTodo.appendChild(collapse);

  const left = document.createElement("div");
  left.classList.add("left");
  aList.appendChild(left);

  const right = document.createElement("div");
  right.classList.add("right");
  aList.appendChild(right);

  const collapseImg = document.createElement("img");
  collapseImg.setAttribute("src", "icons/unfold.png");
  collapseImg.setAttribute("alt", "collapse icon");
  collapseImg.setAttribute("id", "hide");
  collapse.appendChild(collapseImg);

  const input1 = document.createElement("input");
  input1.setAttribute("type", "checkbox");
  input1.setAttribute("id", "todo-checkbox");
  input1.setAttribute("name", "todo-checkbox");
  if (theTodo.getIsCompleted === 1) {
    input1.checked = true;
  }
  left.appendChild(input1);

  const titleTodo = document.createElement("div");
  titleTodo.innerHTML = `<p class="tName"><strong>${theTodo.getTitle}</strong></p>
    <p class='tDate'>${makeDateString(theTodo.getDueDate)}
    </p>`;
  left.appendChild(titleTodo);

  const icon2 = document.createElement("img");
  icon2.setAttribute("src", "icons/pencil.png");
  icon2.classList.add("edit");
  right.appendChild(icon2);

  const icon5 = document.createElement("img");
  icon5.setAttribute("src", "icons/trash.png");
  icon5.classList.add("delete");
  right.appendChild(icon5);

  return aTodo;
}

// change todo header
export function changeTodoHeader(todoHeader, listNumber, title) {
  if (listNumber === null) {
    todoHeader.firstElementChild.textContent = title;
  }
  todoHeader.setAttribute("list-number", `${listNumber}`);
  todoHeader.firstElementChild.textContent = title;
}

// show all todos of a particular list
export function showListsTodos(allTodos, listNumber) {
  if (allTodos === null) return;
  for (let todo of allTodos) {
    if (todo.getAttribute("list-number") === listNumber) {
      todo.removeAttribute("id");
    } else {
      todo.setAttribute("id", "hide");
    }
  }
}

export function deleteRelatedTodo(container, allTodos, listNumber) {
  for (let todo of allTodos) {
    const list_num = todo.getAttribute("list-number");
    if (list_num === listNumber) {
      container.removeChild(todo);
    }
  }
}

function setPriorityValue(selectedOne, priorityInput) {
  let input = priorityInput.firstElementChild;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (input.getAttribute("value") === selectedOne) {
      input.selected = true;
      break;
    }
    input = input.nextElementSibling;
  }
}

export function editTodo(element, editModal, lists) {
  let listNumber = element.getAttribute("list-number");
  let todoNumber = element.getAttribute("todo-number");
  let theTodo = lists[parseInt(listNumber)].getTodos[parseInt(todoNumber)];
  let editForm = editModal.firstElementChild.nextElementSibling;
  editForm.firstElementChild.value = theTodo.getTitle;
  editForm.firstElementChild.nextElementSibling.lastElementChild.value =
    theTodo.getDueDate;
  const selectedOne = theTodo.getPriority;
  let priorityInput =
    editForm.firstElementChild.nextElementSibling.nextElementSibling
      .lastElementChild;
  setPriorityValue(selectedOne, priorityInput);
  priorityInput.parentNode.nextElementSibling.value = theTodo.getDescription;

  return theTodo;
}

export function updateTodoDOM(theTodo, todoDOM) {
  todoDOM.firstElementChild.firstElementChild
  .lastElementChild
  .innerHTML = `<p class="tName">
                  <strong>${theTodo.getTitle}</strong>
                </p>
                <p class='tDate'>${makeDateString(theTodo.getDueDate)}</p>`;
  todoDOM.firstElementChild.nextElementSibling.textContent = `${theTodo.getDescription}`;
  todoDOM.classList.toggle(theTodo.getPriority);
}
