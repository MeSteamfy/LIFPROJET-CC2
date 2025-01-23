import styles from './JSON.module.css'

function JSONSection() {
    return (
        <div className={styles.jsonConteneur}>
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
                    <span className={`${styles.line} ${styles.margin}`}>"supertype": "Pokémon"</span>
                    <span className={`${styles.line} ${styles.tab}`}>{'},'}</span>

                    <span className={`${styles.line} ${styles.margin}`}>...</span>

                    <span className={`${styles.line} ${styles.tab}`}>"prices": {'{'}</span>
                    <span className={`${styles.line} ${styles.margin}`}>"low": 1.0,</span>
                    <span className={`${styles.line} ${styles.margin}`}>"mid": 3.46,</span>
                    <span className={`${styles.line} ${styles.margin}`}>"high": 12.95,</span>
                    <span className={`${styles.line} ${styles.margin}`}>"market": 3.32,</span>
                    <span className={`${styles.line} ${styles.margin}`}>"directLow": 2.95</span>
                    <span className={`${styles.line} ${styles.margin} ${styles.predict}`}>"predictionPrice": 9.51,</span>
                    <span className={`${styles.line} ${styles.margin} ${styles.predict}`}>"predictionYear": 2025</span>
                    <span className={`${styles.line} ${styles.tab}`}>{'},'}</span>

                    <span className={`${styles.line} ${styles.margin}`}>...</span>
                    <span className={styles.line}>{'}'}</span>
                </code>
            </div>
        </div>
    )
}

export default JSONSection;