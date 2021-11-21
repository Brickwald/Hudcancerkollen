declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export default class Komun extends React.Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    render() {
        return (
            <div>

                {/*Text*/}
                <p>Gå vidare för att skicka in och se ditt resultat.</p>

                {/*answer input*/}

                {/*Knappar*/}
                <button type="button" onClick={this.back}>Tillbaka</button>
                <button type="button" onClick={this.continue}>Resultat</button>
            </div>
        );
    }
}