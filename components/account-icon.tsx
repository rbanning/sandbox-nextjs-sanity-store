/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { initialize, logout } from "@/store/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";

const SIZE = 24;

function AccountIcon() {
  const {user, isAuthenticated} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, []);
  
  return (
    <span className="inline-flex items-center justify-center p-2">
      {isAuthenticated && (
        <button 
          title={user?.name || 'User'}
          className="border-none outline-none"
          onClick={() => dispatch(logout())}>
          <Image
            src="/user-64.png"
            alt="avatar"
            width={SIZE}
            height={SIZE} />
        </button>
      )}
      {!isAuthenticated && (
        <Link href="/auth/login" className="opacity-70 hover:opacity-100 transition-opacity">
          <Image
            src="/login-64.png"
            alt={`login avatar`}
            width={SIZE}
            height={SIZE} />
        </Link>
      )}
    </span>
  )
}

export default AccountIcon;