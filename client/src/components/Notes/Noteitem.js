import { React, useContext } from "react";
import noteContext from "../../context/notes/noteContext";


export default function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (<>
        {/* Title:  {note.title} <br />
            Desc: {note.description} <br /> */}
        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 my-2" >
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">  {note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="form-text">{note.tag}</p>
                    <div className="row">
                        <div className="col-6 text-center">
                            <div className="btn w-100 btn-primary" onClick={() => updateNote(note)}>Edit Note <i className="fa-solid fa-pen-to-square mx-2"></i></div>
                        </div>
                        <div className="col-6 text-center">
                            <div className="btn w-100 btn-danger" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully!", "warning") }}>Delete Note <i className="far fa-trash-alt mx-2"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
    )
}
