import { useEffect, useState } from 'react';
import styles from './Sets.module.css'; 
import axios from 'axios'

function Sets() {
	const [tabSets, updateSets] = useState([]);

    useEffect(() => {
        async function getAllSets() {
            try {
                const backendReponse = await axios.get('http://localhost:5000/sets');
                updateSets(backendReponse.data)
                console.log(backendReponse.data)
            }

            catch(error) {
                console.error(error);
            }
        }
        getAllSets();
    }, []);

    return (
        <div className={styles.setsConteneur}>
			<div className={styles.sets}>
                {tabSets.map((set, index) => (
                    <div className={styles.set} key={index}>
                        <img src={set.images.logo} className={styles.image} />
                        <div className={styles.infoConteneur}>
                            <p className={styles.setNom}>{set.name}</p>
                            <p className={styles.setData}>{set.releaseDate}</p>
                        </div>
                    </div>
                ))}
			</div>
        </div>
    );
  }
  
  export default Sets;