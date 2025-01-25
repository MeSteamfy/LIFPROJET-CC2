import styles from './cartes.module.css'; 



function Cartes() {
    return (
      <div>
        <h1 className={styles.titre}>Pages des set</h1>
        <p className={styles.titre}>Voici la page Cartes avec son contenu.</p>
        <img src={`/dracobg.png`} className={styles.imagedraco}  id="dracobg"/>
        <img src={`/raybg.png`} className={styles.imageray} id='raybg' />
        
      </div>
    );
  }
  
  export default Cartes;