import { useEffect, useRef, useState, useContext } from "react";
import styles from "./Prediction.module.css"
import { DataContext } from "../DataContext";
import axios from "axios";
import Chargement from "../Chargement/Chargement";

function Prediction(props) {
    const conteneurRef = useRef(null);
    const dateRef = useRef(null);

    const {predictionOn, updatePrediction} = useContext(DataContext);

    const [chargement, updateChargement] = useState(true);
    const [chargementPredict, updateChargementPredict] = useState(false);
    const [pokemonData, updatePokemonData] = useState([]);
    const [erreurDetecte, updateErreur] = useState(false);
    const [anneeChoisi, updateAnneeChoisi] = useState("");

    const [predictionData, setPredictionData] = useState([]);

    function fermePage() {
        conteneurRef.current.classList.replace(styles.apparait, styles.disparait);

        setTimeout(() => {
            updatePrediction(false);
        }, 300);
    }

    const checkDateFormat = async () => {
        updateErreur(false);
        updateAnneeChoisi("");
        setPredictionData([]);
        updateChargementPredict(true);
        
        if (dateRef.current && /^\d{4}-\d{2}-\d{2}$/.test(dateRef.current.value)) {
            const carteInfoTab = pokemonData.id.split('-');
            const carteID = carteInfoTab[1];
            const setID = carteInfoTab[0];

            try {
                const backendResponse = await axios.get("http://localhost:5000/pokemon/prediction", {
                    params: {
                      id: carteID,
                      date: dateRef.current.value,
                      extension: setID,
                      state: "normal-good"
                    }
                  },
                );
                setPredictionData(backendResponse.data);
            }

            catch(error) {
                console.error(error);
            }

            updateAnneeChoisi(dateRef.current.value);
        }

        else updateErreur(true);

        updateChargementPredict(false);
    }

    useEffect(() => {
        if (props.pokemonID) {
            const getPokemonInfo = async () => {
                try {
                    const backendReponse = await axios.get(`http://localhost:5000/pokemon/${props.pokemonID}`);
                    updatePokemonData(backendReponse.data);                
                    console.log(backendReponse.data)    
                }
        
                catch(error) {
                    console.error(error);
                }
        
                finally {
                    updateChargement(false);
                }
            }
    
            getPokemonInfo();
        }

        else fermePage();
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
                                            <div className={styles.testContainer}>
                                                <input ref={dateRef} className={styles.input} type="text" placeholder="2022-01-01" onKeyDown={(e) => e.key === "Enter" ? checkDateFormat() : ''} />
                                                {erreurDetecte && (
                                                    <p className={styles.erreur}>La date doit être du type "YYYY-MM-DD"</p>
                                                )}
                                            </div>
                                            
                                            <div className={styles.predictionPrixContainer}>
                                                <div className={styles.predictionInfo}>
                                                <p className={styles.prix}>Prix actuelle: ${pokemonData.marketPrix?.prices.holofoil?.market || pokemonData.marketPrix?.prices.normal.market || ' Trop récente'}</p>

                                                    { chargementPredict ? <Chargement /> : 
                                                        ( 
                                                            anneeChoisi && <p className={styles.prix}>Prix prédit pour {new Date(dateRef.current.value).getFullYear()}: ${predictionData.predicted_price?.toFixed(2) || "Erreur lors de la récupération des données"}</p> 
                                                        )
                                                    }
                                                </div>

                                                <div className={styles.graphesContainer}>


                                                </div>
                                            </div>
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