import { useEffect, useRef } from "react";
import styles from "./Main.module.css"
import { useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate();

    const mainRef = useRef(null);
    const inputValeurRef = useRef(null);

    const valRandomPlaceholder = ["Flareon", "Lugia", "Sylveon", "Dragapult", "Noivern", "Espeon", "Raging Bolt", "Iron Valiant", "Heatran", "Sylveon", "Dusknoir"];
    const randomImageIndex = Math.floor(Math.random()*valRandomPlaceholder.length);

    function getCartesBySearch() {
        // si la valeur dans la ref est défini, alors on navigue dans la route avec la valeur de l'input
        if (inputValeurRef.current) navigate(`/pokemon/search/${inputValeurRef.current.value}`);
        else return;
    }

    useEffect(() => {
        // La fonction va utiliser l'API IntersectionObserver pour faire, lors d'un certain pourcentage de visibilité
        // d'un élément sur l'écran, lui appliquer une fonction, ici on le donne la visibilité.
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                        observer.unobserve(entry.target);
                    }
                })
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (mainRef.current) observer.observe(mainRef.current);
        return () => {
            if (mainRef.current) observer.unobserve(mainRef.current);
        }
    }, []);

    useEffect(() => {
        function appuieSurEntree(event) {
            if (event.key === "Enter") getCartesBySearch();
        }
    
        document.addEventListener('keydown', appuieSurEntree);
        return () => document.removeEventListener('keydown', appuieSurEntree);
    }, [inputValeurRef.current]);

    return (
        <div className={styles.mainConteneur}>
            <div ref={mainRef} className={styles.main}>
                <p className={styles.description}>
                    Prédiction des Prix des Cartes à Collectionner <span className={styles.span}>Pokémon TCG!</span>
                </p>
                <div className={styles.bas}>
                    <div className={styles.gauche}>
                        <h1 className={styles.titre}>PoketchAPI</h1>
                        <div className={styles.inputConteneur}>
                            <input type="text" ref={inputValeurRef} className={styles.input} placeholder={`${valRandomPlaceholder[randomImageIndex]}...`} />
                            <i onClick={getCartesBySearch} className={`fa-solid fa-magnifying-glass ${styles.icon}`} />
                        </div>
                        <p className={styles.info}>
                            Ce site utilise l'API <a target="_blank" href="https://docs.pokemontcg.io/" className={styles.span}>Pokémon TCG API</a> pour récupérer les données.
                        </p>
                    </div>
                    
                    <img src={`/${randomImageIndex +1}.png`} className={styles.image} />
                </div>
            </div>
        </div>
    )
}

export default Main;
