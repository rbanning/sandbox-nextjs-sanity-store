"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { login, logout } from "@/store/features/auth/authSlice";


function AccountLogin() {
  const { user, status, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value,
      password: (e.currentTarget.elements.namedItem('password') as HTMLInputElement)?.value,
    };

    if (data.email && data.password) {
      console.log("submit", data);
      dispatch(login(data));
    }
  }

  return (
    <>
    {isAuthenticated && (
      <>
      <h2 className="mb-4 text-2xl font-thin">Welcome, <span className="font-normal">{user?.name || 'User'}</span></h2>
      <Link href="/"
          className="mx-4 rounded border-2 border-fuchsia-600 text-slate-600 py-1 px-2 text-base">
            Home
        </Link>
      </>
    )}
    {!isAuthenticated && (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="my-4">
          <label htmlFor="email" className="block font-semibold text-slate-400">
            Email<span className="text-fuchsia-200">*</span>
          </label>
          <input type="text" required name="email" className="block w-80 text-lg py-1 px-2 rounded border-2 border-slate-600" />
        </div>        
        <div>
          <label htmlFor="password" className="block font-semibold text-slate-400">
            Password<span className="text-fuchsia-200">*</span>
          </label>
          <input type="password" required name="password" className="block w-80 text-lg py-1 px-2 rounded border-2 border-slate-600" />
        </div>
        {status === 'error' && (
          <span className="text-rose-700">ERROR: {error || "Problem authenticating... please try again"}</span>
        )}        
        {status === 'working' && (
          <span className="text-fuchsia-400">
            <span className="text-xl animate-spin">X</span>
            <span className="mx-4">working...</span>
          </span>
        )}
        <div className="my-4 flex items-center">
          <button
            type="submit"
            disabled={status === 'working'}
            className="mx-4 rounded border-none bg-fuchsia-600 text-fuchsia-50 py-1 px-2 text-base disabled:opacity-30">
              Login
          </button>
          <Link href="/"
            data-disabled={status === 'working'}
            className="mx-4 rounded border-2 border-fuchsia-600 text-slate-600 py-1 px-2 text-base data-[disabled='true']:opacity-30">
              Cancel
          </Link>
        </div>
      </form>    
    )}
    </>    
  )
}

export default AccountLogin;