
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import authLogin from "../services/auth/authLogin";
import authPainel from "../services/auth/authPainel";
import { supabase } from "../services/supabase";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    redirect()
  }, [])

  const redirect = async () => {
    const session = supabase.auth.session()
    if (session?.expires_at < new Date().getTime()) {
      authPainel(router)
    } else {
      authLogin(router)
    }
  }
  
  return (
    <>
      <main className="__main">
        <img src="/images/logo.png" alt="" />
      </main>
    </>
  )
}
