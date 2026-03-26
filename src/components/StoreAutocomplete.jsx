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

    const filteredStores = stores.filter((store) => {
        return store.toLowerCase().includes(inputValue.toLowerCase());
    });

    const handleInputChange = (e) => {
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
        <div ref={wrapperRef} style={{ position: "relative", display: "inline-block" }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                placeholder="Tienda"
            />

            {isOpen && filteredStores.length > 0 && (
                <ul
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        border: "1px solid #ccc",
                        background: "white",
                        zIndex: 10,
                        maxHeight: "150px",
                        overflowY: "auto",
                    }}
                >
                    {filteredStores.map((store, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => handleSelect(store)}
                                style={{
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                    background: i === highlightedIndex ? "#eee" : "white",
                                }}
                            >
                                {store}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default StoreAutocomplete;