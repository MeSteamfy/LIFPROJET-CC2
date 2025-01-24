import { useRef, useEffect } from 'react';
import styles from './Footer.module.css'

function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
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
        
        if (footerRef.current) observer.observe(footerRef.current);
        return () => {
            if (footerRef.current) observer.unobserve(footerRef.current);
        }
    }, []);

    return(
        <footer className={styles.footerConteneur}>
            <div ref={footerRef} className={styles.footer}>
                <img src='/pokemonLogo.png' className={styles.image} />

                <div className={styles.copyright}>
                    <p className={styles.info}>
                        Ce site a été réalisé par <span className={styles.nom}>Hervé YEFFE</span>, <span className={styles.nom}>Faik JEBARI</span> et <span className={styles.nom}>Tony NGUYEN</span>. 
                    </p>
                    <p className={styles.disclaimer}>
                        Tous les droits sur les personnages et les éléments Pokémon sont la propriété de leurs détenteurs respectifs.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;