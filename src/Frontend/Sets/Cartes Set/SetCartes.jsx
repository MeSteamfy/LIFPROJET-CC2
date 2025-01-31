import { useContext, useEffect, useState } from 'react';
import { DataContext } from "../../DataContext";
import styles from './SetCartes.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chargement from '../../Chargement/Chargement'
import Prediction from '../../Prediction Component/Prediction';

function SetCartes() {
    const { setID } = useParams();

    const { predictionOn, updateSelectPokemon, updatePrediction, pokemonSelect } = useContext(DataContext)
    const [chargementOn, updateChargement] = useState(true);
    const [cartesDuSet, updateCartesDuSet] = useState([]);

    useEffect(() => {
        async function laod() { // faute de frappe my bad les gars
            try {
                const backendReponse = await axios.get(`http://localhost:5000/sets/${setID}`)
                console.log(backendReponse.data);
                updateCartesDuSet(backendReponse.data);
            }

            catch(error) {
                console.error(error);
            }

            finally {
                updateChargement(false);
            }
        }
        laod()
    }, []);

    const openCarte = (pokemonID) => {
        updateSelectPokemon(pokemonID);
        updatePrediction(true);
    }

    return (
        <div className={`${styles.setsConteneur} apparait`}>
            <h1 className={styles.titre}>
                Set "<span className={styles.setSelect}>{setID.toLocaleUpperCase()}</span>"
            </h1>
            {chargementOn ? <Chargement /> : (
                <div className={styles.cartesDisplay}>
                    {cartesDuSet.map((carte, index) => (
                        <div onClick={() => openCarte(carte.id)} key={index} className={styles.set}>
                            <img className={styles.image} src={carte.images.small}></img>
                        </div>
                    ))}
                </div>
            )}

            {predictionOn && <Prediction pokemonID={pokemonSelect} />}
            
        </div>
    )
}

export default SetCartes;