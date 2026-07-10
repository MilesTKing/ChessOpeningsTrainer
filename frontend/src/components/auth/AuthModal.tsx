import styles from './AuthModal.module.css'
import {useState} from 'react'
export default function AuthModal({onClose}: {onClose: () => void}) {
    const [authMethod, setAuthMethod] = useState('login')
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
                    <form className={styles.authForm}>
                        <label htmlFor="email">
                            Email
                            <input name={'email'} type={'email'} placeholder={'email'}></input>
                        </label>
                        <label htmlFor="password">
                            Password
                            <input name={'password'} type={'password'} placeholder={'password'}></input>
                        </label>
                        <input type={'button'} value={'Submit'} onClick={onClose}></input>
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
                    <form className={styles.authForm}>
                        <label htmlFor="email">
                            Email
                            <input name={'email'} type={'email'} placeholder={'email'}></input>
                        </label>
                        <label htmlFor="password">
                            Password
                            <input name={'password'} type={'password'} placeholder={'password'}></input>
                        </label>
                        <input type={'button'} value={'Submit'} onClick={onClose}></input>
                    </form>
                </div>
            </div>
        )
    }
}