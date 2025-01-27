import { Link } from 'react-router-dom';  // Importer Link
import styles from "./Header.module.css";

function Header() {
  return (
    <nav className={styles.navConteneur}>
      <Link className='link' to="/">
        <img src="/logo.png" className={styles.image} />
      </Link>

      <div className={styles.conteneurCote}>
        <Link className='link' to="/cartes"> 
          <p className={styles.info}>Cartes</p>
        </Link>
        
        <Link className='link' to="/graphes"> 
          <p className={styles.info}>Graphes</p>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
