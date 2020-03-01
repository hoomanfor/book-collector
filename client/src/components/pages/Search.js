import React from "react";
import axios from "axios";

class Search extends React.Component {
    state = {
        results: [],
        search: ""
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    searchForBooks = (event) => {
        event.preventDefault();
        const search = this.state.search.split(" ").join("+");
        axios.get("/api/search?q=" + search).then((response) => {
            console.log(response.data.items)
            this.setState({
                results: response.data.items,
                search: ""
            })
        });
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Book Collector</h1>
                        <p className="lead">MERN stack (MongoDB, Express.js, React.js, and Node.js)</p>
                        <form>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search a Book Title, Author Name, or Topic" 
                                onChange={this.handleInputChange} 
                                name="search" 
                                value={this.state.search} 
                            />
                            <div className="input-group-append">
                                <button 
                                    className="btn btn-outline-primary" 
                                    type="submit" 
                                    onClick={this.searchForBooks} 
                                    disabled={!(this.state.search)}>Search
                                </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div className="container border">
                    <h2 className="border">{this.state.results.length ? "Results:" : "Search for Books!"}</h2>
                        {this.state.results.map(book => (
                            <div key={book.id} className="container">
                                <div className="row">
                                    <div className="col-8 border">
                                        <h3>{book.volumeInfo.title}</h3>
                                        <p>{book.volumeInfo.authors ? `Written by ${book.volumeInfo.authors.join(", ")}` : ""}</p>
                                    </div>
                                    <div className="col-4 border text-right">
                                        <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">View</a> <a href="/save">Save</a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2 text-center border">
                                        <img alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/130x190?text=No+Book+Cover"} />
                                    </div>
                                    <div className="col-10 border">
                                        <p>{book.volumeInfo.description ? book.volumeInfo.description : "No Description Available for this Listing"}</p>
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
