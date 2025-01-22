import styles from './JSON.module.css'

function JSONSection() {
    return (
        <div className={styles.jsonConteneur}>
            <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut magni accusantium odit accusamus? Iste a reiciendis, sapiente eaque optio eius, debitis ipsam numquam quisquam, eveniet error quam? Blanditiis, quibusdam distinctio.
            </p>
            <div className={styles.bas}>
                <img src={`/${Math.ceil(Math.random()*10)}.png`} className={styles.image} />
                <code className={styles.code}>
                    <div className={styles.header}>
                        <p className={styles.titre}>response.json</p>
                    </div>
                    <span className={styles.line}>{'{'}</span>
                    <span className={`${styles.line} ${styles.tab}`}>"data": {'{'}</span>
                    <span className={``}></span>
                    {/*
                        {
                            "data": {
                                "id": "xy1-1",
                                "name": "Venusaur-EX",
                                "supertype": "Pokémon",
                        }
                    */}
                </code>
            </div>
        </div>
    )
}

export default JSONSection;