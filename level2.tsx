declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');



export default class Level2 extends React.Component {

    render() {

        const { answers1 } = this.props;
        const { answersSepi } = this.props;

        var feedback = new Array();

        var sepiScore = 0;
        for (var i = 0; i < answersSepi.length; i++) {
            sepiScore += answersSepi[i];
        }

        if (answers1[1] >= 60) {
            feedback.push("att du är över 60 år, då risken för hudcancer ökar ju äldre man blir.");
        }
        if (answers1[3] < 3) {
            feedback.push("att du har en hudtyp som skyddar dig mindre bra mot UV-strålningen.");
        }
        if (answers1[6] >= 1 && answers1[6] <= 3) {
            feedback.push("att du redan haft melanom tidigare.");
        }
        if (answers1[7] == 2 || answers1[7] == 3) {
            feedback.push("att du har ärftlighet för sjukdomen (en eller flera förstagradssläktingar som drabbats).");
        }
        if (answers1[8] >= 10) {
            feedback.push("att du har ganska många leverfläckar.");
        }
        if (sepiScore >= 19) {
            feedback.push("att du utsätter dig för rätt mycket sol och/eller inte gör så mycket för att skydda dig mot solen när den är stark.");
        }


        return(
            <div>
                <p>De faktorer som starkast bidrar till din hudcancerrisk är:</p>
                <ul>
                    {feedback.map(function (data, index) {
                        return (
                            <li key={"feedback" + index}>
                                <p>{data}</p>
                            </li>
                        );
                    })}

                </ul>
            </div>
        );
    }

}