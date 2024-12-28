import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext(); 

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (CaptainData) => {
        setCaptain(CaptainData);
    };

    const clearCaptain = () => {
        setCaptain(null);
        setError(null);
    };

    const value = {
        captain,
        loading,
        error,
        updateCaptain,
        clearCaptain,
        setLoading,
        setError
    };

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;