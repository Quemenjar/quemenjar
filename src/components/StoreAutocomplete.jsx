import { useState, useRef, useEffect } from "react";

function StoreAutocomplete({ value, stores, onChange }) {
    const [inputValue, setInputValue] = useState(value || "");
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredStores = stores.filter(store => store.toLowerCase().includes(inputValue.toLowerCase()));
    const remainingStores = stores.filter((store) => filteredStores.indexOf(store) < 0).sort();

    console.log(filteredStores, remainingStores);
    const handleInputChange = (e) => {
        console.log(e);
        setInputValue(e.target.value);
        setIsOpen(true);
        setHighlightedIndex(-1);
        onChange(e.target.value);
    };

    const handleSelect = (store) => {
        setInputValue(store);
        setIsOpen(false);
        setHighlightedIndex(-1);
        onChange(store);
    };

    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleKeyDown = (e) => {
        if (!isOpen) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                return prev < filteredStores.length - 1 ? prev + 1 : 0;
            });
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                return prev > 0 ? prev - 1 : filteredStores.length - 1;
            });
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filteredStores.length) {
                handleSelect(filteredStores[highlightedIndex]);
            } else {
                setIsOpen(false);
            }
        }

        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    return (
        <div 
            ref={wrapperRef}
            className="store-autocomplete"
        >
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                placeholder="Sin tienda"
                className="input-autocomplete"
            />
            
            {isOpen &&
                <div className="select-autocomplete"
                style={{
                    
                }}
                >
                    {filteredStores.length > 0 && (
                        <ul className="ul-autocomplete">
                            {filteredStores.map((store, i) => {
                                return (
                                    <li
                                        key={i}
                                        onClick={() => handleSelect(store)}
                                    >
                                        <span className="checkmark-gutter">
                                            {value === store ? "✓" : " "}
                                        </span>
                                        {store}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {remainingStores.length > 0 && (
                        <>
                            <hr style={{marginBottom: 0, marginInline: '50px'}} />
                            <ul className="ul-autocomplete">
                                {remainingStores.map((store, i) => {
                                    return (
                                        <li
                                            key={i}
                                            onClick={() => handleSelect(store)}
                                        >
                                            <span className="checkmark-gutter">
                                                {value === store ? "✓" : " "}
                                            </span>
                                            {store}
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            }
        </div>
    );
}

export default StoreAutocomplete;