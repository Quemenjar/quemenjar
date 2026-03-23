import Filter from "../components/Filter";

function InventoryPage () {
    const onFilter = (value) => {
        console.log(value);
    }

    return (
        <Filter options={['Congelador', 'Nevera']} onFilter={onFilter}/>
    )
}

export default InventoryPage;