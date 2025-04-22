import { useEffect, useRef } from 'react';
import styles from './JSON.module.css'

function JSONSection() {
    const jsonBox = useRef(null);

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

        if (jsonBox.current) observer.observe(jsonBox.current);
        return () => {
            if (jsonBox.current) observer.unobserve(jsonBox.current);
        }
    }, []);

    return (
        <div className={styles.jsonConteneur}>
            <div ref={jsonBox} className={styles.json}>
                <p className={styles.description}>
                    Une application utilisant le <span className={styles.span}>machine learning</span> pour prédire les prix!
                </p>
                <div className={styles.bas}>
                    <img src={"/Venusaur.png"} className={styles.image} />

                    <code className={styles.code}>
                        <span className={styles.line}>{'{'}</span>
                        <span className={`${styles.line} ${styles.tab}`}>"data": {'{'}</span>
                        <span className={`${styles.line} ${styles.margin}`}>"id": "xy1-1",</span>
                        <span className={`${styles.line} ${styles.margin}`}>"name": "Venusaur-EX",</span>
                        <span className={`${styles.line} ${styles.margin}`}>"supertype": "Pokémon",</span>


                        <span className={`${styles.line} ${styles.margin}`}>...,</span><br />

                        <span className={`${styles.line} ${styles.margin}`}>"prices": {'{'}</span>
                        <span className={`${styles.line} ${styles.push}`}>"low": 1.0,</span>
                        <span className={`${styles.line} ${styles.push}`}>"mid": 3.46,</span>
                        <span className={`${styles.line} ${styles.push}`}>"high": 12.95,</span>
                        <span className={`${styles.line} ${styles.push}`}>"market": 3.32,</span>
                        <span className={`${styles.line} ${styles.push}`}>"directLow": 2.95</span>
                        <span className={`${styles.line} ${styles.push} ${styles.predict}`}>"predictionPrice": 9.51,</span>
                        <span className={`${styles.line} ${styles.push} ${styles.predict}`}>"predictionYear": 2025</span>
                        <span className={`${styles.line} ${styles.margin}`}>{'},'}</span>

                        <span className={`${styles.line} ${styles.margin}`}>...,</span>
                        <span className={styles.line}>{'}'}</span>
                    </code>
                </div>
            </div>
        </div>
    )
}

export default JSONSection;
