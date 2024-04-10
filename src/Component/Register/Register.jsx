import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config"
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const Register = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        const imageUrl = "https://img.png"

        //Reset Registration Status
        setSuccess("")
        setError("")

        //Email validation
        if (/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/.test(email)) {
            setError("Provide an valid email address");
            return;
        }

        //Password validation
        else if (password.length < 6) {
            setError("Password should at least 6 character");
            return;
        }
        else if (password.length > 16) {
            setError("Password should be maximum of 16 character");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setError("Password should contain an uppercase character");
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setError("Password should contain at least a digit between 0-9");
            return;
        }
        else if (!/[!@#$%^&*]/.test(password)) {
            setError("Password should contain a special character");
            return;
        }

        //Terms and Condition validation
        else if (!terms) {
            alert("Accept Terms and Condition to Register")
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setSuccess("User Register Successful")

                updateProfile(user, {
                    displayName: name,
                    photoURL: imageUrl,
                })
                    .then(() => {
                        setSuccess("User Register Successful & User profile updated.")
                    })
                    .catch(() => {
                        setError("An Error occur . Can't Update profile at this moment")
                    })
                sendEmailVerification(user)
                    .then(
                        alert("An verification mail sent to your email address")
                    )
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }




    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Register Now and unlock a world of possibilities!</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="name" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
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
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <input type="checkbox" name="terms" id="terms" />
                            <label htmlFor="terms">Accept Terms and Conditions</label>
                        </div>
                        {
                            success && <p className="text-green-500">{success}</p>
                        }
                        {
                            error && <p className="text-red-500">{error}</p>
                        }
                        <p>Already Have account ? <Link to="/login" className="text-blue-500">Login</Link></p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;