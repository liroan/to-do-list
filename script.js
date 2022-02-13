/*
let form = document.querySelector('form');
let menu = document.querySelector('.active-menu');
let notes = document.querySelector('.notes');

let select = document.querySelector('select');
select.onchange = function (event) {
    let act = document.querySelectorAll(".active-note") ?? [];
    let upd = document.querySelectorAll(".update-note") ?? [];
    let del = document.querySelectorAll(".delete-note") ?? [];
    let all = [...act, ...upd, ...del];
    for (let el of all) {
        el.style.display = "none";
    }
    if (select.value === "active-note") {
        for (let el of act) {
            el.style.display = "";
        }
    } else if (select.value === "update-note") {
        for (let el of upd) {
            el.style.display = "";
        }
    } else {
        for (let el of del) {
            el.style.display = "";
        }
    }
}
form.onsubmit = function (event) {
    if (form.elements[0].value === "") return false;
    let div = document.createElement('div');
    div.className = "note active-note";
    let p = document.createElement('p');
    p.textContent = form.elements[0].value
    div.append(p);
    div.insertAdjacentHTML("beforeend", `<div class="active-menu"><div class="delete"><button></button></div><div class="update"><button></button></div><div class="reload"><button></button></div></div>`)
    notes.append(div);
    form.elements[0].value = "";
    return false;
}

notes.onclick = function (event) {
    let button = event.target.closest('button');
    let div = event.target.closest(".note");
    if (!button || !div) return;
    div.classList.remove(select.value);
    if (select.value === "active-note") {
        if (button.parentElement.className === "delete") {
            div.classList.add("delete-note");
        } else {
            div.classList.add("update-note");
        }
        div.querySelector(".active-menu").querySelector(".reload").style.display = "block";
        div.querySelector(".active-menu").querySelector(".update").style.display = "none";
    } else if (select.value === "update-note") {
        if (button.parentElement.className === "delete") {
            div.classList.add("delete-note");
        } else {
            div.classList.add("active-note");
            div.querySelector(".active-menu").querySelector(".update").style.display = "";
            div.querySelector(".active-menu").querySelector(".reload").style.display = "none";
        }
    } else {
        if (button.parentElement.className === "delete") {
            div.remove();
        } else {
            div.classList.add("active-note");
            div.querySelector(".active-menu").querySelector(".update").style.display = "";
            div.querySelector(".active-menu").querySelector(".reload").style.display = "none";
        }
    }
    div.style.display = "none";
}
*/
let form = document.querySelector('form');
let menu = document.querySelector('.active-menu');
let notes = document.querySelector('.notes');

let select = document.querySelector('select');
select.onchange = function (event) {
    let act = document.querySelectorAll(".active-note") ?? [];
    let upd = document.querySelectorAll(".update-note") ?? [];
    let del = document.querySelectorAll(".delete-note") ?? [];
    let all = [...act, ...upd, ...del];
    for (let el of all) {
        el.style.display = "none";
    }
    let currentList = null;
    form.nextElementSibling.style.display = "block";
    if (select.value === "active-note") {
        currentList = act;
        form.nextElementSibling.style.display = "none";
    } else if (select.value === "update-note") {
        currentList = upd;
    } else {
        currentList = del;
    }
    for (let el of currentList)
        el.style.display = "";
}
form.onsubmit = function (event) {
    if (form.elements[0].value === "") return false;
    let div = document.createElement('div');
    let blocker = document.createElement('div');
    div.className = "note active-note";
    blocker.className = "blocker";
    let p = document.createElement('p');
    p.textContent = form.elements[0].value
    div.append(p);
    div.insertAdjacentHTML("beforeend", `<div class="active-menu"><div class="delete"><button></button></div><div class="update"><button></button></div><div class="reload"><button></button></div></div>`)
    div.append(blocker);
    notes.append(div);
    form.elements[0].value = "";
    return false;
}

notes.onclick = function (event) {
    let button = event.target.closest('button');
    let div = event.target.closest(".note");
    if (!button || !div) return;
    div.classList.remove(select.value);
    if (select.value === "active-note") {
        addClass(button, div, "update-note")
        let menu =  div.querySelector(".active-menu");
        menu.querySelector(".reload").style.display = "block";
        menu.querySelector(".update").style.display = "none";
    } else if (select.value === "update-note") {
        addClass(button, div, "active-note", true);
    } else {
        addClass(button, div, "active-note", true, true)
    }
    div.style.display = "none";
}

function addClass(button, div, newAddClass, additionalActions, del) {
    if (button.parentElement.className === "delete") {
        if (del) div.remove();
        else div.classList.add("delete-note");
    } else {
        div.classList.add(newAddClass);
    }
    if (additionalActions) {
        div.querySelector(".active-menu").querySelector(".update").style.display = "";
        div.querySelector(".active-menu").querySelector(".reload").style.display = "none";
    }
}
