import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";


const RegesterComplete = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();

        //validation
        if(!email || !password){
            toast.error('email and password is required')
            return;
        }
        if(password.length < 6){
            toast.error('password must be atleast 6 characters long')
            return;
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            if (result.user.emailVerified) {
                //remove user email from localstorage
                window.localStorage.removeItem('emailForRegistration');
                let user = auth.currentUser
                //update the password and user id tken
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult()
                //redux store
              console.log("user",user,"idTokenResult",idTokenResult);
                //redirect
                //history.pushState('/');
            }
        } catch (error) {
            toast.error(error.message)
        }


    };
    const completeRegisterationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />
            <br />
            <input type="password" className='form-control'
                value={password} onChange={(e) => setPassword(e.target.value)}
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
                    {completeRegisterationForm()}

                </div>
            </div>
        </div>
    );
};
export default RegesterComplete;
