import { React, useContext, useState } from "react";
import noteContext from "../../context/notes/noteContext";

export default function Addnote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: '', tag: '' })
    const handleAdd = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note Successfully Added!", "success");
        setnote({ title: "", description: '', tag: '' })
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3">
            <p className="fs-1 fw-bold text-center">Add Notes</p>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" onChange={onChange} id="title" value={note.title} name="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input type="text" className="form-control" onChange={onChange} id="description" value={note.description} name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag:</label>
                    <input type="text" className="form-control" onChange={onChange} id="tag" value={note.tag} name="tag" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length <= 3} onClick={handleAdd}>Submit</button>
            </form>
        </div>
    )
}
