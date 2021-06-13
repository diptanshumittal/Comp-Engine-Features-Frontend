import { Link } from "react-router-dom";
import {useState} from "react";
import Nav_link from "./Nav_link";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

const Navbarcustom = (props) => {
    const forceUpdate = useForceUpdate();
    return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" onClick={props.addLinkCount}>
                <Link className="navbar-brand" to="/">Comp-Engine-Features</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Nav_link to="/" name="Home"/>
                        <Nav_link to="/howitworks" name="How it Works"/>
                        <Nav_link to="/explore" name="Explore"/>
                        <Nav_link to="/contact" name="Contact Us"/>
                        <Nav_link to="/contribute" name="Contribute"/>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbarcustom)