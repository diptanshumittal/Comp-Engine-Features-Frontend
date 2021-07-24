import { Link } from "react-router-dom";
import Nav_Link from "./Nav_Link";
import {connect} from "react-redux";
import mapStateToProps from "./ReducerComponents/mapStateToProps";
import mapDispatchToProps from "./ReducerComponents/mapDispatchToProps";

const Navbarcustom = (props) => {
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
                        <Nav_Link to="/" name="Home"/>
                        <Nav_Link to="/howitworks" name="How it Works"/>
                        <Nav_Link to="/explore" name="Explore"/>
                        <Nav_Link to="/contact" name="Contact Us"/>
                        <Nav_Link to="/contribute" name="Contribute"/>
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