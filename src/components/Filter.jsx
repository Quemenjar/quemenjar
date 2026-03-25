function Filter ({options, onFilter}) {
    
    const onClick = (option) => {
        onFilter(option);
    }

    return (
        options.map((option, index) => {
            return (
                <button key={index} onClick={() => onClick(option)}>{option}</button>
            )
        })
    )
}

export default Filter;