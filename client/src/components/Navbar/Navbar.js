import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={location.pathname === "/" ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={location.pathname === "/about" ? "nav-link active" : "nav-link"}>About</Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? <form className="d-flex">
              <Link to='/login' className="btn btn-outline-primary mx-2 px-4">Login</Link>
              <Link to='/signup' className="btn btn-outline-primary mx-2 px-4">Signup</Link>
            </form>
              : <button onClick={logout} className="btn btn-outline-primary mx-2 px-4">Logout</button> }
          </div>
        </div>
      </nav>
    </>
  );
}
