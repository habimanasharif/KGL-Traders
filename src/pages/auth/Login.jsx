import React, { useState ,useEffect} from "react";
import { auth,googleAuthProvider} from "../../firebase";
import { toast} from "react-toastify";
import { Button } from "antd";
import { MailOutlined ,GoogleOutlined} from "@ant-design/icons";
import { useDispatch ,useSelector} from "react-redux";
import { Link } from "react-router-dom";
const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false)
  let dispatch=useDispatch();
  const {user} =useSelector((state)=>({...state}))
  useEffect(()=>{
      if(user && user.token) history.push('/')
  },[user])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result= await auth.signInWithEmailAndPassword(email,password);
      const {user}=result;

      console.log(result);
      const idTokenResult=await user.getIdTokenResult()
      dispatch(
          {type:"LOGGED_IN_USER",
        payload:{
            email:user.email,
            token:idTokenResult,
        }
        }
      );
      history.push("/")
    } catch (error) {
        toast.error(error.message);
        setLoading(false);
    }
    
  };
  const googleLogin = async()=>{
auth.signInWithPopup(googleAuthProvider)
.then(async(result)=>{
  const {user}=result;
  const idTokenResult= await user.getIdTokenResult();
  dispatch(
    {type:"LOGGED_IN_USER",
  payload:{
      email:user.email,
      token:idTokenResult,
  }
  }
);
history.push("/")
}).catch((error)=> {
  toast.error(error)
})
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
    
      />
      </div>
      <br />
      <div className="form-group">
      <input
        type="password"
        className="form-control"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)
        
        }
        
      />
      </div>
      <br />
      <Button onClick={handleSubmit}
      type="primary" 
      className="mb-3"
      block
      shape="round"
      icon={<MailOutlined/>}
      size="large"
      disabled={!email||password.length<6}
      
      
      > Login with Email/Password</Button>

<br />
      <Button onClick={googleLogin}
      type="danger" 
      className="mb-3"
      block
      shape="round"
      icon={<GoogleOutlined/>}
      size="large"
    
      
      
      > Login with Google</Button>
      <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-6 offset-md-3">
          {loading ? <h4 className="text-danger">Loading...</h4> :<h4>Login</h4>}
          {registerForm()}

        </div>
      </div>
    </div>
  );
};
export default Login;
