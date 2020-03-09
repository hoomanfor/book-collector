import React from "react";
import axios from "axios";
import Jumbotron from "../components/Jumbotron";

class Saved extends React.Component {
    state = {
        results: []
    };

    componentDidMount() {
        this.loadBooks();
    };

    loadBooks = () => {
        axios.get("/api/books").then((response) => {
            this.setState({
                results: response.data
            })
        });
    };

    deleteBook = (id) => {
        axios.delete("/api/books/" + id).then(() => {
            this.loadBooks();
        });
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-4">Saved Books</h1>
                    <p className="lead">MERN stack (MongoDB, Express.js, React.js, and Node.js)</p>
                </Jumbotron>
                <div className="container">
                    {!(this.state.results.length) && 
                        <h2 className="text-center text-warning">
                            You haven't saved any books, friend.
                        </h2>
                    }
                    {this.state.results.map(book => (
                        <div key={book._id} className="book-container">
                            <div className="row no-gutters">
                                <div className="col-md-8 text-center text-md-left">
                                    <h3 className="title">{book.title}</h3>
                                    <p className="authors">{book.authors ? `Written by ${book.authors.join(", ")}` : ""}</p>
                                </div>
                                <div className="col-md-4 text-center d-md-flex justify-content-end align-items-end">
                                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                                        <button className="btn btn-outline-primary">
                                            View
                                        </button>
                                    </a>
                                    <button className="btn btn-danger ml-1" onClick={() => this.deleteBook(book._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-2 text-center">
                                    <img className="image" alt={book.title} src={book.image} />
                                </div>
                                <div className="col-md-10">
                                    <p className="description">{book.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Saved;
