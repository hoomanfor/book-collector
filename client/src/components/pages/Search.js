import React from "react";
import axios from "axios";

class Search extends React.Component {
    state = {
        results: []
    };

    componentDidMount() {
        // after component loads, get all products from db
        axios.get("/api/search?q=cat's cradle").then((response) => {
            console.log(response.data)
            this.setState({
            results: response.data
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Search Page</h1>
            </div>
        );
    }
}

export default Search;
