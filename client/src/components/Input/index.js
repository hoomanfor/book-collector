import React from "react";

export function Input(props) {
    return (
            <input 
                type="text" 
                className="form-control" 
                placeholder="Search a Book Title, Author Name, or Topic" 
                name="search"
                {...props}
            />
    );
}

export default Input;  