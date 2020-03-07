import React from "react";
import axios from "axios";

class Saved extends React.Component {
    state = {
        results: []
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        axios.get("/api/books").then((response) => {
            this.setState({
                results: response.data
            })
        });
    };

    deleteBook = (id) => {
        axios.delete("/api/books/" + id).then((response) => {
            this.loadBooks();
        });
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Saved Books</h1>
                        <p className="lead">MERN stack (MongoDB, Express.js, React.js, and Node.js)</p>
                    </div>
                </div>
                <div className="container border">
                    {this.state.results.map(book => (
                        <div key={book._id} className="container">
                            <div className="row">
                                <div className="col-8 border">
                                    <h3>{book.title}</h3>
                                    <p>{book.authors ? `Written by ${book.authors.join(", ")}` : ""}</p>
                                </div>
                                <div className="col-4 border text-right">
                                    <a href={book.link} target="_blank" rel="noopener noreferrer">View</a> <button onClick={() => this.deleteBook(book._id)}>Delete</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 text-center border">
                                    <img alt={book.title} src={book.image} />
                                </div>
                                <div className="col-10 border">
                                    <p>{book.description}</p>
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
