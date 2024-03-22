"use client";

import { useState } from "react";

const CLASS_MAP = {
  container: "",
  input:
    "w-full rounded border border-stroke px-[30px] py-3 text-base text-body-color outline-none ",
};

export default function Home() {
  const [register, setRegister] = useState(false);
  const [reset, setReset] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    console.log(formData, "^^^^^^^^^^^^^^^");
    const value = formData.get("email");
    console.log(value, "^^^^^^^^^^^^^^");
    // const errorState = getValidationData({
    //   formData,
    //   items,
    // });

    // if (Object.keys(errorState).length!=0) {
    //   setErrorState(errorState);
    // } else {
    //   setErrorState(errorState);
    //   updateData({ name, formData, items, jobId });
    // }
  }
  const handleReset = () => {};

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
              ></input>
            
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={CLASS_MAP.input}
                ></input>
            
              {register && (
                <>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={CLASS_MAP.input}
                  
                  ></input>
                </>
              )}
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
            {!register ? (
              <div className="my-2">
                <span>
                  Don’t have an account?{" "}
                  <span
                    className="text-blue-500"
                    onClick={(e) => {
                      setRegister(!register);
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
          <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
          <label htmlFor="email" className="">
                Email Id:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className={CLASS_MAP.input}
              ></input>
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
