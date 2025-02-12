import { useContext, useEffect, useState, useRef } from 'react';
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
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    const fetchCards = async (page) => {
        setLoading(true);
        try {
            const backendReponse = await axios.get(`http://localhost:5000/sets/${setID}?page=${page}`);
            updateCartesDuSet((prevCards) => [...prevCards, ...backendReponse.data]);
        } 
        
        catch (error) {
            console.error(error);
        } 
        
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCards(page);
    }, [page]);

    const lastCardElementRef = useRef((node) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1); 
            }
        });

        if (node) observer.current.observe(node);
    });

    useEffect(() => {
        updateChargement(false);
    }, [cartesDuSet]);

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
                    {cartesDuSet.map((carte, index) => {
                        if (cartesDuSet.length === index + 1) {
                            return (
                                <div ref={lastCardElementRef} onClick={() => openCarte(carte.id)} key={carte.id} className={styles.set}>
                                    <img className={styles.image} src={carte.images.small} alt={`Carte ${carte.id}`} />
                                </div>
                            );
                        } 
                        
                        else {
                            return (
                                <div onClick={() => openCarte(carte.id)} key={carte.id} className={styles.set}>
                                    <img className={styles.image} src={carte.images.small} alt={`Carte ${carte.id}`} />
                                </div>
                            );
                        }
                    })}
                </div>
            )}

            {loading && <Chargement />} 
            {predictionOn && <Prediction pokemonID={pokemonSelect} />}
        </div>
    );
}

export default SetCartes;
