import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import ReactModal from 'react-modal';
import { Spinner } from '../components/Spinner/Spinner';
import { api } from '../services/api'
import { supabase } from '../services/supabase';
interface IValuesLogin {
    email: string
    password: string
}
export default function Login() {
    const router = useRouter();
    const [values, setValues] = useState<IValuesLogin>({email: "", password:""})
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError]= useState(false)

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (values?.email ==="" || values.password ==="") {
            setError(true)

            return
        }
        setIsOpen(true)
       
        const { user, session, error } = await supabase.auth.signIn(values)
        console.log(user, session, error);

        if (user) {
            authPainel()
        }
        if (error) {
            setIsOpen(false)
            setError(true)
        }
    }
    function authPainel() {
        router.push({
            pathname: '/painel'
        });

    }
    const onChangeValues =(e:ChangeEvent<HTMLInputElement>)=>{

        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <main className='__login'>
            <div>
                <img src="/images/logo.png" alt="" />
            </div>
         
            <form onSubmit={handleLogin} >
                <input
                    value={values?.email}
                    onChange={onChangeValues}
                    type="email"
                    autoComplete='email'
                    name='email'
                    placeholder='Email' />
                <input
                    value={values?.password}
                    name='password'
                    autoComplete="current-password"
                    onChange={onChangeValues}
                    type="password"
                    placeholder='Senha' />
                       {error&&  <section className='__error'>
                <h3>
                    Credenciais Invalidas
                </h3>
            </section>}
                <button type='submit'>Entrar</button>
            </form>
         
            <Spinner isOpen={isOpen} />
        </main>
    )
}
