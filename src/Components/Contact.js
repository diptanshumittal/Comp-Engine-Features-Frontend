import {Helmet} from "react-helmet";

const Contact = () => {
    return (
        <div id="contactsec" >
            <Helmet>
                <script src="https://use.fontawesome.com/8ef3ce1ffd.js"></script>
            </Helmet>
        <div class="container">
            <p class="display-1">Connect with us</p>
            <hr/>
            <p class="lead">Here is how you can reach us. </p>
            <div class="contact-box">
                <h2>Reach us</h2>
                <ul>
                    <li><a target="_blank"
                           href="https://mail.google.com/mail/?view=cm&fs=1&to=physics.compengine@sydney.edu.au"><i class="fa fa-envelope"></i></a></li>
                    <li><a target="_blank" href="https://github.com/NeuralSystemsAndSignals/Comp-Engine-Features"><i class="fa fa-github"></i></a></li>
                    <li><a target="_blank" href="https://twitter.com/compTimeSeries"><i class="fa fa-twitter"/></a></li>
                </ul>
            </div>
        </div>
        </div>

    );
};
export default Contact;
