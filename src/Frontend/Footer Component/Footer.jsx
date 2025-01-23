import styles from './Footer.module.css'

function Footer() {

    return(
        <footer className={styles.footerConteneur}>
            <img src='/pokemonLogo.png' className={styles.image} />

            <div className={styles.copyright}>
                <p className={styles.info}>
                    Ce site a été réalisé par <span className={styles.nom}>Hervé YEFFE</span>, <span className={styles.nom}>Faik JEBARI</span> et <span className={styles.nom}>Tony NGUYEN</span>. 
                </p>
                <p className={styles.disclaimer}>
                    Tous les droits sur les personnages et les éléments Pokémon sont la propriété de leurs détenteurs respectifs.
                </p>
            </div>
        </footer>
    )
}

export default Footer;