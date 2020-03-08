import React from "react";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";
import Input from "../components/Input";
import SearchBtn from "../components/SearchBtn";

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
    };

    saveBook = (book) => {
        const bookObject = {
            "title": book.volumeInfo.title,
            "authors": book.volumeInfo.authors,
            "description": book.volumeInfo.description ? book.volumeInfo.description : "No Description Available for this Listing",
            "image": book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/130x190?text=No+Book+Cover",
            "link": book.volumeInfo.infoLink
        }
        axios.post("/api/books", bookObject);
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-4">Book Collector</h1>
                    <p className="lead">MERN stack (MongoDB, Express.js, React.js, and Node.js)</p>
                    <form>
                        <div className="input-group">
                            <Input 
                                onChange={this.handleInputChange} 
                                value={this.state.search} 
                            />
                            <SearchBtn onClick={this.searchForBooks} disabled={!(this.state.search)}>
                                Search
                            </SearchBtn>
                        </div>
                    </form>
                </Jumbotron>
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
                                        <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">View</a> <button onClick={() => this.saveBook(book)}>Save</button>
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
