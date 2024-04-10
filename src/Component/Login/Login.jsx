import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config"
import { useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const [show , setShow] = useState(false);
    const emailRef = useRef();

    const handleShow = () =>{
        setShow(!show);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        //Reset loginStatus
        setSuccess("")
        setError("")

        //User SignIn
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess("User Logged in Successfully")
                setLoginStatus(!loginStatus);
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setError("An Error occur . Can't Logged in at this moment");
            })

        //User Logout

        signOut(auth)
            .then(() => {
                setLoginStatus(!loginStatus);
                setSuccess("User Logged Out Successfully")
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setError("An Error occur . Can't Logged Out at this moment");
            })

    }


    const handleForgetPassword = () => {
        const email = emailRef.current.value;

        //Reset error
        setError("")


        if(!email){
            setError("Please provide your email address");
            return;
        }
        else if(/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/.test(email)){
            setError("Please enter a valid email");
            return;
        }

        
        sendPasswordResetEmail(auth , email)
            .then(() => {
                alert("Password reset email sent Successfully")
            })
            .catch(error => {
                setError(error)
            })
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Login now to access your account and dive into your personalized experience!</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={show ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
                                {
                                    show ?
                                        <span onClick={handleShow} className="absolute top-[50px] right-4"><IoEyeOff /></span> :
                                        <span onClick={handleShow} className="absolute top-[50px] right-4"><IoEye /></span>
                                }
                                <label className="label">
                                    <a onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {
                                success && <p className="text-green-500">{success}</p>
                            }
                            {
                                error && <p className="text-red-500">{error}</p>
                            }
                            <p>Want to create an account ? <Link to="/register" className="text-blue-500">Register</Link></p>
                            <div className="form-control mt-6">
                                {
                                    loginStatus ?
                                        <button className="btn btn-primary">LogOut</button> :
                                        <button className="btn btn-primary">Login</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;