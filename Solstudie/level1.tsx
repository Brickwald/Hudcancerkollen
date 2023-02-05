declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');



export default class Level1 extends React.Component {

    render()
    {
        return (
            <div>
                <p>Eftersom det här är en testversion av Hudcancerkollen får du i den versionen ingen återkoppling kring hur din sammanvägda hudcancerrisk ser ut i jämförelse med andra, utan enbart vilka specifika riskfaktorer du har.</p>
            </div>
        );
        /* Detta visar olika beroende på risk
        if (this.props.risk < 132)
        {
            return (
                <div>
                    <p>Jämfört med de flesta individer i Sverige är din risk att drabbas av melanom (hudcancer) förhållandevis låg.</p>
                </div>
            );
        }
        else if (this.props.risk < 660)
        {
            return (
                <div>
                    <p>Du har en måttlig risk att i framtiden drabbas av melanom (hudcancer), ungefär i nivå med genomsnittet i befolkningen.</p>
                </div>
            );
        }
        else if (this.props.risk < 1188)
        {
            return (
                <div>
                    <p>Jämfört med snittet har du en något förhöjd risk att i framtiden drabbas av melanom (hudcancer).</p>
                </div>
            );
        }
        else if (this.props.risk >= 1188)
        {
            return (
                <div>
                    <p>Jämfört med de flesta har du en ordentligt förhöjd risk att i framtiden drabbas av melanom (hudcancer).</p>
                </div>
            );
        }
        */
    }

}