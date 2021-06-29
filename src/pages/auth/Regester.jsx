import { toStatement } from "@babel/types";
import React, { useState } from "react";
import { auth } from "../../firebase";
//import { toast ,ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css"

const Regester = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    //toast.success(`email set successfully) to ${email}`);
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
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
          {/* <ToastContainer/> */}
          {registerForm()}
        </div>
      </div>
    </div>
  );
};
export default Regester;
