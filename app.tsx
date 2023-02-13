declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

import Form from './form';

//read Json files with questions
const questions1 = require('./content/questions1.json');
const sepiQuestions = require('./content/sepi.json');
const susQuestions = require("./content/SUS.json");

export class Main extends React.Component {
    render() {
        return (
            <div style={containerAppStyle}>
                <div style={determineStyle()}>
                    <div style={headerStyle}>
                        <div style={innerStyle}>
                            <img src="./content/hudcancerkollen_logga.png" alt="Hudcancerkollen" style={logoStyle}></img>
                            <img src="./content/LiU_primar_svart.png" alt="LiU" style={logoStyle}></img>
                        </div>
                    </div>
                    <div style={formPadding}>
                        <Form questions1={questions1} sepiQuestions={sepiQuestions} susQuestions={susQuestions} />
                    </div>
                </div>
            </div>
        );
    }
}

const containerAppStyle = {
    width:"100%",
    height:"100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    //backgroundColor: "blue",
}
const headerStyle = {
    backgroundImage: "url('./content/background_image.png')",
    backgroundRepeat: "no-repeat",
    //backgroundAttachment: "fixed",
    backgroundSize: "cover",
    width: "100%",
    //height: "calc(0.3 * 100vw)"
}
const innerStyle = {
    paddingBottom: "calc(55% - (50% * 0.67))"
}
const logoStyle = {
    width: "50%",
    verticalAlign: "top"
}
const formPadding = {
    padding: "3%"
}
const appStyleLarge = { //Style för datorskärm

    width: "600px",
    backgroundColor: "#F5F5F5",
    //height: "100%"
    flexGrow: "1",
    boxSizing: "border-box",
    //padding: "20px"
}
const appStyleSmall = { //Style för mobiler

    width: "100%",
    backgroundColor: "#F5F5F5",
    flexGrow: "1",
    boxSizing: "border-box",
    //padding: "10px"
}

//används för att ändra utseende beroende på skärmens bredd
var determineStyle = function ()
{
    return (window.innerWidth > 600 ? appStyleLarge : appStyleSmall);
}

ReactDOM.render(<Main />, document.getElementById('root'));