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

        this.state = {
            step: 0,
            answers1: Array.apply(null, Array(props.questions1.length)),
            answersSepi: Array.apply(null, Array(props.sepiQuestions.length)),
            surveyCode: "",
            correctCode: false,
            test: 0
        };
    }

    //move to next question/page of the form by increasing the step variable
    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });

        if (step == (this.props.questions1.length + this.props.sepiQuestions.length + 1)) {
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
    handleSurveyCode = () => e => {
        this.setState({ surveyCode: e.target.value });
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
                sepi8: this.state.answersSepi[7],   //TODO: fixa de sista bitarna
                totalrisk: 0,
                sus1: 0,
                sus2: 0,
                sus3: 0,
                sus4: 0,
                sus5: 0,
                sus6: 0,
                sus7: 0,
                sus8: 0,
                sus9: 0,
                sus10: 0,
                kontakt: "testkontakt",
            }
        });
    }

    render() {

        const { step } = this.state;
        const { answers1 } = this.state;

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
                    <AltQuestion
                        step={step}
                        qIndex={step - 1}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        object={this.props.questions1[step - 1]}
                        answer={this.state.answers1[step - 1]}
                    />
                );
            }
            
        }
        else if (step > this.props.questions1.length && step <= (this.props.questions1.length + this.props.sepiQuestions.length)) //SEPI
        {
            const indexSEPI = step - this.props.questions1.length - 1;
            return (
                <AltQuestion
                    step={step}
                    qIndex={indexSEPI}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChangeSEPI}
                    object={this.props.sepiQuestions[indexSEPI]}
                    answer={this.state.answersSepi[indexSEPI]}
                />
            );
        }
        else if (step == (this.props.questions1.length + this.props.sepiQuestions.length + 1)) //komun
        {
            return (
                <Komun
                    step={step}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                />
            );
        }
        else if (step == (this.props.questions1.length + this.props.sepiQuestions.length + 2)) //result
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
                />
            );
        }
        else if (step == (this.props.questions1.length + this.props.sepiQuestions.length + 3)) //Send to database Success
        {
            return (<p>Inte implementerat</p>);
        }
    }
}
