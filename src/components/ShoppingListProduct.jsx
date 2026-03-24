function ShoppingListProduct({ product, usedStores, onUpdateProduct, products }) {
    const storesFromProducts = products.map((item) => {
        return item.store;
    });

    const allStores = [...new Set([...usedStores, ...storesFromProducts])];

    return (
        <div>
            <input
                type="text"
                value={product.name || ""}
                onChange={(e) => {
                    onUpdateProduct(product.id, "name", e.target.value);
                }}
            />

            <input
                type="number"
                value={product.needed || 0}
                onChange={(e) => {
                    onUpdateProduct(product.id, "needed", Number(e.target.value));
                }}
            />

            <select
                value={product.store || ""}
                onChange={(e) => {
                    onUpdateProduct(product.id, "store", e.target.value);
                }}
            >
                <option value="">Selecciona tienda</option>
                {allStores.map((store, i) => {
                    return (
                        <option key={i} value={store}>
                            {store}
                        </option>
                    );
                })}
            </select>

            <input
                type="text"
                placeholder="Nueva tienda"
                onChange={(e) => {
                    onUpdateProduct(product.id, "store", e.target.value);
                }}
            />

            <input
                type="text"
                value={product.note || ""}
                onChange={(e) => {
                    onUpdateProduct(product.id, "note", e.target.value);
                }}
            />
        </div>
    );
}

export default ShoppingListProduct;