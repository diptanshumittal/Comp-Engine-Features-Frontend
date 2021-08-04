import {connect} from "react-redux";
import mapStateToProps from "./ReducerComponents/mapStateToProps";
import mapDispatchToProps from "./ReducerComponents/mapDispatchToProps";
import React, {useEffect} from "react";
import Chip from '@material-ui/core/Chip';
import DashBoardTable from "./VisualizationComponents/DashBoardTable";
import VisualizationDrawer from "./VisualizationComponents/VisualizationDrawer";
import Tooltip from "@material-ui/core/Tooltip";


const Result = (props) => {

    useEffect(() => {
        if (props.tabledata && props.features)
            props.tabledata.map((item) => {
                item.name = props.features[item.id].name
                item.keywords = props.features[item.id].keywords
            })
        window.scrollTo(0, 0)
    }, [props.tabledata, props.features])

    return (
        <div id="resultsec">
            <div className="container" style={{marginTop: "3%"}}>
                <p className="display-1">Dashboard</p>
                <hr/>
                <br/>
                <br/>
                <ul className="list-group" style={{width: "fit-content", display: "table", margin: "0 auto"}}>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b style={{marginRight: "50px"}}>Target Feature</b>
                        <Tooltip title="Feature being explored">
                            <Chip
                                style={{backgroundColor: "#007bff", color: "#fff"}}
                                label={props.featurename}
                                key={props.featurename}
                                className={"badge badge-primary badge-pill"}>
                            </Chip>
                        </Tooltip>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b style={{marginRight: "50px"}}>Total Matches</b>
                        <Tooltip title={props.totalmatches+" features had Spearman correlation coefficient's p-value less than 0.05"}>
                        <Chip
                            style={{backgroundColor: "#007bff", color: "#fff"}}
                            label={props.totalmatches}
                            key={props.totalmatches}
                            className={"badge badge-primary badge-pill"}
                        ></Chip>
                        </Tooltip>
                    </li>
                    {props.codeFile !== undefined &&
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b style={{marginRight: "50px"}}>Code File</b>
                        <Tooltip title={props.description}>
                            <Chip
                                style={{backgroundColor: "#007bff", color: "#fff"}}
                                label={props.codeFile}
                                key={props.codeFile}
                                className={"badge badge-primary badge-pill"}
                            ></Chip>
                        </Tooltip>
                    </li>
                    }
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
