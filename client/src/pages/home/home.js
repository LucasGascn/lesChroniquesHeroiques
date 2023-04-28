import Save from "./save";
import Button from 'react-bootstrap/Button';
import FadeIn from "../shared/fade-in";
import Description from "./description";
import Image from 'react-bootstrap/Image';
import Table from '../../assets/images/table.png'
import Adventurer from '../../assets/images/wizard.png'
import MJ from '../../assets/images/mj-icon.png'
import Univers from '../../assets/images/fantasy.png'
import Bulle from './bulles'


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

const bulles = [
    {
        name: "univers",
        image: Univers,
        text: "L'univers",
        content: "Votre personnage progresse dans un univers dépendant de l'imaginaire du maître de jeu. Il peut être issu de différentes périodes ou inspirés de multiples ouvrages construisant son Histoire et ses habitants fantasmagoriques. De la science fiction au lovecraft en passant par les croisades, vos héros seront démenés à la découverte des recoins de ces mondes chimériques."
    },
    {
        name: 'aventurier',
        image: Adventurer,
        text: "L'aventurier",
        content: "C’est à vous d’interpréter votre aventurier, d’interagir comme si vous étiez à sa place et de décider librement de ses actions. Choisir votre Personnage est donc un moment-clé. Vous allez être l’un des héros de l’histoire qui sera racontée. Alors faites le bon choix !"
    },
    {
        name: "mj",
        image: MJ,
        text: "Le maître du jeu",
        content: "Le MJ a un rôle central dans le JDR. Il en a même plusieurs : scénariste (il prépare le scénario), conteur (il raconte l’histoire et décrit les situations), acteur (il incarne les personnages que les PJ ne jouent pas), et même arbitre si besoin (c’est à lui de trancher en cas de litige sur les règles).",
    }
]

const description = [
    {
        direction: 'right',
        content: "Le JDR est un jeu de société collaboratif dans lequel les joueurs travaillent ensemble pour créer une histoire. Les joueurs créent des personnages en utilisant des fiches de personnages qui décrivent les compétences, les caractéristiques et les traits de leur personnage. Le maître du jeu crée un monde imaginaire et décrit les événements qui se produisent dans cet univers. Les joueurs interagissent avec cet univers en prenant des décisions et en effectuant des actions qui sont résolues en utilisant des dés."
    },
    {
        direction: 'left',
        content: "Le maître du jeu est responsable de créer des scénarios, de décrire les lieux, les personnages avatar et les événements qui se produisent dans le monde imaginaire. Le maître du jeu joue également les personnages non-joueurs qui interagissent avec les personnages des joueurs. Les joueurs peuvent interagir avec l'environnement, résoudre des énigmes, combattre des ennemis, négocier avec des personnages non-joueurs et accomplir des quêtes. Le JDR est un jeu très flexible qui permet aux joueurs d'utiliser leur imagination pour créer des histoires uniques."
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
                            {listAventures.map((arg, index) => <Save key={`table-line-${index}`} {...arg} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="home__desc">
            {description.map((arg, index) => <Description key={`description-${index}`} {...arg}></Description>)}
        </div>
        <div className="home__grid-container">
            <div className="home__table">
                <Image className="home__table__image" fluid src={Table}></Image>
                {bulles.map((arg, index) => <Bulle key={`bulle-${index}`} {...arg}></Bulle>)}

            </div>
        </div>
    </div>

}

export default Home;
