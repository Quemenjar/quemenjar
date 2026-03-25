function StoreList({
    stores,
    selectedStore,
    onSelectStore,
}) {
    return (
        <div>
            <select
                value={selectedStore}
                onChange={(e) => {
                    onSelectStore(e.target.value);
                }}
            >
                <option value="">Todas</option>


                {stores.map((store, i) => {
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