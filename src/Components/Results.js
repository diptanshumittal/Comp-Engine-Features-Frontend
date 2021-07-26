import {connect} from "react-redux";
import mapStateToProps from "./ReducerComponents/mapStateToProps";
import mapDispatchToProps from "./ReducerComponents/mapDispatchToProps";
import React, {useEffect} from "react";
import DashBoardTable from "./VisualizationComponents/DashBoardTable";
import VisualizationDrawer from "./VisualizationComponents/VisualizationDrawer";


const Result = (props) => {

    useEffect(()=>{
        if (props.tabledata && props.features)
            props.tabledata.map((item) => {
                item.NAME = props.features[item.id].NAME
                item.KEYWORDS = props.features[item.id].KEYWORDS
            })
        window.scrollTo(0, 0)
    },[props.tabledata, props.features])

    return (
        <div id="resultsec">
            <div className="container">
                <p className="display-2">Dashboard</p>
                <hr/>
                <br/>
                <br/>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Feature Name </b>
                        <span className="badge badge-primary badge-pill">
                          {props.featurename}
                        </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Total Matches </b>
                        <span className="badge badge-primary badge-pill">
                          {props.totalmatches}
                        </span>
                    </li>
                </ul>
                <div className="container mt-2 mb-2">
                    <br/>
                    <DashBoardTable tabledata={props.tabledata}/>
                    <br/>
                    <hr/>
                    <br/>
                    <VisualizationDrawer {...props}/>
                </div>
            </div>
        </div>

    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Result)
