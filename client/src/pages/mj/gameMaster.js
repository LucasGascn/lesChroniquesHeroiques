import AddClass from "./addClasses";
import AddPnj from "./addPnj";
import AddQuest from "./addQuest";

function GameMaster(props){

    return(
        <>
            <AddPnj  adventure={props.adventure}/>
            <AddQuest  adventure={props.adventure}/>
            <AddClass  adventure={props.adventure}/>
        </>
    )
}
export default GameMaster