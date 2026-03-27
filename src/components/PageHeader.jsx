function PageHeader ({title, onAddProduct}) {
    return (
        <div className="page-header display-header">
            <h2>{title}</h2>
            <button onClick={onAddProduct}>+ Añadir producto</button>
        </div>
    )
}

export default PageHeader;