"use client";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

import Loading from "@/components/Loading";
import Typography from "@/components/Typography";

const Login: NextPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [userInfo, SetUserInfo] = useState({
    email: "",
    password: "",
  });
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    SetUserInfo({ ...userInfo, [name]: value });
  };

  const handleLoginSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setShowLoading(false);
      return setError(res.error);
    }

    if (res?.ok) router.push("/");
    setShowLoading(false);
  };

  return (
    <>
      {showLoading ? (
        <Loading />
      ) : (
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <Image
                priority
                style={{ height: "5rem", width: "5rem" }}
                width={60}
                height={60}
                className="w-8 h-8 mr-2"
                src="/logo.png"
                alt="logo"
              />
              <Typography>ERP System</Typography>
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleLoginSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={email}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="admin@demo.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      value={password}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="admin123"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <p className="text-red-900 text-center">-- {error} --</p>

                  <button
                    type="submit"
                    className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
