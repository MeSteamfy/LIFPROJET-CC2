import styles from "./Main.module.css"

function Main() {
    return (
        <div className={styles.mainConteneur}>
            <h1 className="titre">PoketchAPI</h1>

            <p className={styles.description}>
                Le site qui vous donne les meilleurs informations sur les cartes Pokémon!
            </p>
        </div>
    )
}

export default Main;