import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import AddQuote from "./containers/AddQuote/AddQuote";
import Editor from "./containers/Editor/Editor";
import NavBar from "./components/NavBar/NavBar";
import Quotes from "./containers/Quotes/Quotes";

class App extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Quotes}/>
                    <Route path="/category/:name" component={Quotes}/>
                    <Route path="/addQuote" component={AddQuote}/>
                    <Route path="/edit/:id" component={Editor}/>
                    <Route render={() => <h1>Not Found</h1>}/>
                </Switch>
            </Fragment>
        );
    }
}

export default App;