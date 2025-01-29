import { useEffect } from 'react';
import styles from './SetCartes.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SetCartes() {
    const { setID } = useParams();

    useEffect(() => {
        async function laod() {
            try {
                const backendReponse = await axios.get(`http://localhost:5000/sets/${setID}`)
                console.log(backendReponse.data);
            }

            catch(error) {
                console.error(error);
            }
        }
        laod()
    }, [])

    return (
        <div>
            YO
        </div>
    )

}

export default SetCartes;