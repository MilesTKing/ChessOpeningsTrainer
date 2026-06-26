import { Chessboard } from 'react-chessboard';
import Header from '../components/nav/Header.tsx'
function Openings(){
    const chessboardOptions = {
        // your config options here
    };

    return <>
        <Header></Header>
        <Chessboard options={chessboardOptions} />;
    </>

}
export default Openings