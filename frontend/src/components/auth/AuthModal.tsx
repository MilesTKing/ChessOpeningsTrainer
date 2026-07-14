import styles from './AuthModal.module.css'
import {useState} from 'react'
import {getCookie} from '../../utils/cookies.ts'
export default function AuthModal({onClose}: {onClose: () => void}) {
    const [authMethod, setAuthMethod] = useState('login')
    async function loginUser(e: React.SubmitEvent){
        e.preventDefault()
        const formData = new FormData(e.target)
        const login_URL= import.meta.env.VITE_OPENINGS_API_BASE_URL + import.meta.env.VITE_OPENINGS_API_LOGIN
        const csrftoken = getCookie('csrftoken')
        const response= await fetch(login_URL, {
            method: 'POST',
            body: formData,
            headers: {
                "X-CSRFToken": csrftoken || "",
            },
            credentials: 'include',
        })
        if(response.ok){
            onClose()
        }

    }
    async function registerUser(e: React.SubmitEvent) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const register_URL= import.meta.env.VITE_OPENINGS_API_BASE_URL + import.meta.env.VITE_OPENINGS_API_REGISTER
        const csrftoken = getCookie('csrftoken')

        const response= await fetch(register_URL, {
            method: 'POST',
            body: formData,
            headers: {
                "X-CSRFToken": csrftoken || "",
            },
            credentials: 'include'
        })
        if (response.ok) {

            onClose()
        }
    }

    if (authMethod === 'login') {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Log in</h1>
                    <div className={styles.authMethodSelector}>
                        <p>Don't have an account?</p>
                        <button onClick={()=>setAuthMethod('signup')}>Sign Up!</button>
                    </div>
                </div>
                <div className={styles.body}>
                    <form className={styles.authForm} onSubmit={loginUser}>
                        <label htmlFor="name">
                            Name
                            <input name={'name'} type={'text'} placeholder={'name'}></input>
                        </label>
                        <label htmlFor="email">
                            Email
                            <input name={'email'} type={'email'} placeholder={'email'}></input>
                        </label>
                        <label htmlFor="password">
                            Password
                            <input name={'password'} type={'password'} placeholder={'password'}></input>
                        </label>
                        <input type={'submit'} value={'Submit'} ></input>
                    </form>
                </div>
            </div>
        )
    }
    else if (authMethod === 'signup') {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Sign Up</h1>
                    <div className={styles.authMethodSelector}>
                        <p>Already have an Account?</p>
                        <button onClick={()=>setAuthMethod('login')}>Sign Up!</button>
                    </div>
                </div>
                <div className={styles.body}>
                    <form className={styles.authForm} onSubmit={registerUser}>
                        <label htmlFor="name">
                            Name
                            <input name={'name'} type={'text'} placeholder={'name'}></input>
                        </label>
                        <label htmlFor="email">
                            Email
                            <input name={'email'} type={'email'} placeholder={'email'}></input>
                        </label>
                        <label htmlFor="password">
                            Password
                            <input name={'password'} type={'password'} placeholder={'password'}></input>
                        </label>
                        <input type={'submit'} value={'Submit'} ></input>
                    </form>
                </div>
            </div>
        )
    }
}