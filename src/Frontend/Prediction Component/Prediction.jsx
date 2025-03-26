import { useEffect, useRef, useState } from "react";
import styles from "./Prediction.module.css"
import { DataContext } from "../DataContext";
import { useContext } from "react";
import axios from "axios";
import Chargement from "../Chargement/Chargement";

function Prediction(props) {
    const conteneurRef = useRef(null);

    const {predictionOn, updatePrediction, pokemonSelect} = useContext(DataContext);

    const [chargement, updateChargement] = useState(true);
    const [pokemonData, updatePokemonData] = useState([]);

    function fermePage() {
        conteneurRef.current.classList.replace(styles.apparait, styles.disparait);

        setTimeout(() => {
            updatePrediction(false);
        }, 300);
    }

    useEffect(() => {
        if (!props.pokemonID) fermePage();

        const getPokemonInfo = async () => {
            try {
                const backendReponse = await axios.get(`http://localhost:5000/pokemon/${props.pokemonID}`);
                updatePokemonData(backendReponse.data)
            }
    
            catch(error) {
                console.error(error);
            }
    
            finally {
                updateChargement(false);
            }
        }

        getPokemonInfo();
    }, []);

    useEffect(() => {
        function cliqueEnDehors(event) {
            if (conteneurRef.current && event.target === conteneurRef.current) fermePage();
        }

        document.addEventListener("click", cliqueEnDehors);
        return () => document.removeEventListener("click", cliqueEnDehors);
    }, [])

    return (
        <>
            { predictionOn && (
                <div ref={conteneurRef} className={`${styles.predictionConteneur} ${styles.apparait}`}>
                    <div className={styles.prediction}>
                        <i onClick={fermePage} className={`${styles.icon} fa-solid fa-xmark`}></i>
                        <h1 className={styles.title}>Résultats de votre recherche</h1>
                        <div className={`${styles.resultats} ${chargement ? styles.center : ''}`}>
                            {chargement ? <Chargement /> : (
                                <div className={`${styles.carteInfo} apparait`}>
                                    <img src={pokemonData.images.small} className={styles.image} />

                                    <div className={styles.infoConteneur}>
                                        <div className={styles.headerConteneur}>
                                            <div className={styles.header}>
                                                <p className={styles.info}>
                                                    {pokemonData.name}{' '}
                                                    {pokemonData.nationalPokedexNumbers && <span className={styles.nationalNumber}>(N° {pokemonData.nationalPokedexNumbers[0]})</span>}
                                                </p>

                                                {pokemonData.type && (
                                                    <div className={styles.types}>
                                                        <img className={styles.typeImage} src={`/types/${pokemonData.type[0]}.png`} alt={`${pokemonData.type[0]}`}/>
                                                    </div>
                                                )}
                                            </div>

                                            <p className={styles.rarity}>
                                                Rareté: {pokemonData.rarity}
                                            </p>
                                            
                                        </div>

                                        <div className={styles.futurePrix}>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>                        
                    </div>
                </div>
            )}
        </>
    )
}

export default Prediction;