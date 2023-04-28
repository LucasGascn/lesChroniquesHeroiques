import AddClass from "./addClasses";
import AddPnj from "./addPnj";
import AddQuest from "./addQuest";

function GameMaster(props){

    return(
        <>
            <div className="mj__grid">
                <div className="mj__grid-form" id="div_1"><AddPnj  adventure={props.adventure}/></div>
                <div className="mj__grid-form" id="div_2"><AddQuest  adventure={props.adventure}/></div>
                <div className="mj__grid-form" id="div_3"><AddClass  adventure={props.adventure}/></div>
            </div>
            
        </>
    )
}
export default GameMaster