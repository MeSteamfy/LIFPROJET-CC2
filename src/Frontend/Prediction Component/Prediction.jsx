import { useEffect, useRef, useState, useContext } from "react";
import styles from "./Prediction.module.css"
import { DataContext } from "../DataContext";
import axios from "axios";
import Chargement from "../Chargement/Chargement";

function Prediction(props) {
    const conteneurRef = useRef(null);
    const predictTextRef = useRef(null);

    const {predictionOn, updatePrediction, pokemonSelect} = useContext(DataContext);

    const [chargement, updateChargement] = useState(true);
    const [chargementPredict, updateChargementPredict] = useState(true);
    const [pokemonData, updatePokemonData] = useState([]);
    const [anneeChoisir, setAnneeData] = useState("2026");
    const anneeTableau = ["2022","2023","2024","2025","2026","2027"];

    const changerAnnee = event => {
      setAnneeData(event.target.value);
    };

    function fermePage() {
        conteneurRef.current.classList.replace(styles.apparait, styles.disparait);

        setTimeout(() => {
            updatePrediction(false);
        }, 300);
    }

    useEffect(() => {
        if (props.pokemonID) {
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

    useEffect(() => {
        const testAPICall = () => {
            // ici on met l'appel axios avec try catch et tout le tralala

            setTimeout(() => {
                updateChargementPredict(false);
            }, 5000)
        }
        testAPICall()
    }, []);

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
                                            <div className={styles.radioContainer}>
                                                {anneeTableau.map((val, index) => (
                                                    <label key={index} className={`${styles.customRadio} ${anneeChoisir === val ? styles.selected : ''}`}>
                                                        <input type="radio" name="anneeChoix" value={val} checked={anneeChoisir === val} onChange={changerAnnee} />
                                                        <span className={styles.radioBtn}></span>
                                                        {val}
                                                    </label>
                                                ))}
                                            </div>
                                            
                                            <div className={styles.predictionPrixContainer}>
                                            { chargementPredict ? (
                                                <Chargement />
                                            ) : (
                                                <div className={styles.predictionInfo}>
                                                    <p className={styles.prix}>Prix actuelle: {Math.floor(Math.random() * 100) +2}€</p>
                                                    <p className={styles.prix}>Prix prédit en <span className={styles.span}>{anneeChoisir}</span>: {Math.floor(Math.random() * 100) +2}€</p>
                                                </div>
                                            )}

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