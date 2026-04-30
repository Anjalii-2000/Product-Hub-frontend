import { createContext, useState } from "react";

export const FavouriteContext = createContext();

const FavouriteProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const toggleFavourite = (item) => {
        const exists = favourites.find((fav) => fav.id === item.id);

        if (exists) {
            
            setFavourites(favourites.filter((fav) => fav.id !== item.id));
        } else {
        
            setFavourites([...favourites, item]);
        }
    };

    return (
        <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
            {children}
        </FavouriteContext.Provider>
    );
};

export default FavouriteProvider;