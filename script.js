let notesContainer=document.getElementById('app')
let addNoteButton=document.querySelector('.add-note')

getNotes().forEach(note=>{
    let noteElement=createNotesElement(note.id,note.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
    
})
function getNotes(){
    return JSON.parse(localStorage.getItem('stickynotes-notes')||'[]');
}
const saveNotes=(notes)=>{
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));
}
function createNotesElement(id,content){
    let element=document.createElement("textarea");
    element.classList.add('note');
    element.value=content;
    element.placeholder="Empty sticky notes"

    element.addEventListener("change",()=>{
        updateNote(id,element.value);
    });
    element.addEventListener("dblclick",()=>{
        let doDelete=confirm("Are you sure to want to delete this sticky note ?");
        if(doDelete){
            deleteNote(id,element);
        }

    })

    return element;
}
const addNote=()=>{
    let notes=getNotes();
    let noteObject={
        id:Math.floor(Math.random()*1000),
        content:""
    }
    let newNoteElement=createNotesElement(noteObject.id,noteObject.content);
    notesContainer.insertBefore(newNoteElement,addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);




}
const updateNote=(id,newContent)=>{
    let notes=getNotes();
    let targetNote=notes.filter(note=>note.id==id)[0]
    targetNote.content=newContent;
    saveNotes(notes);
}
const deleteNote=(id,element)=>{
    let notes=getNotes().filter(note=>note.id!=id);

    saveNotes(notes);
    notesContainer.removeChild(element)

}
addNoteButton.addEventListener('click',addNote)