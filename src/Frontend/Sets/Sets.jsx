import { useEffect, useState } from 'react';
import styles from './Sets.module.css'; 
import axios from 'axios';

function Sets() {
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

    const [typeFiltre, updateFiltre] = useState("Tout");

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
        }
        getAllSets();
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

    const handleFilterChange = (event) => {
        updateFiltre(event.target.value);
    };

    const filteredSets = typeFiltre === "Tout" ? seriesList : seriesList.filter(series => series.key === typeFiltre);

    return (
        <div className={styles.setsConteneur}>
            <div className={styles.filtres}>
                <h1 className={styles.titre}>Filtres</h1>
                <select onChange={handleFilterChange} value={typeFiltre} className={styles.select}>
                    <option value="Tout">Tout</option>
                    {seriesList.map((series) => (
                        <option key={series.key} value={series.key}>{series.name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.sets}>
                {filteredSets.map((series) => (
                    <div key={series.key}>
                        <h1 className={styles.setTitle}>{series.name}</h1>
                        <div className={styles.setDisplay}>
                            {setsData[series.key].map((set, index) => (
                                <div className={styles.set} key={index}>
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
