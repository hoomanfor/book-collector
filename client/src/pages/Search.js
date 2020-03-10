import React from "react";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";
import Input from "../components/Input";
import SearchBtn from "../components/SearchBtn";

class Search extends React.Component {
    state = {
        results: [],
        search: "",
        loading: false
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    searchForBooks = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const search = this.state.search.split(" ").join("+");
        axios.get("/api/search?q=" + search).then((response) => {
            console.log(response.data.items)
            this.setState({
                results: response.data.items,
                search: "",
                loading: false
            })
        });
    };

    saveBook = (book) => {
        const filteredResults = this.state.results.filter(filteredBook => filteredBook.id !== book.id);
        const bookObject = {
            "title": book.volumeInfo.title,
            "authors": book.volumeInfo.authors,
            "description": book.volumeInfo.description ? book.volumeInfo.description : "No Description Available for this Listing",
            "image": book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/130x190?text=No+Book+Cover",
            "link": book.volumeInfo.infoLink
        }
        axios.post("/api/books", bookObject).then(() => {
            this.setState({
                results: filteredResults
            })
        });
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
                                {this.state.loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>}
                                Search
                            </SearchBtn>
                        </div>
                    </form>
                </Jumbotron>
                <div className="container">
                    {!(this.state.results.length) &&
                        <h2 className="text-center text-info">
                            <i className="fas fa-search text-info"></i> Search for Books! <i className="fas fa-book-open text-info"></i>
                        </h2>
                    }
                    {this.state.results.map(book => (
                        <div key={book.id} className="book-container">
                            <div className="row no-gutters">
                                <div className="col-md-8 text-center text-md-left">
                                    <h3 className="title">{book.volumeInfo.title}</h3>
                                    <p className="authors">{book.volumeInfo.authors ? `Written by ${book.volumeInfo.authors.join(", ")}` : ""}</p>
                                </div>
                                <div className="col-md-4 text-center d-md-flex justify-content-end align-items-end">
                                        <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                                            <button className="btn btn-outline-primary">
                                                View
                                            </button>
                                        </a>
                                        <button className="btn btn-success ml-1" onClick={() => this.saveBook(book)}>
                                            Save
                                        </button>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-2 text-center">
                                    <img className="image" alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/130x190?text=No+Book+Cover"} />
                                </div>
                                <div className="col-md-10">
                                    <p className="description">{book.volumeInfo.description ? book.volumeInfo.description : "No Description Available for this Listing"}</p>
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
