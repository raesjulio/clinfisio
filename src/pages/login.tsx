import { useRouter } from 'next/router';
import React from 'react'
import { api } from '../services/api'
import { supabase } from '../services/supabase';

export default function Login() {
  const router = useRouter();

    const handleLogin = async () => {
        const data = {
            "email": "abdiaspc@live.com",
            "password": "123456"
        }

        const { user, session, error } = await supabase.auth.signIn(data)
        if (user) {
            authPainel()
        }
    }
    function authPainel() {
        router.push({
          pathname: '/painel'
        });
    
      }
    return (
        <div>

            <input type="text" />
            <input type="text" />
            <button onClick={handleLogin}>login</button>
        </div>
    )
}
