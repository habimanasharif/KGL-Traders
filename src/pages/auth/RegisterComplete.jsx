import { toStatement } from "@babel/types";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
//import { toast ,ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css"

const RegesterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        console.log(email)
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            if(result.user.emailVerified){
                //remove user email from local storage
                window.localStorage.removeItem("emailForRegistration")
                //get user id token
                let user =auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                //redux store
                 console.log("user",user,"IdTokenResult",idTokenResult)
                 //redirect
                //history.push('/')
            }
        } catch (error) {
console.log(error)
        }
    };
    const CompleteRegisterationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
            />
            <br />
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder='password'
            />
            <button type="submit" class="btn btn-raised">
                Complete Registration
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {/* <ToastContainer/> */}
                    {CompleteRegisterationForm()}
                </div>
            </div>
        </div>
    );
};
export default RegesterComplete;
