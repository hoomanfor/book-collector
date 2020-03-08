import React from "react";

export function SearchBtn(props) {
    return (
        <div className="input-group-append">
            <button className="btn btn-outline-primary" type="submit" {...props}>
                {props.children} 
            </button>
        </div>
    );
}

export default SearchBtn;  