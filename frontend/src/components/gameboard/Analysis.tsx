import styles from './Analysis.module.css'
export default function Analysis(){
    return (
        <div className={styles.analysis}>
            <h1 className={styles.title}>Opening Path</h1>
            <div className={styles.navBar}>
                <div className={styles.navBarItem}>Nodes</div>
                <div className={styles.navBarItem}>Settings</div>
            </div>
            <div className={styles.nodeContainer}>bear</div>
        </div>
        // settings, nodes, 
    )
}