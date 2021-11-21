declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');



export default class Level4 extends React.Component {

    render() {
        if (this.props.antal < 5) {
            return (
                <div>
                    <p>Även om du har angett att du har ganska få leverfläckar kan det vara bra att ändå hålla lite koll på dem du har, och kontakta din vårdcentral om du upptäcker en leverfläck som:</p>
                    <TheList/>
                </div>
            );
        }
        else if (this.props.antal < 10) {
            return (
                <div>
                    <p>Du bör också regelbundet själv hålla koll på dina leverfläckar (eller be någon anhörig kolla efter på kroppslokaler som är svåra att själv titta på, såsom ryggen), och kontakta din vårdcentral om du upptäcker en leverfläck som:</p>
                    <TheList />
                </div>
            );
        }
        else if (this.props.antal > 10) {
            return (
                <div>
                    <p>Eftersom du har många leverfläckar bör du vara extra noga med att regelbundet se över dem (eller be någon anhörig kolla efter på kroppslokaler som är svåra att själv titta på, såsom ryggen), och kontakta din vårdcentral om du upptäcker en leverfläck som:</p>
                    <TheList />
                </div>
            );
        }

    }

}

class TheList extends React.Component {

    render() {
        return (
            <ul>
                <li>
                    verkar växa och bli större och större. Det är ovanligt att det leverfläckar som är mindre än 5 mm är melanom.
                </li>
                <li>
                    har fått konstig form, t.ex. spretig, stjärnformad eller väldigt ojämn.
                </li>
                <li>
                    är oregelbunden i färgen, t.ex. väldigt ljusbrun i ena delen och väldigt mörk i den andra.
                </li>
                <li>
                    uppvisar flera olika färger, framförallt andra färger än brunt (t.ex. rött, svart, blått eller violett).
                </li>
                <li>
                    blir ihållande sårig, ömmar eller blöder utan att du rivit på den.
                </li>
                <li>
                    kliar intensivt eller ihållande (vanliga leverfläckar som är lite upphöjda kan ibland klia lite om de skaver mot kläder, vilket i sig inte är tecken på något farligt).
                </li>
            </ul>
        );
    }

}