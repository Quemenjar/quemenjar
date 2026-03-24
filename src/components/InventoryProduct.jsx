import { Link } from "react-router-dom"

function InventoryProduct ({productDetails, onChange, onDelete}) {
    
    return (
        <div>
            <input 
                type="text" 
                value={productDetails.name} 
                onChange={(e) => {onChange(productDetails.id, e.target.value, 'name')}}
            />

            <label>
                Quantity
                <input 
                    type="number" 
                    value={productDetails.quantity} 
                    onChange={(e) => {onChange(productDetails.id, e.target.value, 'quantity')}}
                />
            </label>

            <label>
                Storage

                <select 
                    name="storage" 
                    onChange={(e) => {onChange(productDetails.id, e.target.value, 'storage')}}
                    value={productDetails.storage}
                >
                    <option value="">-</option>
                    <option value="Congelador">Congelador</option>
                    <option value="Nevera">Nevera</option>
                    <option value="Despensa">Despensa</option>
                </select>
            </label>

            <label>
                Expiration date
                <input 
                    type="date" 
                    value={productDetails.expiration_date} 
                    onChange={(e) => {onChange(productDetails.id, e.target.value, 'expiration_date')}}
                />
            </label>

            <button onClick={(e) => {onChange(productDetails.id, !productDetails.usual, 'usual')}}>
                { productDetails.usual ? 'Usual' : 'Unusual'}
            </button>

            <button onClick={(e) => {onChange(productDetails.id, !productDetails.restock, 'restock')}}>
                { productDetails.restock ? 'Comprar' : 'No comprar'}
            </button>

            <button>
                <Link to={`/product/${productDetails.id}`} >Editar</Link>
            </button>

            <button onClick={() => onDelete(productDetails.id)}>
                Delete
            </button>
        </div>
    )
}

export default InventoryProduct;