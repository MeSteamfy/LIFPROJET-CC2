import { Link } from 'react-router-dom';  // Importer Link
import styles from "./Header.module.css";

function Header() {
  return (
    <nav className={styles.navConteneur}>
      <Link className='link' to="/">
        <img src="/logo.png" className={styles.image} />
      </Link>

      <div className={styles.conteneurCote}>
        <Link className='link' to="/sets"> 
          <p className={styles.info}>Sets</p>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
