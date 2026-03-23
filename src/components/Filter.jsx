function Filter ({options, onFilter}) {
    
    const onClick = (option) => {
        onFilter(option);
    }

    return (
        options.map((option) => {
            return (
                <button onClick={() => onClick(option)}>{option}</button>
            )
        })
    )
}

export default Filter;