import { useContext, useEffect, useState } from 'react';
import { DataContext } from "../../DataContext";
import styles from './SetCartes.module.css'
import axios from 'axios';

import { useParams } from 'react-router-dom';
import Chargement from '../../Chargement/Chargement'
import Prediction from '../../Prediction Component/Prediction';

function SetCartes() {
    const { setID } = useParams();
    const { predictionOn, updateSelectPokemon, updatePrediction, pokemonSelect } = useContext(DataContext);
    const [chargementOn, updateChargement] = useState(true);
    const [cartesDuSet, updateCartesDuSet] = useState([]);

    const fetchCards = async () => {
        updateChargement(true);
        try {
            const backendReponse = await axios.get(`http://localhost:5000/sets/${setID}`);
            updateCartesDuSet(backendReponse.data);
        } 
        
        catch (error) {
            console.error(error);
        } 
        
        finally {
            updateChargement(false);
        }
    };

    useEffect(() => {
        fetchCards()
    }, [])

    function openCarte(pokemonID) {
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
                    { cartesDuSet.length === 0 ? (
                        <p className={styles.noResults}>
                            Aucun résultat pour le set avec l'ID: {setID.toLocaleUpperCase()}
                        </p>
                    ) : cartesDuSet.map((carte, index) => (
                        <div onClick={() => openCarte(carte.id)} className={styles.carte} key={index}>
                            <img src={carte.images.small} className={styles.image} />
                        </div>
                    ))}
                </div>
            )}
            {predictionOn && <Prediction pokemonID={pokemonSelect} />}
        </div>
    );
}

export default SetCartes;
