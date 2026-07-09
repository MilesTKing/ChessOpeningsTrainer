import { Chessboard } from 'react-chessboard';
import Header from '../components/nav/Header.tsx'
import Analysis from '../components/gameboard/Analysis.tsx'
import pageStyles from './Page.module.css'
import styles from './Openings.module.css'

function Openings(){
    const chessboardOptions = {
        // your config options here
    };

    return <div className={pageStyles.page}>
        <Header></Header>
        <section className={styles.gameBoard}>
            <Chessboard options={chessboardOptions} />
            <Analysis/>
        </section>
    </div>

}
export default Openings