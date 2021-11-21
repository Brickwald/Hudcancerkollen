declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');



export default class Level3 extends React.Component {

    render() {

        const { answersSepi } = this.props;
        const { sepiQuestions } = this.props;


        //get max value in array
        var max = 0;
        var threshold = 2;
        for (var i = 0; i < answersSepi.length; i++)
        {
            if (Number(answersSepi[i]) > max)
                max = Number(answersSepi[i]);
        }

        if (max < 3)
            threshold = 1;


        //print feedback for answers of max value
        if (max < 2) {
            return (
                <div>
                    <p>Åtgärder du skulle kunna göra för att minska din hudcancerrisk är att:</p>
                    <ul>
                        <li>Fortsätta vara så försiktig i solen som du redan är.</li>
                    </ul>
                </div>

            );
        }
        else
        {
            return (
                <div>
                    <p>Åtgärder du skulle kunna göra för att minska din hudcancerrisk är att:</p>
                    <ul>
                        {sepiQuestions.map(function (data, index) {

                            if (Number(answersSepi[index]) > threshold)
                                return (
                                    <li key={"SEPIfeedback" + index}>
                                        <p>{data.feedback}</p>
                                    </li>
                                );
                        })}

                    </ul>
                </div>
            );
        }
        
    }

}