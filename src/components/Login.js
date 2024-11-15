import { useRef, useState } from "react";
import { checkValidData } from "./utils/validate";
import { auth } from "./utils/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGO_URL } from "./utils/constants";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const dispatch = useDispatch();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn);
    };

    const handleButtonClick = async () => {
        // Validate form data
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        try {
            if (!isSignIn) {
                // Sign up
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
                });

                dispatch(
                    addUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    })
                );
                navigate("/");
            } else {
                // Sign in
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );
                const user = userCredential.user;
                // Dispatch only serializable user data
                dispatch(
                    addUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    })
                );
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(`${errorCode} - ${errorMessage}`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-pink-100">
            <img className="w-20 m-4 sm:w-28" src={LOGO_URL} alt="Logo" />
            <div className="h-screen pl-12 pr-12 pt-20 pb-0">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="max-w-md mx-auto p-8 bg-pink-300 rounded-lg bg-opacity-80 shadow-lg"
                >
                    <h1 className="font-bold text-3xl mb-4 text-center text-gray-800">
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isSignIn && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Full Name"
                            className="my-4 p-4 w-full bg-gray-800 text-white rounded-lg placeholder-gray-400"
                        />
                    )}

                    <input
                        ref={email}
                        type="email"
                        placeholder="Email Address"
                        className="my-4 p-4 w-full bg-gray-800 text-white rounded-lg placeholder-gray-400"
                    />

                    <div className="relative">
                        <input
                            ref={password}
                            type={showPassword ? "text" : "password"} // Change input type based on state
                            required
                            placeholder="Password"
                            className="my-4 p-4 w-full bg-gray-800 text-white rounded-lg placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            className="absolute right-3 top-[35%] text-white"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <p className="font-bold text-lg text-red-400 py-2 text-center">{errorMessage}</p>

                    <button
                        className="my-4 p-4 bg-pink-400 w-full rounded-lg text-lg text-gray-800 hover:bg-pink-500 transition-colors"
                        onClick={handleButtonClick}
                    >
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </button>

                    <p className="my-4 py-4 text-center text-gray-800 cursor-pointer" onClick={toggleSignInForm}>
                        {isSignIn
                            ? "New to Swiggy? Sign Up Now"
                            : "Already a user? Sign In Now"}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
