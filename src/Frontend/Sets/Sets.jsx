import { useEffect, useRef, useState, useContext } from 'react';
import styles from './Sets.module.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chargement from '../Chargement/Chargement'
import { DataContext } from '../DataContext';

function Sets() {
    const {predictionOn, updatePrediction} = useContext(DataContext);

    const navigate = useNavigate()

    const iconRef = useRef(null);

    const [setsData, setSetsData] = useState({
        scarletViolet: [],
        swordShield: [],
        sunMoon: [],
        xY: [],
        blackWhite: [],
        heartSoul: [],
        platinum: [],
        diamondPearl: [],
        base: [],
    });

    const [filtreOn, updateFiltreState] = useState(false);
    const [typeFiltre, updateFiltre] = useState("scarletViolet");
    const [chargement, updateChargement] = useState(true);

    useEffect(() => {
        async function getAllSets() {
            try {
                const backendReponse = await axios.get('http://localhost:5000/sets');
                const newSetsData = { ...setsData };

                backendReponse.data?.forEach((obj) => {
                    if (!obj.name.includes("Promos")) {
                        switch(obj.series) {
                            case "Scarlet & Violet":
                                newSetsData.scarletViolet.push(obj);
                                break;

                            case "Sword & Shield":
                                newSetsData.swordShield.push(obj);
                                break;

                            case "Sun & Moon":
                                newSetsData.sunMoon.push(obj);
                                break;

                            case "XY":
                                newSetsData.xY.push(obj);
                                break;

                            case "Black & White":
                                newSetsData.blackWhite.push(obj);
                                break;

                            case "HeartGold & SoulSilver":
                                newSetsData.heartSoul.push(obj);
                                break;

                            case "Platinum":
                                newSetsData.platinum.push(obj);
                                break;

                            case "Diamond & Pearl":
                                newSetsData.diamondPearl.push(obj);
                                break;

                            case "Base":
                                newSetsData.base.push(obj);
                                break;

                            default:
                                break;
                        }
                    }
                });

                setSetsData(newSetsData);
            } 
            
            catch (error) {
                console.error(error);
            }

            finally {
                updateChargement(false)
            }
        }
        getAllSets();
    }, []);

    useEffect(() => {
        // Si la carte de prediction est ouvert, alors on ferme directement pour éviter un bug qui fait que la carte s'affiche directement après que 
        if (predictionOn) updatePrediction(false);
    }, []);

    const seriesList = [
        { name: "Scarlet & Violet", key: "scarletViolet" },
        { name: "Sword & Shield", key: "swordShield" },
        { name: "Sun & Moon", key: "sunMoon" },
        { name: "XY", key: "xY" },
        { name: "Black & White", key: "blackWhite" },
        { name: "HeartGold & SoulSilver", key: "heartSoul" },
        { name: "Platinum", key: "platinum" },
        { name: "Diamond & Pearl", key: "diamondPearl" },
        { name: "Base", key: "base" },
    ];

    const toggleFiltre = () => {
        if (iconRef.current) {
            if (!filtreOn) iconRef.current.classList.replace("fa-plus", "fa-minus");
            else iconRef.current.classList.replace("fa-minus", "fa-plus");
            updateFiltreState(!filtreOn)
        }
    }

    const filteredSets = typeFiltre === "Tout" ? seriesList : seriesList.filter(series => series.key === typeFiltre);

    return (
        <div className={styles.setsConteneur}>
            <div className={styles.filtreConteneur}>
                {filtreOn && (
                    <div className={styles.filtreOptions}>
                        <p onClick={() => updateFiltre("Tout")} className={styles.option}>Tout</p>
                        <p onClick={() => updateFiltre("scarletViolet")} className={styles.option}>Scarlet & Violet</p>
                        <p onClick={() => updateFiltre("swordShield")} className={styles.option}>Sword & Shield</p>
                        <p onClick={() => updateFiltre("sunMoon")} className={styles.option}>Sun & Moon</p>
                        <p onClick={() => updateFiltre("xY")} className={styles.option}>X & Y</p>
                        <p onClick={() => updateFiltre("blackWhite")} className={styles.option}>Black & White</p>
                        <p onClick={() => updateFiltre("heartSoul")} className={styles.option}>HeartGold & SoulSilver</p>
                        <p onClick={() => updateFiltre("platinum")} className={styles.option}>Platinum</p>
                        <p onClick={() => updateFiltre("diamondPearl")} className={styles.option}>Diamond & Pearl</p>
                        <p onClick={() => updateFiltre("base")} className={styles.option}>Base</p>
                    </div>
                )}

                <div onClick={toggleFiltre} className={styles.filtre}>
                    <i ref={iconRef} className={`${styles.icon} fa-solid fa-plus`}></i>
                </div>                
            </div>

            {chargement && <Chargement />}

            <div className={styles.sets}>
                
                {!chargement && filteredSets.map((series) => (
                    <div key={series.key}>
                        <h1 className={styles.setTitle}>{series.name}</h1>
                        <div className={styles.setDisplay}>
                            {setsData[series.key].map((set, index) => (
                                <div onClick={() => navigate(`/sets/${set.id}`)} className={styles.set} key={index}>
                                    <div className={styles.imgConteneur}>
                                        <img src={set.images.logo} className={styles.image} alt={set.name} />
                                    </div>

                                    <div className={styles.infoConteneur}>
                                        <p className={styles.setNom}>{set.name}</p>
                                        <p className={styles.setData}>{set.releaseDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sets;
