import { createContext, useState } from "react";

export const DataContext = createContext();

function DonnesPrediction({children}) {
    const [predictionOn, updatePrediction] = useState(false);

    return (
        <DataContext.Provider value={{predictionOn, updatePrediction}}>
            {children}
        </DataContext.Provider>
    )
}
export default DonnesPrediction;