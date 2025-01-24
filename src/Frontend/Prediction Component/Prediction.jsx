import { useEffect, useRef } from "react";
import styles from "./Prediction.module.css"
import { DataContext } from "../DataContext";
import { useContext } from "react";

function Prediction() {
    const conteneurRef = useRef(null);

    const {predictionOn, updatePrediction} = useContext(DataContext);

    function fermePage() {
        conteneurRef.current.classList.replace(styles.apparait, styles.disparait);

        setTimeout(() => {
            updatePrediction(false);
        }, 300);
    }

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
                        <i className={`${styles.icon} fa-solid fa-xmark`}></i>
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default Prediction;