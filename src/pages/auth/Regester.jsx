import React, { useState,useEffect } from "react";
import { auth } from "../../firebase";
import { toast} from "react-toastify";
import { useSelector } from "react-redux";
const Regester = ({history}) => {
  const [email, setEmail] = useState("");

  const {user} =useSelector((state)=>({...state}))
useEffect(()=>{
    if(user && user.token) history.push('/')
},[user])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent ${email}. Click the link to complete your registration.`)
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit"  class="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}

        </div>
      </div>
    </div>
  );
};
export default Regester;
