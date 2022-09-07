import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"

export default function Signup(props) {
    let navigate = useNavigate();
    const [credintials, setCredintials] = useState({ sname: "", semail: "", spassword: "", cpassword: "" });

    const onChange = (e) => {
        setCredintials({ ...credintials, [e.target.name]: e.target.value })
    }
    const handelSignup = async (e) => {
        e.preventDefault();
        if (credintials.spassword !== credintials.cpassword) {
            console.log("Confirm Password is Not Match!");
        }
        else {
            const res = await fetch(`https://notez-mannananxari.vercel.app/api/auth/createuser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: credintials.sname, email: credintials.semail, password: credintials.spassword })
            });
            const json = await res.json();
            if (json.success) {
                localStorage.setItem("token", json.authToken)
                props.showAlert("Successfully Registered!", "success")
                navigate('/');
            }
            else {
                props.showAlert(json.Error, "danger");
            }
        }
    }
    return (
        <>

            {/* <div className="animated bounceInDown">
                <div className="container-user">
                    <span className="error animated tada" id="msg"></span>
                    <form name="form1" className="box" >
                        <h4>Admin<span>Dashboard</span></h4>
                        <h5>Sign in to your account.</h5> 
                        <input type="text" name="email" placeholder="Email"  />
                        <i className="typcn typcn-eye" id="eye"></i>
                        <input type="password" name="password" placeholder="Passsword" id="pwd"  />
                        <input type="password" name="password" placeholder="Confirm Passsword" id="pwd"  />
                        <label>
                            <input type="checkbox" />
                            <span></span>
                            <small className="rmb">Remember me</small>
                        </label>
                        <input type="submit" value="Sign in" className="btn1" />
                    </form>
                    <Link to="/login" className="dnthave">Already have an account? Sign in</Link>
                </div>
            </div> */}


            <form className="row g-3" onSubmit={handelSignup}>
                <div className="col-md-12">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='sname' value={credintials.sname} onChange={onChange} id="name" required minLength={3} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" name='semail' value={credintials.semail} onChange={onChange} id="inputEmail4" required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" name='spassword' value={credintials.spassword} onChange={onChange} id="inputPassword4" required minLength={5} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputcPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" name='cpassword' value={credintials.cpassword} onChange={onChange} id="inputcPassword4" required minLength={5} />
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Check me out
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign up</button>
                </div>
            </form>
            <Link to="/login" className="dnthave">Already have an account? Sign in</Link>

        </>
    )
}
