import React, { useRef, useState, useEffect } from "react";
import RippleButton from "ripple-effect-reactjs";
import { Link, useNavigate } from "react-router-dom";
import { LoginAlert, EyeNotVisibility, EyeVisibility } from "../components";
import ClipLoader from "react-spinners/ClipLoader";
import PersonIcon from "@mui/icons-material/Person";
import { useUserContext } from "../Context/UserContext";
import { motion } from "framer-motion";

const SignUp = () => {
  const { signup_loading, signup_success, signup_failed, signUpUser } =
    useUserContext();
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [passwordValidateText, setPasswordValidateText] = useState("Error");
  const emailRef = useRef(null);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  useEffect(() => {
    if (signup_success) {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  });

  const HandlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
    const passwordField1 = document.getElementById("pwd1");
    const passwordField2 = document.getElementById("pwd2");
    if (!passwordVisibility) {
      passwordField1.type = "text";
      passwordField2.type = "text";
    } else {
      passwordField1.type = "password";
      passwordField2.type = "password";
    }
  };

  const handleSubmit = () => {
    if (
      userNameRef.current.value.trim() !== "" &&
      emailRef.current.value !== "" &&
      passwordRef.current.value.trim() !== "" &&
      passwordConfirmRef.current.value.trim() !== ""
    ) {
      const emailValidation =
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          emailRef.current.value
        );
      if (!emailValidation) {
        return setValidateEmail(true);
      }
      if (
        passwordRef.current.value.trim() !==
        passwordConfirmRef.current.value.trim()
      ) {
        setPasswordValidateText("Password didn't match");
        return setValidatePassword(true);
      }
      if (passwordRef.current.value.length < 8) {
        setPasswordValidateText("Password length can't be less than 8");
        return setValidatePassword(true);
      }
      setValidateEmail(false);
      setValidatePassword(false);
      let data = {
        name: userNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        passwordConfirm: passwordConfirmRef.current.value,
      };
      signUpUser(data);
    }
  };

  let alert = null;
  if (signup_failed) {
    alert = (
      <LoginAlert
        message={"Ah error has occured ! Try again later"}
        alertClass={"failed"}
      />
    );
  }
  if (signup_success) {
    userNameRef.current.value = null;
    emailRef.current.value = null;
    passwordRef.current.value = null;
    passwordConfirmRef.current.value = null;
    alert = (
      <LoginAlert
        message={
          "SUCCESS! Your account has been created. You will be redirected to login page"
        }
        alertClass={"success"}
      />
    );
  }

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: "0vh", transition: { ease: "easeInOut" } }}
      exit={{ y: "-100vh", transition: { ease: "easeInOut" } }}
      className=" max-w-lg w-full mx-auto mt-24 max-md:px-4 flex flex-col items-center justify-center"
    >
      {alert}
      <div className="rounded-full bg-slate-300 w-fit p-2">
        <PersonIcon fontSize="large" color="primary" />
      </div>

      <h3 className="text-white text-xl">Sign up</h3>
      <form
        className={
          "w-full flex flex-col gap-5 mt-4 " +
          (validateEmail ? "gap-10" : "gap-7")
        }
      >
        <div className="border opacity-60 rounded-md focus-within:opacity-100 focus-within:border-2 duration-150 transition-all ease-linear h-12 relative w-full">
          <input
            type="text"
            id="FullName"
            placeholder=" "
            ref={userNameRef}
            className="w-full outline-none tracking-wide  text-white px-4 font-thin border-none h-full bg-transparent relative z-10 peer"
          />
          <p
            htmlFor="FullName"
            className="absolute text-sm text-white opacity-100 left-3 bg-darkBlue font-light duration-100 transition-all -top-3 ease-linear px-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg  peer-focus-within:-top-3  peer-focus-within:text-sm  "
          >
            Full Name
          </p>
        </div>

        <div
          className={
            " rounded-md   focus-within:border-opacity-90 focus-within:border-2 duration-150 transition-all ease-linear h-12 relative w-full " +
            (validateEmail
              ? "border-red-600 border-2"
              : "border-slate-300 border border-opacity-30")
          }
        >
          <input
            type="email"
            id="email"
            placeholder=" "
            ref={emailRef}
            className="w-full outline-none tracking-wide  text-white px-4 font-thin border-none h-full bg-transparent relative z-10 peer"
          />
          {validateEmail && (
            <p className="text-red-500 font-light text-sm mt-1 px-1">
              Please provide valid email address
            </p>
          )}
          <p
            htmlFor="email"
            className="absolute text-sm text-white opacity-100  left-3 bg-darkBlue font-light duration-100 transition-all -top-3 ease-linear px-2 peer-placeholder-shown:opacity-50 peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-focus-within:opacity-100  peer-focus-within:-top-3  peer-focus-within:text-sm  "
          >
            E-mail Address
          </p>
        </div>
        <div className="border rounded-md border-slate-300 border-opacity-30 focus-within:border-opacity-90 focus-within:border-2 duration-150 transition-all ease-linear h-12 relative w-full">
          <input
            type="password"
            id="pwd1"
            placeholder=" "
            required
            ref={passwordRef}
            className="w-full rounded-md tracking-wider outline-none border-none text-white px-4 font-extralight h-full bg-transparent relative z-10 peer"
          />
          <p
            htmlFor="pwd"
            className="absolute text-sm text-white opacity-100  left-3 bg-darkBlue font-light duration-100 transition-all -top-3 ease-linear px-2 peer-placeholder-shown:opacity-50 peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-focus-within:opacity-100  peer-focus-within:-top-3  peer-focus-within:text-sm"
          >
            Password
          </p>

          <div
            className="absolute pt-1 pr-1 cursor-pointer top-0 right-0 z-10 h-fit"
            onClick={HandlePasswordVisibility}
          >
            <RippleButton color={"#0d417c9e"} speed={700} radius={999}>
              {passwordVisibility ? <EyeVisibility /> : <EyeNotVisibility />}
            </RippleButton>
          </div>
        </div>
        <div
          className={
            "border rounded-md border-slate-300 border-opacity-30 focus-within:border-opacity-90  lieanr focus-within:border-2 duration-150 transition-all ease-linear h-12 relative w-full " +
            (validatePassword ? "mb-4" : "mb-1")
          }
        >
          <input
            type="password"
            id="pwd2"
            placeholder=" "
            required
            ref={passwordConfirmRef}
            className="w-full rounded-md tracking-wider outline-none border-none text-white px-4 font-extralight h-full bg-transparent relative z-10 peer"
          />
          <p
            htmlFor="pwd2"
            className="absolute text-sm text-white opacity-100  left-3 bg-darkBlue font-light duration-100 transition-all -top-3 ease-linear px-2 peer-placeholder-shown:opacity-50 peer-placeholder-shown:top-2 peer-placeholder-shown:text-lg peer-focus-within:opacity-100  peer-focus-within:-top-3  peer-focus-within:text-sm"
          >
            Password
          </p>
          {validatePassword && (
            <p className="text-red-500 font-light text-sm mt-1 px-1">
              {passwordValidateText}
            </p>
          )}
          <div
            className="absolute pt-1 pr-1 cursor-pointer top-0 right-0 z-10 h-fit"
            onClick={HandlePasswordVisibility}
          >
            <RippleButton color={"#0d417c9e"} speed={700} radius={999}>
              {passwordVisibility ? <EyeVisibility /> : <EyeNotVisibility />}
            </RippleButton>
          </div>
        </div>
        <div className="border- flex justify-center">
          <RippleButton speed={600} color={"#bbb7b7bf"} radius={7} width={40}>
            <button
              type="button"
              className="bg-white rounded-md border-2 h-12 text-lg w-full"
              onClick={handleSubmit}
            >
              {signup_loading ? (
                <div className="mt-2">
                  <ClipLoader size={30} color="#2764eb" speedMultiplier={3} />
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </RippleButton>
        </div>
      </form>
      <div className="flex justify-end flex-col items-end mt-8 gap-3 text-sm text-stone-200 font-extralight w-full">
        <Link
          to={"/login"}
          className="hover:text-skyBlue duration-150 transition-all ease-linear"
        >
          Already have an account? Logn in
        </Link>
      </div>
    </motion.div>
  );
};

export default SignUp;