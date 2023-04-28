import AddClass from "./addClasses";
import AddPnj from "./addPnj";
import AddQuest from "./addQuest";

function GameMaster(props){

    return(
        <>
            <AddPnj />
            <AddQuest />
            <AddClass />
        </>
    )
}
export default GameMaster