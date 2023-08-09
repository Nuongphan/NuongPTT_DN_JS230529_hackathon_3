interface Note {
  id: string;
  text: string;
}

const noteInput = document.getElementById("noteInput") as HTMLInputElement;
const addButton = document.getElementById("addButton") as HTMLButtonElement;
const noteList = document.getElementById("noteList") as HTMLUListElement;

addButton.addEventListener("click", () => {
  const text = noteInput.value;
  if (text.trim() !== "") {
    const newNote: Note = {
      id: new Date().getDate().toString(),
      text: text,
    };
    saveNoteToLocalstorage(newNote);
    renderNotes();
    noteInput.value = "";
  }
});

function saveNoteToLocalstorage(note: Note) {
  const notes = getNotesFromLocalstorage();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotesFromLocalstorage(): Note[] {
  const notesString = localStorage.getItem("notes");
  return notesString ? JSON.parse(notesString) : [];
}

function renderNotes() {
  noteList.innerHTML = "";
  const notes = getNotesFromLocalstorage();
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${note.text}</span>
            <button class="delete-button" data-id="${note.id}">Delete</button>
        `;
    noteList.appendChild(li);

    const deleteButton = li.querySelector(
      ".delete-button"
    ) as HTMLButtonElement;
    deleteButton.addEventListener("click", () => {
      deleteNoteFromLocalstorage(note.id);
      renderNotes();
    });
  });
}

function deleteNoteFromLocalstorage(id: string) {
  const notes = getNotesFromLocalstorage().filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
}

renderNotes();
