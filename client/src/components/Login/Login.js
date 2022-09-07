import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"

export default function Login(props) {
    const [credintials, setCredintials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredintials({ ...credintials, [e.target.name]: e.target.value })
    }
    const handelLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`https://notez-mannananxari.vercel.app/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credintials.email, password: credintials.password })
        });
        const json = await res.json();
        if (json.success) {
            localStorage.setItem("token", json.authToken)
            props.showAlert("Logged in successfully!", "success")
            navigate('/');
        }
        else{
            props.showAlert(json.error, "danger");
        } 
    }
    return (
        <>

            {/* <div className="animated bounceInDown">
                <div className="container-user">
                    <span className="error animated tada" id="msg"></span>
                    <form name="form1" className="box">
                        <h4>Admin<span>Dashboard</span></h4>
                        <h5>Sign in to your account.</h5> 
                        <input type="text" name="email" placeholder="Email" />
                        <i className="typcn typcn-eye" id="eye"></i>
                        <input type="password" name="password" placeholder="Passsword" id="pwd" />
                        <label>
                            <input type="checkbox" />
                            <span></span>
                            <small className="rmb">Remember me</small>
                        </label>
                        <Link to="/forgot" className="forgetpass">Forget Password?</Link>
                        <input type="submit" value="Sign in" className="btn1" />
                    </form>
                    <Link to="/signup" className="dnthave">Don’t have an account? Sign up</Link>
                </div>
            </div> */}
            <form onSubmit={handelLogin}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email" className="form-control" value={credintials.email} name="email" onChange={onChange} id="inputEmail" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" value={credintials.password} name="password" onChange={onChange} id="inputPassword" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label className="form-check-label"><input type="checkbox" /> Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link to="/signup" className="dnthave">Don’t have an account? Sign up</Link>

        </>
    )
}
