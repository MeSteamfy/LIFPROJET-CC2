import { useRef } from "react";
import styles from "./Main.module.css"

function Main() {
    const inputValeurRef = useRef(null);
    const valRandomPlaceholder = ["Flareon", "Lugia", "Sylveon", "Dragapult", "Noivern", "Espeon", "Raging Bolt", "Iron Valiant", "Heatran", "Sylveon", "Dusknoir"];
    const randomImageIndex = Math.floor(Math.random()*valRandomPlaceholder.length);

    function testIcon() {
        if (inputValeurRef.current && inputValeurRef.current.value.length > 0) {
            console.log("Envoi dans le backend...");
        }
    }

    return (
        <div className={styles.mainConteneur}>
            <p className={styles.description}>
                Prédiction des Prix des Cartes à Collectionner <span className={styles.span}>Pokémon TCG!</span>
            </p>
            <div className={styles.bas}>
                <div className={styles.gauche}>
                    <h1 className={styles.titre}>PoketchAPI</h1>
                    <div className={styles.inputConteneur}>
                        <input type="text" ref={inputValeurRef} className={styles.input} placeholder={`${valRandomPlaceholder[randomImageIndex]}...`} />
                        <i onClick={testIcon} className={`fa-solid fa-magnifying-glass ${styles.icon}`} />
                    </div>
                    <p className={styles.info}>
                        Ce site utilise l'API <span className={styles.span}>[indiquer ici le nom de l'api qu'on utilisera]</span> pour récupérer les données.
                    </p>
                </div>
                
                <img src={`/${randomImageIndex +1}.png`} className={styles.image} />
            </div>
            

        </div>
    )
}

export default Main;