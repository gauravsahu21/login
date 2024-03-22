"use client";

import axios from "axios";
import { useState } from "react";

const CLASS_MAP = {
  container: "",
  input:
    "w-full rounded border border-stroke px-[30px] py-3 text-base text-body-color outline-none ",
};

export default function Home() {
  const [register, setRegister] = useState(false);
  const [reset, setReset] = useState(false);
  const [errorMes,setError]=useState("");


  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (register) {
      if(password===confirmPassword)
      {
        const user = await axios({
          method: "post",
          url: "http://localhost:3000/register",
          data: {
            userid: email,
            password: password,
          },
        });
      }else{
      setError("Both password should be same")

      }
      
    } else {
      const data = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          userid: email,
          password: password,
        },
      });
      if(!data.data.success)
      {
      setError("Email or Password is Incorrect");
      }
  
    }
  }
  async function onReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const data = await axios({
      method: "get",
      url: `http://localhost:3000/forgot?email=${email}`,
    });
    if(!data.data.success){
      console.log(data,"^^^^^^^^^^^^^^^^^^^^^^^^")
      setError("No user found with this email")
    }else{
      setReset(!reset)
    }

    
  }

  return (
    <>
      <div className="flex items-center flex-col p-8 mx-auto  w-[90%] md:w-[35%] bg-blue-200 my-24 rounded-lg">
        {!reset ? (
          <>
            <p className="text-2xl">{!register ? "Login" : "Register"}</p>
            <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
              <label htmlFor="email" className="">
                Email Id:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className={CLASS_MAP.input}
                required
              ></input>

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                className={CLASS_MAP.input}
                required
              ></input>

              {register && (
                <>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={CLASS_MAP.input}
                    required
                  ></input>
                </>
              )}
                {errorMes.length!=0 &&<span className="text-red-400">{errorMes}</span>}
              <input
                type="submit"
                value={
                  !register
                    ? !reset
                      ? "Login"
                      : "Send Reset Password"
                    : "Register"
                }
                className="p-3 bg-blue-500 rounded-lg mt-8"
                required
              ></input>
            
            </form>
            {!register ? (
              <div className="my-2">
                <span>
                  Don’t have an account?{" "}
                  <span
                    className="text-blue-500"
                    onClick={(e) => {
                      setRegister(!register);
                      setError("");
                    }}
                  >
                    Register now
                  </span>
                </span>
              </div>
            ) : (
              <div className="my-2">
                <span>
                  Already have an account?
                  <span
                    className="text-blue-500"
                    onClick={(e) => {
                      setRegister(!register);
                      setError("");
                    }}
                  >
                    {" "}
                    Login here
                  </span>
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl">{"Reset"}</p>
            <form className="flex flex-col space-y-4" onSubmit={onReset}>
              <label htmlFor="email" className="">
                Email Id:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className={CLASS_MAP.input}
                required
              ></input>
              {errorMes.length!=0 &&<span className="text-red-400">{errorMes}</span>}
              <input
                type="submit"
                value={
                  !register
                    ? !reset
                      ? "Login"
                      : "Send Reset Password"
                    : "Register"
                }
                className="p-3 bg-blue-500 rounded-lg mt-8"
              ></input>
            </form>
          </>
        )}
        {!register && (
          <div className="my-4">
            <span
              className="mx-4 "
              onClick={() => {
                setReset(!reset);
                setError("");
              }}
            >
              {!reset ? "Reset Password" : "Login Page"}?
            </span>
          </div>
        )}
      </div>
    </>
  );
}
