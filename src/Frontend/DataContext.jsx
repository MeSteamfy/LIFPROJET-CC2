import { createContext, useState } from "react";

export const DataContext = createContext();

function DonnesPrediction({children}) {
    const [predictionOn, updatePrediction] = useState(false);
    const [pokemonSelect, updateSelectPokemon] = useState("xy1-1");

    return (
        <DataContext.Provider value={{predictionOn, updatePrediction, pokemonSelect, updateSelectPokemon}}>
            {children}
        </DataContext.Provider>
    )
}
export default DonnesPrediction;