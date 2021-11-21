declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

import Level1 from './level1';
import Level2 from './level2';
import Level3 from './level3';
import Level4 from './level4';

export default class Result extends React.Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    calculateResult() {
        const { answers1 } = this.props;
        const { answersSepi } = this.props;

        var sum = 0.0;

        //Ålder 
        //q1
        var age = 0.0;

        if (answers1[0] < 40)
        {
            age = 1.0;
        }
        else if (answers1[0] > 60)
        {
            age = 3.0;
        }
        else  // 40 <= answers[0] <= 60
        {
            age = 2.0;
        }

        //kön
        //q2
        var gender = 1.0;

        if (answers1[1] == 1)    //om man
            gender = 1.1;

        //Hudtyp * hårfärg * fräknar (max 2.0)
        //q3        q4          q5
        var hairSkinFreck = 0.0;
        var hair = 0.0;
        var skin = 0.0;
        var freck = 0.0;

        switch (Number(answers1[2])) {
            case 0:
                skin = 1.6;
                break;
            case 1:
                skin = 1.4;
                break;
            case 2:
                skin = 1.2;
                break;
            case 3:
                skin = 1.0;
                break;
            case 4:
                skin = 1.0;
                break;
            case 5:
                skin = 1.0;
                break;
        }

        switch (Number(answers1[3])) {
            case 0:
                hair = 1.0;
                break;
            case 1:
                hair = 1.0;
                break;
            case 2:
                hair = 1.4;
                break;
            case 3:
                hair = 1.7;
                break;
        }

        switch (Number(answers1[4])) {
            case 0:
                freck = 1.0;
                break;
            case 1:
                freck = 1.5;
                break;
        }

        hairSkinFreck = hair * skin * freck;
        if (hairSkinFreck > 2.0) hairSkinFreck = 2.0;

        //själv haft hudcancer
        //q6
        var selfCancer = 0.0;

        switch (Number(answers1[5])) {
            case 0:
                selfCancer = 1.0;
                break;
            case 1:
                selfCancer = 5.0;
                break;
            case 2:
                selfCancer = 4.0;
                break;
            case 3:
                selfCancer = 4.0;
                break;
            case 4:
                selfCancer = 1.0;
                break;
        }
        //släkt haft hudcancer
        //q7
        var famCancer = 0.0;

        switch (Number(answers1[6])) {
            case 0:
                famCancer = 1.0;
                break;
            case 1:
                famCancer = 2.0;
                break;
            case 2:
                famCancer = 4.0;
                break;
            case 3:
                famCancer = 1.0;
                break;
        }

        //antal leverfläckar
        //q8
        var lever = 0.0;

        if (answers1[7] < 5) {
            lever = 1.0;
        }
        else if (answers1[7] >= 10) {
            lever = 5.0;
        }
        else  // 5 <= answers[0] < 10
        {
            lever = 3.0;
        }

        //SEPI score
        var sepiScore = 0;

        for (var i = 0; i < answersSepi.length; i++)
        {
            sepiScore += answersSepi[i];
        }

        var sepi = 0.0;

        if (sepiScore < 14) {
            sepi = 1.0;
        }
        else if (sepiScore > 19) {
            sepi = 2.0;
        }
        else  // 14 < sepiScore < 19
        {
            sepi = 1.2;
        }

        //summera alltihop
        sum = age * gender * hairSkinFreck * selfCancer * famCancer * lever * sepi;

        //console.log("age= " + age);
        //console.log("gender= " + gender);
        //console.log("hairSkinFreck= " + hairSkinFreck);
        //console.log("selfCancer= " + selfCancer);
        //console.log("famCancer= " + famCancer);
        //console.log("lever= " + lever);
        //console.log("sepi= " + sepi);
        //console.log("sum= " + sum);

        return sum;
    }

    render() {
        const { answers1 } = this.props;
        const { answersSepi } = this.props;

        var risk = this.calculateResult();

        return (
            <div>
                <h2>Resultat:</h2>

                {/*Text*/}
                {/*Display questions and answers*/}
                {/*
                <ol>
                    {this.props.questions1.map(function (data, index) {
                        return (
                            <li key={"q" + index}>
                                <p>{data.text}</p>
                                <p>{answers1[index]}</p>
                            </li>
                        );
                    })}
                    {this.props.sepiQuestions.map(function (data, index) {
                        return (
                            <li key={"qs" + index}>
                                <p>{data.text}</p>
                                <p>{answersSepi[index]}</p>
                            </li>
                        );
                    })}
                </ol>
                */}
                {/*Display sepi questions and answers*/}


                
                {/*Nivå 1: Risknivå*/}
                <Level1 risk={risk}/>
                {/*Nivå 2: Återkoppling individuella svar*/}
                <Level2 risk={risk} answers1={answers1} answersSepi={answersSepi} />
                {/*Nivå 3: Återkoppling SEPI*/}
                <Level3 risk={risk} sepiQuestions={this.props.sepiQuestions} answersSepi={answersSepi}/>
                {/*Nivå 4: Leverfläckar*/}
                <Level4 antal={answers1[7]} />

                
                {/*Knappar*/}
                {/*<button type="button" onClick={this.back}>Tillbaka</button>
                <button type="button" onClick={this.continue}>Skicka in resultat</button>*/}
            </div>
        );
    }
}