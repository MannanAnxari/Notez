import { useEffect, useRef } from "react";
import { React, useContext, useState } from "react";
import noteContext from "../../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

export default function Note(props) {

    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setnote] = useState({ id: "", etitle: "", edescription: '', etag: '' })
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            getNote();
        }
        else{
            navigate('/login');
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        })
    }
    const handleEdit = (e) => {
        editNote(
            note.id,
            note.etitle,
            note.edescription,
            note.etag
            )
            props.showAlert("Updated successfully!", "success");
        refClose.current.click();
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note.</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title:</label>
                                    <input type="text" className="form-control" onChange={onChange} id="etitle" required value={note.etitle} name="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description:</label>
                                    <input type="text" className="form-control" onChange={onChange} id="edescription" required value={note.edescription} name="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag:</label>
                                    <input type="text" className="form-control" onChange={onChange} id="etag" required value={note.etag} name="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={note.etitle.length < 3 || note.edescription.length < 5 || note.etag.length <= 3} onClick={handleEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <p className="fs-1 fw-bold text-center">Your Notes</p>
                <div className="row">
                    <div className="container">
                        {notes.length === 0 && 'No Notes To Show...'}
                    </div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}
