import img2 from "../assets/img/preloader.gif";
import {connect} from "react-redux";
import mapStateToProps from "./ReducerComponents/mapStateToProps";
import mapDispatchToProps from "./ReducerComponents/mapDispatchToProps";
import CircularProgress from '@material-ui/core/CircularProgress';
import React from "react";

const Pageloader = () => {
    return (
        <div>
            {/*<p className="display-4">*/}
            {/*    <strong>This may take some time so sit back and relax.</strong>*/}
            {/*</p>*/}
            <div className="popup">
                {/*<img src={img2} />*/}
                <CircularProgress
                size="60px"
                thickness="4"
                style={{color:"#007bff"}}/>
            </div>
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Pageloader)
