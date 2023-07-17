"use client";

import { useAppSelector, useAppDispatch } from "@/store";
import { logout } from "@/store/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";

const SIZE = 24;

function AccountIcon() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <span className="inline-flex items-center justify-center p-2">
      {user && (
        <button 
          title={user.name}
          className="border-none outline-none"
          onClick={() => dispatch(logout())}>
          <Image
            src="/user-64.png"
            alt={`${user.name} avatar`}
            width={SIZE}
            height={SIZE} />
        </button>
      )}
      {!user && (
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