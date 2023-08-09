"use strict";
const noteInput = document.getElementById("noteInput");
const addButton = document.getElementById("addButton");
const noteList = document.getElementById("noteList");
addButton.addEventListener("click", () => {
  const text = noteInput.value;
  if (text.trim() !== "") {
    const newNote = {
      id: new Date().getTime().toString(),
      text: text,
    };
    saveNoteToLocalstorage(newNote);
    renderNotes();
    noteInput.value = "";
  }
});
function saveNoteToLocalstorage(note) {
  const notes = getNotesFromLocalstorage();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}
function getNotesFromLocalstorage() {
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
    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deleteNoteFromLocalstorage(note.id);
      renderNotes();
    });
  });
}
function deleteNoteFromLocalstorage(id) {
  const notes = getNotesFromLocalstorage().filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
}
renderNotes();
