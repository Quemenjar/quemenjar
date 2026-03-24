import { useState } from "react";

function StoreList({ usedStores, stores, onAddStore }) {
    const [storeValue, setStoreValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredStores = usedStores.filter((store) =>
        store.toLowerCase().includes(storeValue.toLowerCase())
    );

    const handleAddStore = () => {
        if (storeValue === "") return;

        if (stores.includes(storeValue)) return;

        onAddStore(storeValue);
        setStoreValue("");
        setShowSuggestions(false);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleAddStore();
            }}
        >
            <input
                type="text"
                value={storeValue}
                placeholder="Tienda o supermercado"
                onChange={(e) => {
                    setStoreValue(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
            />

            {showSuggestions && storeValue !== "" && filteredStores.length > 0 && (
                <ul>
                    {filteredStores.map((store, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => {
                                    setStoreValue(store);
                                    setShowSuggestions(false);
                                }}
                            >
                                {store}
                            </li>
                        );
                    })}
                </ul>
            )}

            <button type="submit">filtrar por tienda</button>
        </form>
    )
}

export default StoreList;