function StoreList({ usedStores, selectedStore, onSelectStore }) {
    return (
        <div>
            <select
                value={selectedStore}
                onChange={(e) => {
                    onSelectStore(e.target.value);
                }}
            >
                <option value="">Todas</option>

                {usedStores.map((store, i) => {
                    return (
                        <option key={i} value={store}>
                            {store}
                        </option>
                    );
                })}

                <option value="Otros">Otros</option>
            </select>
        </div>
    );
}

export default StoreList;