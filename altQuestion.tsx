declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export default class AltQuestion extends React.Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    

    render() {
        const { answer } = this.props;
        return (
            <div>
                <h2>Fråga {this.props.step}</h2>

                {/*Text*/}
                <div style={questionStyle}>
                    <p>{this.props.object.text}</p>
                </div>

                {/*answer input*/}
                <div onChange={this.props.handleChange(this.props.qIndex)} style={inputStyle}>
                    {this.props.object.alternatives.map(function (data,index) {
                        return (
                            <div>
                                <input type="radio" value={index} id={index} name="alt" checked={index == answer}/>
                                <label for={index}> {data} </label>
                            </div>
                            );
                    })}
                </div>


                {/*Knappar*/}
                <button type="button" onClick={this.back}>Tillbaka</button>
                <button type="button" onClick={this.continue} disabled={this.props.answer == null}>Nästa</button>
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