import {useState} from 'react'
import styles from './Analysis.module.css'
import NodeGraph from './NodeGraph.tsx'
export default function Analysis({onPositionSelection, openingPositions}){
    const [analysisDisplay, setAnalysisDisplay] = useState('nodes')

    function handleNavBarSelection(navSelection: string){
        setAnalysisDisplay(navSelection)
        return
    }

    function setAnalysisBody(){
        switch(analysisDisplay){
            case 'nodes':
                return (
                    <div className={styles.analysisBody}>
                        <NodeGraph openingPositions={openingPositions} onNodeSelection={onPositionSelection}></NodeGraph>
                    </div>
            )
            case 'settings':
                return (<div className={styles.analysisBody}>{`${analysisDisplay} + flip orientation on move`}</div>)
        }
    }
    return (
        <div className={styles.analysis}>
            <h1 className={styles.title}>Opening Path</h1>
            <div className={styles.navBar}>
                <button className={styles.navBarItem} onClick={()=>handleNavBarSelection('nodes')}>Nodes</button>
                <button className={styles.navBarItem} onClick={()=>handleNavBarSelection('settings')}>Settings</button>
            </div>
            {setAnalysisBody()}
        </div>
    )
}