const formEl = document.querySelector(".form")
const inputEl = document.querySelector(".input")
const ulEl = document.querySelector(".list")

// //convert list to array
let list = JSON.parse(localStorage.getItem("list"));

if (list) {
  list.forEach(task => {
    toDoList(task)
  });
}

formEl.addEventListener("submit", (event) =>
{
  event.preventDefault();

  toDoList();
}
);

function toDoList(task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }



  const liEl = document.createElement("li");

  //this is when refreshed, the unchecked(grayed out) is still there
  if (task && task.checked) {
    liEl.classList.add("checked");
}

  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();

}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  let list = [];
  liEls.forEach(liEl => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked")
    });
  })
  localStorage.setItem("list", JSON.stringify(list))
}


