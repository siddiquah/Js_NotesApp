// console.log("Hello World")
const addBox = document.querySelector(".add-box") //the + button 

const popupBox = document.querySelector(".popup-box") // the popup box
const popupTitle = popupBox.querySelector("header p")
const closeIcon = popupBox.querySelector("header i") // the X icon in popup box

const titleTag = popupBox.querySelector("input") // title area in popup box
const descTag = popupBox.querySelector("textarea") // description area in popup box
const addBtn = popupBox.querySelector("button") // the add note button in popup box

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobe", "November", "December", ]
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus()
    // console.log("its working1");
    popupBox.classList.add("show")
});

// console.log(closeIcon);

closeIcon.addEventListener("click", () => {
    // console.log("its working2 Ahhhhhh");
    isUpdate = false
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show")

    addBtn.innerText = "Add Note"
    popupTitle.innerText = "Add a new note."
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                <ul class="menu">
                                    <li onClick="updateNote(${index},'${note.title}', '${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
                                    <li onClick="deleteNote(${index})"><i class="fa-solid fa-trash-can"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`
        // console.log(note)
        addBox.insertAdjacentHTML("afterend", liTag);
    })
}
showNotes()

function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show")
        }
    })
    // console.log(elem.parentElement);
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note??");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId
    addBox.click()

    titleTag.value = title
    descTag.value = desc

    addBtn.innerText = "Update Note"
    popupTitle.innerText = "Update a note."
}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        let dateObj = new Date()
        let month = months[dateObj.getMonth()]
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()

        // console.log(day, month, year)

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${day} ${month} ${year}`
        }

        if(!isUpdate) {
            notes.push(noteInfo)
        }
        else{ 
            isUpdate = false
            notes[updateId] = noteInfo;
        }

        localStorage.setItem("notes", JSON.stringify(notes))
        closeIcon.click();
        // console.log(noteInfo)
        showNotes()

    }

    // console.log(noteTitle, noteDesc);

});