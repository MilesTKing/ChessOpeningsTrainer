import styles from './Header.module.css'
import AuthModal from '../auth/AuthModal'
import {Link} from 'react-router'
import {useState} from "react";
function Header(){
    const [authModalOpen, setAuthModalOpen] = useState(false)
    return (
        <div className={styles.header}>
            <Link to='/' className={styles.headerItem}><h1>Chess Openings Trainer</h1></Link>
            <Link to="/training" className={styles.headerItem}><h2>Training</h2></Link>
            <Link to="/openings" className={styles.headerItem}><h2>Openings</h2></Link>
            <button className={[styles.headerItem, styles.navButton].join(' ')} onClick={()=>setAuthModalOpen(true)}>Log in</button>
            {authModalOpen && (
                <AuthModal onClose={() => setAuthModalOpen(false)} />
            )}
        </div>
    )
}
export default Header