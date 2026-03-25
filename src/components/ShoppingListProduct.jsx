import { useNavigate } from "react-router-dom";

function ShoppingListProduct({
    product,
    stores,
    onUpdateProduct,
    onMarkAsPurchased,
    onRemoveFromList,
}) {

    const navigate = useNavigate();

    return (
        <div>
            <input
                type="text"
                value={product.name || ""}
                onChange={(e) => {
                    onUpdateProduct(product.id, "name", e.target.value);
                }}
                placeholder="Nombre del producto"
            />


            <input
                type="number"
                value={product.needed || ""}
                onChange={(e) => {
                    onUpdateProduct(product.id, "needed", e.target.value);
                }}
                min="0"
            />

            <select
                value={product.store || ""}
                onChange={(e) => {
                    onUpdateProduct(product.id, "store", e.target.value);
                }}
            >
                <option value="">Selecciona tienda</option>


                {stores.map((store, i) => {
                    return (
                        <option key={i} value={store}>
                            {store}
                        </option>
                    );
                })}

                <option value="Otros">Otros</option>
            </select>


            <input
                type="text"
                value={product.note || ""}
                onChange={(e) => {
                    onUpdateProduct(product.id, "note", e.target.value);
                }}
                placeholder="Nota"
            />


            <button onClick={() => onMarkAsPurchased(product.id)}>
                Comprado
            </button>

            <button onClick={()=> navigate(`/product/${product.id}`)}>
                Editar
            </button>


            <button onClick={() => onRemoveFromList(product.id)}>
                Eliminar
            </button>
        </div>
    );
}

export default ShoppingListProduct;