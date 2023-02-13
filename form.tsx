declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

const axios = require('axios');

import Ingress from './ingress';
import NumQuestion from './question';
import AltQuestion from './altQuestion';
import TextQuestion from './textQuestion';
import Komun from './komun';
import Result from './result';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.emailInputRef = React.createRef();
        this.smsInputRef = React.createRef();
        this.snailMailInputRef = React.createRef();

        this.state = {
            step: 0,
            answers1: Array.apply(null, Array(props.questions1.length)),
            answersSepi: Array.apply(null, Array(props.sepiQuestions.length)),
            surveyCode: "",
            correctCode: false,
            totalRisk: 0,
            answersSus: Array.apply(null, Array(props.susQuestions.length)),

            contactOption: "",
            kontakt: "",
            test: 0
        };
    }

    //move to next question/page of the form by increasing the step variable
    nextStep = () => {
        const { step } = this.state;
        const { surveyCode } = this.state;

        // hantera sol2-fallet
        if (surveyCode == "sol2" && step == (this.props.questions1.length + this.props.sepiQuestions.length + this.props.susQuestions.length + 1)) {
            this.setState({ step: step + 2 });
            this.callApi();
            return;
        }

        // normalfallet

        this.setState({ step: step + 1 });

        if (step == (this.props.questions1.length + this.props.sepiQuestions.length + this.props.susQuestions.length + 2)) {

            // skicka in svar
            this.callApi();
        }
    }
    //move to previous question/page of the form by decreasing the step variable
    prevStep = () => {
        const { step } = this.state;
        this.setState({step: step - 1});
    }
    //Handle field change
    handleChange = (index) => e =>
    {
        // 1. Make a shallow copy of array
        let array = [...this.state.answers1];
        // 2. insert value into copied array
        array[index] = e.target.value;
        // 3. replace old array
        this.setState({answers1: array});
    }
    handleChangeSEPI = (index) => e => {
        // 1. Make a shallow copy of array
        let array = [...this.state.answersSepi];
        // 2. insert value into copied array
        array[index] = e.target.value;
        // 3. replace old array
        this.setState({ answersSepi: array });
    }
    handleChangeSUS = (index) => e => {
        // 1. Make a shallow copy of array
        let array = [...this.state.answersSus];
        // 2. insert value into copied array
        array[index] = e.target.value;
        // 3. replace old array
        this.setState({ answersSus: array });
    }
    handleSurveyCode = () => e => {
        this.setState({ surveyCode: e.target.value });
    }

    setTotalRisk = (risk) => {
        this.setState({totalRisk: risk});
    }

    contactOptionChange = (event) => {
        var contactOption = event.target.value;
        this.setState({ contactOption: contactOption });

        var resultingContact = "";
        if (contactOption == "email") {
            resultingContact = "Email: " + this.emailInputRef.current.value;
        } else if (contactOption == "sms") {
            resultingContact = "SMS: " + this.smsInputRef.current.value;
        } else if (contactOption == "snailMail") {
            resultingContact = "Postadress: " + this.snailMailInputRef.current.value;
        }
        this.setState({ kontakt: resultingContact });
    }

    emailInputChanged = (e) => {
        const { contactOption} = this.state;
        if (contactOption == "email") {
            var resultingContact = "Email: " + this.emailInputRef.current.value;
            this.setState({ kontakt: resultingContact });
        }
    }
    smsInputChanged = (e) => {
        const { contactOption} = this.state;
        if (contactOption == "sms") {
            var resultingContact = "SMS: " + this.smsInputRef.current.value;
            this.setState({ kontakt: resultingContact });
        }
    }
    snailMailInputChanged = (e) => {
        const { contactOption} = this.state;
        if (contactOption == "snailMail") {
            var resultingContact = "Postadress: " + this.snailMailInputRef.current.value;
            this.setState({ kontakt: resultingContact });
        }
    }

    setKontakt = (kont) => {
        this.setState({ kontakt: kont});
    }

    callApi = () => {

        const res = axios.get('https://hudcancerkollen-test.azurewebsites.net/api/PostAnswers', {
        //const res = axios.get('http://localhost:7071/api/PostAnswers', {
            params: {
                surveycode: this.state.surveyCode,
                individualcode: this.state.answers1[0],
                q1: this.state.answers1[1],
                q2: this.state.answers1[2],
                q3: this.state.answers1[3],
                q4: this.state.answers1[4],
                q5: this.state.answers1[5],
                q6: this.state.answers1[6],
                q7: this.state.answers1[7],
                q8: this.state.answers1[8],
                sepi1: this.state.answersSepi[0],
                sepi2: this.state.answersSepi[1],
                sepi3: this.state.answersSepi[2],
                sepi4: this.state.answersSepi[3],
                sepi5: this.state.answersSepi[4],
                sepi6: this.state.answersSepi[5],
                sepi7: this.state.answersSepi[6],
                sepi8: this.state.answersSepi[7],
                totalrisk: this.state.totalRisk,
                sus1: this.state.answersSus[0],
                sus2: this.state.answersSus[1],
                sus3: this.state.answersSus[2],
                sus4: this.state.answersSus[3],
                sus5: this.state.answersSus[4],
                sus6: this.state.answersSus[5],
                sus7: this.state.answersSus[6],
                sus8: this.state.answersSus[7],
                sus9: this.state.answersSus[8],
                sus10: this.state.answersSus[9],
                kontakt: this.state.kontakt,
            }
        });
    }

    render() {

        const { step } = this.state;
        const { answers1 } = this.state;
        const resultStep = this.props.questions1.length + this.props.sepiQuestions.length + 1;

        if (step == 0) //Ingress
        {
            return (<Ingress nextStep={this.nextStep} handleChange={this.handleSurveyCode} code={ this.state.surveyCode} />);
        }
        else if (step > 0 && step <= this.props.questions1.length) //Questions1
        {
            if (this.props.questions1[step - 1].answer_type == "number_input") 
            {
                return (
                    <NumQuestion
                        step={step}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        object={this.props.questions1[step - 1]}
                        answer={this.state.answers1[step - 1]}
                    />
                );
            }
            else if (this.props.questions1[step - 1].answer_type == "text_input")
            {
                return (
                    <TextQuestion
                        step={step}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        object={this.props.questions1[step - 1]}
                        answer={this.state.answers1[step - 1]}
                    />
                );
            }
            else if (this.props.questions1[step - 1].answer_type == "alternatives")
            {
                return (
                    <div>
                        <h2>Fråga {step}</h2>
                        <AltQuestion
                            step={step}
                            qIndex={step - 1}
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            object={this.props.questions1[step - 1]}
                            answer={this.state.answers1[step - 1]}
                        />
                    </div>
                );
            }
            
        }
        else if (step > this.props.questions1.length && step <= (this.props.questions1.length + this.props.sepiQuestions.length)) //SEPI
        {
            const indexSEPI = step - this.props.questions1.length - 1;
            return (
                <div>
                    <h2>Fråga {step}</h2>
                    <AltQuestion
                        step={step}
                        qIndex={indexSEPI}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChangeSEPI}
                        object={this.props.sepiQuestions[indexSEPI]}
                        answer={this.state.answersSepi[indexSEPI]}
                    />
                </div >
            );
        }
        else if (step == resultStep) //result
        {
            return (
                <Result
                    step={step}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    questions1={this.props.questions1}
                    sepiQuestions={this.props.sepiQuestions}
                    answers1={this.state.answers1}
                    answersSepi={this.state.answersSepi}
                    setRisk={this.setTotalRisk}
                />
            );
        }
        else if (step > resultStep && step <= (resultStep + this.props.susQuestions.length)) //SUS
        {
            const indexSUS = step - resultStep - 1;
            return (
                <div>
                    <h2>Utvärdering {indexSUS + 1}</h2>
                    <p>
                        Nu när du har testat Hudcancerkollen vill vi gärna veta din åsikt om hur tyckte den var att använda och förstå,
                        med hjälp av 10 korta påståenden som du ska ange i vilken grad du instämmer med påståendet eller inte.
                        <br /> Ange hur väl du instämmer med följande påstående:
                    </p>
                    <AltQuestion
                        step={step}
                        qIndex={indexSUS}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChangeSUS}
                        object={this.props.susQuestions[indexSUS]}
                        answer={this.state.answersSus[indexSUS]}
                        />
                </div>
            );
        }
        else if (step == (resultStep + this.props.susQuestions.length) + 1) //kontaktformulär
        {
            return (
                <div>
                    <p>
                        Det var sista frågan.
                        Om 2 veckor vill vi att du använder Hudcancerkollen en gång till, för att kunna värdera instrumentets samstämmighet över tid.
                        Ange hur du vill bli kontaktad för en påminnelse om att göra det:
                    </p>

                    <div>
                        <div className="radio">
                            <label>
                                <input type="radio" value="email" checked={this.state.contactOption === "email"} onChange={this.contactOptionChange}/>
                                Via e-post, adress: 
                            </label>
                            <input type="text" ref={this.emailInputRef} onChange={ this.emailInputChanged}/>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" value="sms" checked={this.state.contactOption === "sms"} onChange={this.contactOptionChange}/>
                                Via sms, tel.nr: 
                            </label>
                            <input type="text" ref={this.smsInputRef} onChange={this.smsInputChanged}/>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" value="snailMail" checked={this.state.contactOption === "snailMail"} onChange={this.contactOptionChange}/>
                                Med vanlig post, postadress:
                            </label>
                            <input type="text" ref={this.snailMailInputRef} onChange={this.snailMailInputChanged}/>
                        </div>
                    </div>

                    <button type="button" onClick={this.nextStep} disabled={this.state.contactOption == null || this.state.contactOption == "" }>Skicka in</button>
                </div>
            );
        }
        else if (step == (resultStep + this.props.susQuestions.length) + 2) // Tack för medverkan
        {
            return (<p>Tack för din medverkan i studien! Du kan nu stänga ner sidan.</p>);
        }
    }
}
