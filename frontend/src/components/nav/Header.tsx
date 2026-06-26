import styles from './Header.module.css'

import {Link} from 'react-router'
function Header(){

    return (
        <div className={styles.header}>
            <Link to='/' className={styles.headerItem}><h1>Chess Openings Trainer</h1></Link>
            <Link to="/training" className={styles.headerItem}><h2>Training</h2></Link>
            <Link to="/openings" className={styles.headerItem}><h2>Openings</h2></Link>
            <button className={[styles.headerItem, styles.navButton].join(' ')}>Log in</button>
        </div>
    )
}
export default Header