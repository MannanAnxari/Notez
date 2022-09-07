import NoteContext from './noteContext'
import { useState } from 'react';

export default function NoteState(props) {
    const host = "https://notez-mannananxari.vercel.app/"
    const notesInitial = [];


    const [notes, setNotes] = useState(notesInitial)

    // Get Note
    const getNote = async () => {

        const res = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }

        });
        const json = await res.json();
        setNotes(json)
    }

    // Add Note
    const addNote = async (title, description, tag) => {

        const res = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })

        });
        const note = await res.json();
        setNotes(notes.concat(note));
    }

    // Update Note
    const editNote = async (id, title, description, tag) => {



        const res = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
            
        });
        const json = res.json(); 
        console.log(json); 

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index]; 
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                // console.log(`newNotes.Desc: ${newNotes[index].description} = Desc: ${description}`);
                newNotes[index].tag = tag;
                // break;
            }

        }
        setNotes(newNotes);
    }
    // Delete Note
    const deleteNote = async (id) => {



        const res = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = res.json(); 
console.log(json);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNotes);

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNote }}>{props.children}</NoteContext.Provider>
    )

}
