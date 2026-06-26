import { Chessboard } from 'react-chessboard';
import Header from '../components/nav/Header.tsx'
import pageStyles from './Page.module.css'

function Training(){
    const chessboardOptions = {
        // your config options here
    };

    return <div className={pageStyles.page}>
        <Header></Header>
        <Chessboard options={chessboardOptions} />;
    </div>

}
export default Training;