import { useEffect, useState } from 'react';
import styles from './SetCartes.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chargement from '../../Chargement/Chargement'

function SetCartes() {
    const { setID } = useParams();

    const [chargementOn, updateChargement] = useState(true);
    const [cartesDuSet, updateCartesDuSet] = useState([]);

    useEffect(() => {
        async function laod() {
            try {
                const backendReponse = await axios.get(`http://localhost:5000/sets/${setID}`)
                console.log(backendReponse.data);
                updateCartesDuSet(backendReponse.data);
            }

            catch(error) {
                console.error(error);
            }

            finally {
                updateChargement(false);
            }
        }
        laod()
    }, [])

    return (
        <div className={styles.setsConteneur}>
            {chargementOn ? <Chargement /> : (
                <div className={styles.cartesDisplay}>
                    {cartesDuSet.map((carte, index) => (
                        <div key={index} className={styles.set}>
                            <img src={carte.images.small}></img>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}

export default SetCartes;