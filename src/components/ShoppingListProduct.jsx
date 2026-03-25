import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ShoppingListProduct({
    product,
    stores,
    onUpdateProduct,
    onMarkAsPurchased,
    onRemoveFromList,
}) {

    const navigate = useNavigate();

  
    const [localName, setLocalName] = useState(product.name || "");
    const [localNeeded, setLocalNeeded] = useState(product.needed || "");
    const [localNote, setLocalNote] = useState(product.note || "");

   
    const nameTimeout = useRef(null);
    const neededTimeout = useRef(null);
    const noteTimeout = useRef(null);


    useEffect(() => {
        setLocalName(product.name || "");
        setLocalNeeded(product.needed || "");
        setLocalNote(product.note || "");
    }, [product.name, product.needed, product.note]);

  
    useEffect(() => {
        return () => {
            clearTimeout(nameTimeout.current);
            clearTimeout(neededTimeout.current);
            clearTimeout(noteTimeout.current);
        };
    }, []);

    
    const handleDebouncedChange = (field, value, setLocal, timeoutRef) => {
        setLocal(value);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onUpdateProduct(product.id, field, value);
        }, 1000);
    };

    return (
        <div>
            <input
                type="text"
                value={localName}
                onChange={(e) => {
                    handleDebouncedChange("name", e.target.value, setLocalName, nameTimeout);
                }}
                placeholder="Nombre del producto"
            />


            <input
                type="number"
                value={localNeeded}
                onChange={(e) => {
                    handleDebouncedChange("needed", e.target.value, setLocalNeeded, neededTimeout);
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
                value={localNote}
                onChange={(e) => {
                    handleDebouncedChange("note", e.target.value, setLocalNote, noteTimeout);
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
                Quitar
            </button>
        </div>
    );
}

export default ShoppingListProduct;