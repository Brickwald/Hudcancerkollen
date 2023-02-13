declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
const axios = require('axios');

export class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            correctLogin: false,
            username: "",
            password: "",
            codeErrorText: "",
            codeErrorTextColor: "black",

            getAnswersErrorText: "",
            getAnswersErrorTextColor: "black",
            studiekod: "",
        }

        this.inputUsernameRef = React.createRef();
        this.inputPasswordRef = React.createRef();
        this.inputSurveyCodeRef = React.createRef();
    }

    loginPressed = async e => {
        e.preventDefault();
        this.setState({ codeErrorTextColor: "black" });
        this.setState({ codeErrorText: "Vänligen vänta" });

        const { username } = this.state;
        const { password } = this.state;

        var codeIsCorrect = await this.checkLogin(username, password);

        if (codeIsCorrect) {
            this.setState({correctLogin: true});
        }
        else {
            this.setState({ correctLogin: false });
            this.setState({ codeErrorTextColor: "red" });
            this.setState({ codeErrorText: "Fel användarnamn eller lösenord" });
        }
    }

    checkLogin = async (username, password) => {

        //make API call to check if the code is accepted
        const res = await axios.post('https://hudcancerkollen-test.azurewebsites.net/api/CheckAdminLogin', {
            
            username: username,
            password: password,
            
        }).catch((error) => {
            console.log(error.response);
            return false;
        });
        //return true if it is accepted
        return Object.values(res)[0];
    }

    getAnswersPressed = async e => {
        e.preventDefault();

        const { username } = this.state;
        const { password } = this.state;
        const { studiekod } = this.state;

        this.setState({ getAnswersErrorTextColor: "black" });
        this.setState({ getAnswersErrorText: "Hämtar data. Vänligen vänta" });

        var res = await this.getExcelFile(studiekod, username, password);
        if (res) {
            this.setState({ getAnswersErrorTextColor: "green" });
            this.setState({ getAnswersErrorText: "Lyckat! Du borde fått en excelfil nedladdad." });
        } else {
            this.setState({ getAnswersErrorTextColor: "red" });
            this.setState({ getAnswersErrorText: "Fel: Kunde inte hämta datan." });
        }
    }

    getExcelFile = async (surveycode, username, password) => {

        //make API call to check if the code is accepted
        const res = await axios.post('https://hudcancerkollen-test.azurewebsites.net/api/GetAnswers', {
            // Body
            surveycode: surveycode,
            username: username,
            password: password,
            
        },
        {
            // config
            responseType: 'blob',
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'hudcancerkollenSvar.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
            return true;
        }).catch((error) => {
            //console.log(error.response);
            return false;
        });

        //return true if it is accepted
        return true;
    }

    checkLoginEnterPress = e => {
        if (e.key == 'Enter') {
            this.loginPressed(e);
        }
    }

    handleUsernameChanged = () => e => {
        this.setState({ username: e.target.value });
    }
    handlePasswordChanged = () => e => {
        this.setState({ password: e.target.value });
    }
    handleSurveyCodeChanged = () => e => {
        this.setState({ studiekod: e.target.value });
    }


    render() {

        const { correctLogin } = this.state;

        if (correctLogin) {
            return (
                <div>
                    <h1> Inloggad: </h1>
                    <p>Skriv in önskad studiekod och ladda ner excelfil.</p>
                    <input type="text" ref={this.inputSurveyCodeRef} value={ this.state.studiekod} onChange={this.handleSurveyCodeChanged()} />
                    <button type="button" onClick={this.getAnswersPressed}>Hämta resultat för studiekod</button>
                    <p style={{ color: this.state.getAnswersErrorTextColor }}>{this.state.getAnswersErrorText}</p>
                </div>
            );
        } else {
            return (
            
                <div >
                    <h1> Logga in: </h1>
                        <p>Användarnamn:</p>
                        <input type="text" ref={this.inputUsernameRef} onChange={this.handleUsernameChanged()} onKeyPress={this.checkLoginEnterPress} />
                        <p>Lösenord:</p>
                        <input type="password" ref={this.inputPasswordRef} onChange={this.handlePasswordChanged()} onKeyPress={this.checkLoginEnterPress} />
                        <p style={{ color: this.state.codeErrorTextColor }}>{this.state.codeErrorText}</p>
                    {/*Knapp för att gå vidare*/}
                    <button type="button" onClick={this.loginPressed}>Logga in</button>
                </div>
                );
        }
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));