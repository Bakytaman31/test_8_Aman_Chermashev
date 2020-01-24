import React, {Component} from 'react';
import axiosQuotes from "../../axios-quotes";
import {NavLink} from "react-router-dom";

class Quotes extends Component {
    state = {
        quotes: [],
    };


    getData = async () => {
        let url = 'quotes.json';
        if (this.props.match.params.name){
            url += `?orderBy="category"&equalTo="${this.props.match.params.name}"`
        }
        const response = await axiosQuotes.get(url);
        if (response.data){
            this.setState({quotes: response.data})
        }
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.name !== this.props.match.params.name){
            return this.getData();
        }
    }

    deleteQuote = async (id) => {
        await axiosQuotes.delete(`quotes/${id}.json`);
        this.getData();
    };

    render() {
        return (
            <div>
                {Object.keys(this.state.quotes).map(id => (
                    <div style={{border: '2px solid #ccc'}} key={id}>
                        <h3>{this.state.quotes[id].category}</h3>
                        <h4>Author: {this.state.quotes[id].author}</h4>
                        <p>{this.state.quotes[id].quoteText}</p>
                        <NavLink to={'edit/' + id}>Edit</NavLink>
                            <button className="btn btn-danger" onClick={() => this.deleteQuote(id)}>Delete</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default Quotes;