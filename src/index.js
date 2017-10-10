import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css';

import Cardlist from './cardlist'


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log('Event: Form Submit', this.state.userName);

        axios
            .get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.props.onSubmit(resp.data);
                this.setState({ userName: ''})
            })

    }

    render() {
        return(
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="user" className="sr-only">Github Username</label>
                    <input className="form-control" id="user" type="text"
                           value={this.state.userName}
                           onChange={(event) =>  this.setState({ userName: event.target.value }) }
                           ref={(input) => this.userNameInput = input}
                           placeholder="Github Username" required/>
                </div>
                <button type="submit" className="btn btn-primary">Add Card</button>
            </form>
        )
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    componentWillMount() {
        /*axios // Promises Library
            .get('https://api.github.com/users')
            .then(resp => {

                this.setState({ cards: resp.data});

            })*/
        // ES6 Native Promises
        fetch('https://api.github.com/users')
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    console.log(data);
                    this.setState({
                        cards: data
                    });

                })
            })
    }

    addNewCard(cardInfo) {
       this.setState(prevState => ({
           cards: prevState.cards.concat(cardInfo)
       }));
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.addNewCard.bind(this)} />


                <p className="bd-callout bd-callout-warning">Lists all users, in the order that they signed up on GitHub. This list includes personal user accounts and organization accounts.</p>
                <h2>Get all GitHub Users</h2>
                <Cardlist cards={this.state.cards} name={this.state.name}/>
            </div>
        )
    }
}




ReactDOM.render(
    <App />, document.getElementById('root')
);
