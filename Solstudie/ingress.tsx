declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
const axios = require('axios');

export default class Ingress extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            codeErrorText: "",
            codeErrorTextColor: "black",
        }

        this.inputRef = React.createRef();
    }

    continue = async e => {
        e.preventDefault();
        this.setState({ codeErrorTextColor: "black" });
        this.setState({ codeErrorText: "Vänligen vänta" });
        var codeIsCorrect = await this.checkSurveyCode(this.props.code);

        if (codeIsCorrect)
        {
            this.props.nextStep();
        }
        else
        {
            this.setState({ codeErrorTextColor: "red" });
            this.setState({ codeErrorText: "Ej godkänd studiekod"});
        }
    }

    checkSurveyCode = async (theCode) => {

        //make API call to check if the code is accepted
        const res = await axios.get('https://hudcancerkollen-test.azurewebsites.net/api/CheckSurveyCode', {
            params: {
                surveycode: theCode,
            }
        }).catch((error) => {
            //console.log(error.response);
            return false;
        });
        //return true if it is accepted
        return Object.values(res)[0];
    }

    checkEnterPress = e => {
        if (e.key == 'Enter') {
            this.continue(e);
        }
    }

    render() {
        return (
            <div>

                {/*Text*/}
                <p>
                    Bland cancersjukdomar i Sverige är hudcancer den cancer som ökar mest, och har gjort så i flera decennier. Malignt melanom, den allvarligaste formen av hudcancer, är idag den femte vanligaste cancerformen, och drabbar årligen närmare 5000 personer.
                </p>
                <p>
                    Risken att drabbas av hudcancer beror på en kombination av individuella faktorer och hur mycket skadlig (ultraviolett) strålning från solen man utsätter sig för. Riskerna med att vistas i stark sol ökar till exempel om man är väldigt ljushyad, har många leverfläckar på kroppen och om man dessutom har en förälder eller syskon som har drabbats av malignt melanom (ärftlighet). Ju högre individuell riskprofil du har, desto försiktigare i solen bör du vara för att minska din risk att i framtiden drabbas av hudcancer.
                </p>
                <p>
                    Med Hudcancerkollen kan du själv skatta din risk och fundera över om det finns anledning för dig att på olika sätt skydda dig bättre i solen.
                </p>


                <div>
                    <input type="text" ref={this.inputRef} onChange={this.props.handleChange()} value={this.props.code} onKeyPress={this.checkEnterPress} />
                    <p style={{ color: this.state.codeErrorTextColor }}>{this.state.codeErrorText}</p>
                </div>
                {/*Knapp för att gå vidare*/}
                <button type="button" onClick={this.continue}>Starta Hudcancerkollen!</button>

            </div>
        );
    }
}