import styles from "./Header.module.css"

function Header() {
    return (
        <nav className={styles.navConteneur}>
            <img src="/logo.png" className={styles.image} />

            <div className={styles.conteneurCote}>
                <p className={styles.info}>Cartes</p>
                <p className={styles.info}>Graphes</p>
            </div>
        </nav>
    )
}

export default Header;