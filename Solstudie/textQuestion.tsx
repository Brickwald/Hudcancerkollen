declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export default class TextQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    checkEnterPress = e => {
        if (e.key == 'Enter') {
            if (this.props.answer != "" && this.props.answer != null && this.props.answer !== undefined) {
                this.continue(e);
            }
        }
    }


    render() {
        return (
            <div>
                <h2>Fråga {this.props.step}</h2>

                {/*Text*/}
                <div style={questionStyle}>
                    <p>{this.props.object.text}</p>
                </div>

                {/*answer input*/}
                <div style={inputStyle}>
                    <input type="text" ref={this.inputRef} onChange={this.props.handleChange(this.props.step - 1)} value={this.props.answer} onKeyPress={this.checkEnterPress} />
                </div>
                
                {/*Knappar*/}
                <button type="button" onClick={this.back}>Tillbaka</button>
                <button type="button" onClick={this.continue} disabled={this.props.answer == "" || this.props.answer == null}>Nästa</button>
            </div>
        );
    }
}

const inputStyle = {
    minHeight: "200px",
}
const questionStyle = {
    minHeight: "50px",
}