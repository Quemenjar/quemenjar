function Filter ({options, onFilter, activeOption}) {
    
    const onClick = (option) => {
        onFilter(option);
    }

    return (
        options.map((option, index) => {
            return (
                <button 
                    key={index} 
                    className={option === activeOption ? "filter-active" : ""}
                    onClick={() => onClick(option)}
                >
                    {option}
                    
                </button>
            )
        })
    )
}

export default Filter;