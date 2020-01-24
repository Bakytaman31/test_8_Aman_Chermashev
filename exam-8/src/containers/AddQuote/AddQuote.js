import React, {Component} from 'react';
import axiosQuotes from "../../axios-quotes";
import './AddQuote.css';

class AddQuote extends Component {
    state = {
        category: 'Star Wars',
        author: '',
        quoteText: '',
    };

    inputChange = event => this.setState({[event.target.name]: event.target.value});

    postQuote = async (event) => {
        event.preventDefault();
        const quote = {
            category: this.state.category,
            author: this.state.author,
            quoteText: this.state.quoteText,
        };
        await axiosQuotes.post('quotes.json', quote);
        this.props.history.push('/');
    };

    render() {
        return (
                <div>
                    <form className="addQuote" onSubmit={this.postQuote}>
                        <h2>Add Quote</h2>
                        <p>Category</p>
                        <select name="category" onChange={this.inputChange}>
                            <option>Star Wars</option>
                            <option>James Bond</option>
                            <option>John Wick</option>
                            <option>Humor</option>
                            <option>Motivation</option>
                        </select>
                        <p>
                            <input type="text"
                                   name="author"
                                   onChange={this.inputChange}
                                   autoComplete='off'
                                   placeholder="Author"
                                   style={{marginTop: "1%"}}
                            />
                        </p>
                        <textarea
                            cols="30"
                            rows="10"
                            name="quoteText"
                            onChange={this.inputChange}
                            placeholder="Quote Text"
                        />
                        <p><button type="submit" className="btn btn-success">Save</button></p>
                    </form>
                </div>
        );
    }
}

export default AddQuote;