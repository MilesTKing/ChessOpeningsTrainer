import styles from './Header.module.css'

import {Link} from 'react-router'
function Header(){

    return (
        <div className={styles.header}>
            <h1 className={styles.headerItem}>Chess Openings Trainer</h1>
            <Link to="training" className={styles.headerItem}>Training</Link>
            <Link to="pathwayCreator" className={styles.headerItem}>Create New Pathway</Link>
            <button className={styles.headerItem}>Log in</button>
        </div>
    )
}
export default Header