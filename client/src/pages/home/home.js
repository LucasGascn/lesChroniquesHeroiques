import Save from "./save";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const listAventures = [{
    name: "Aventure1",
    date: "05/02",
    character: "Ponchek Entartai"
},
{
    name: "Aventure2",
    date: "07/17",
    character: "Ambrer Nodule"
},
{
    name: "Aventure3",
    date: "07/17",
    character: "Fylk Clabaude"
}
]

const Home = ({ ...props }) => {
    return <div className="home__content">
        <p id="home__title">Lancez vous dans une nouvelle aventure !</p>
        <div className="home__start">
            <div className="home__start__buttons">
                <Button size="lg">Rejoindre</Button>
                <Button size="lg">Créer</Button>
            </div>
            <div className="home__saves">
                <div style={{ border: "none", boxShadow: "none" }} bg="transparent">
                    <div className="home__save__card-header">Continuer</div>
                    <div className="home__save__card-body">
                        <div className="home__aventures">
                            {/*listAventures.map(({ name, date, character }, index) => <Save key={`table-line-${index}`} name={name} date={date} character={character} />)*/}
                            {listAventures.map((arg, index) => <Save key={`table-line-${index}`} {...arg} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="home__desc">
            <p id="home__desc__1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis ullamcorper velit. Quisque varius justo vel tempus tincidunt. Sed at ligula eu quam pulvinar semper. Etiam luctus, ipsum venenatis bibendum consectetur, leo dui hendrerit neque, sagittis volutpat risus neque et metus. Donec malesuada fermentum tellus non faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc non fermentum mauris. Cras eget convallis urna. Aliquam erat volutpat. Phasellus suscipit ornare nisi.
            </p>
            <p id="home__desc__2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis ullamcorper velit. Quisque varius justo vel tempus tincidunt. Sed at ligula eu quam pulvinar semper. Etiam luctus, ipsum venenatis bibendum consectetur, leo dui hendrerit neque, sagittis volutpat risus neque et metus. Donec malesuada fermentum tellus non faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc non fermentum mauris. Cras eget convallis urna. Aliquam erat volutpat. Phasellus suscipit ornare nisi.
            </p>

        </div>
    </div>
        ;
}

export default Home;