import { useState } from 'react';
import styles from './Sets.module.css'; 

function Sets() {
	const [tabSets, updateSets] = useState([]);

    return (
        <div className={styles.cartesConteneur}>
			<div className={styles.set}>

			</div>
        </div>
    );
  }
  
  export default Sets;