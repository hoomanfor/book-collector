import React from "react";
import axios from "axios";

class Search extends React.Component {
    state = {
        results: []
    };

    componentDidMount() {
        // after component loads, get all products from db
        axios.get("/api/search?q=Tiny Pretty Things").then((response) => {
            console.log(response.data.items)
            this.setState({
            results: response.data.items
            })
        });
    }

    render() {
        return (
            <div>
                <h1>Search Page</h1>
                <div className="container border">
                    <h2 className="border">Results:</h2>
                        {this.state.results.map(book => (
                            <div key={book.id} className="container">
                                <div className="row">
                                    <div className="col-8 border">
                                        <p>{book.volumeInfo.authors ? `Written by ${book.volumeInfo.authors.join(", ")}` : ""}</p>
                                    </div>
                                    <div className="col-4 border">
                                        <p>empty</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default Search;
