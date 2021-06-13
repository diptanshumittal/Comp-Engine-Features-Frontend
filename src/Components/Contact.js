import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const Contact = () => {
    return (
        <div id="contactsec" >
            <Helmet>
                <script src="https://use.fontawesome.com/8ef3ce1ffd.js"></script>
            </Helmet>
        <div className="container">
            <p className="display-1">Connect with us</p>
            <hr/>
            <p className="lead">Here is how you can reach us. </p>
            <div className="contact-box">
                <h2>Reach us</h2>
                <ul>
                    <li><a target="_blank" rel="noreferrer" href="https://mail.google.com/mail/?view=cm&fs=1&to=physics.compengine@sydney.edu.au"><i className="fa fa-envelope"></i></a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/NeuralSystemsAndSignals/Comp-Engine-Features"><i className="fa fa-github"></i></a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://twitter.com/compTimeSeries"><i className="fa fa-twitter"/></a></li>
                </ul>
            </div>
        </div>
        </div>

    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact)
