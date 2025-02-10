import { useEffect, useRef, useState } from 'react'
import styles from './CartesQuery.module.css'
import Chargement from '../../Chargement/Chargement';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function CartesQuery() {

    const navigate = useNavigate();

    const valRandomPlaceholder = ["Flareon", "Lugia", "Sylveon", "Dragapult", "Noivern", "Espeon", "Raging Bolt", "Iron Valiant", "Heatran", "Sylveon", "Dusknoir"];
    const randomImageIndex = Math.floor(Math.random()*valRandomPlaceholder.length);

    const { pokemonName } = useParams();
    const inputValeurRef = useRef(null);

    const [chargementOn, updateChargement] = useState(true);
    const [errorDetected, updateErrorState] = useState(false);
    const [cartesDisplay, updateCartesDisplay] = useState([]);

    function rechercheAutrePokemon() {
        if (inputValeurRef.current) navigate(`/pokemon/search/${inputValeurRef.current.value}`);
        else return;
    }

    useEffect(() => {
        async function loadCardsByName() {
            updateErrorState(false);
            if (!chargementOn) updateChargement(true);

            try {
                const backendResponse = await axios.get(`http://localhost:5000/pokemon/search/${pokemonName}`)
                updateCartesDisplay(backendResponse.data);
            }

            catch(error) {
                console.error(error);
                updateErrorState(true);
            }

            finally {
                updateChargement(false);
            }
        }
        loadCardsByName();
    }, [pokemonName, inputValeurRef.current]);

    useEffect(() => {
        function appuieSurEntree(event) {
            if (event.key === "Enter") rechercheAutrePokemon();
        }
    
        document.addEventListener('keydown', appuieSurEntree);
        return () => document.removeEventListener('keydown', appuieSurEntree);
    }, [inputValeurRef.current]);

    return (
        <div className={`${styles.resultatRechercheConteneur} apparait`}>
            <h1 className={styles.titre}>
                Résultats pour "<span className={styles.pokemonSelect}>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</span>"
            </h1>

            <div className={styles.inputConteneur}>
                <input type="text" ref={inputValeurRef} className={styles.input} placeholder={`${valRandomPlaceholder[randomImageIndex]}...`} />
                <i onClick={rechercheAutrePokemon} className={`fa-solid fa-magnifying-glass ${styles.icon}`} />
            </div>
    
            <div className={styles.resultatRecherche}>
                {chargementOn ? (
                    <Chargement />
                ) : errorDetected ? (
                    <p className={styles.error}>Une erreur a été détecté.</p>
                ) : (
                    <div className={styles.cartes}>
                        {cartesDisplay.length > 0 && cartesDisplay.map((carte, index) => (
                            <div key={index} className={styles.carte}>
                                <img src={carte.images.small} className={styles.image} />
                            </div>
                        ))}
                        {cartesDisplay.length === 0 && <p className={styles.noResultat}>Aucun résultat pour "{pokemonName.charAt(0).toLocaleUpperCase() + pokemonName.slice(1)}"</p>}
                    </div>
                )}
            </div>
        </div>
    )
}