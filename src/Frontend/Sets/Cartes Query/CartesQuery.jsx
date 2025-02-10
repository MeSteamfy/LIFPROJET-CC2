import { useEffect, useState } from 'react'
import styles from './CartesQuery.module.css'
import Chargement from '../../Chargement/Chargement';

export default function CartesQuery(props) {

    const [chargementOn, updateChargement] = useState(true);

    useEffect(() => {
        console.log(props.query)
    }, []);

    return (
        <div className={styles.resultatRechercheConteneur}>
            
        </div>
    )
}