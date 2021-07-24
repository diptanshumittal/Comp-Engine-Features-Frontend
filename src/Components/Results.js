import PlotlyComponent from "./PlotlyComponent";
import {connect} from "react-redux";
import mapStateToProps from "./ReducerComponents/mapStateToProps";
import mapDispatchToProps from "./ReducerComponents/mapDispatchToProps";
import React, {useEffect} from "react";
import CategoryPlot from "./CategoryPlot";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import NetworkGraph from "./NetworkGraph";
import DashBoardTable from "./VisualizationComponents/DashBoardTable";


const Result = (props) => {

    const [visualization, setVisualisation] = React.useState("network");
    const setVisualization = (event, newAlignment) => {
        setVisualisation(newAlignment)
    }

    useEffect(()=>{
        if (props.tabledata && props.features)
            props.tabledata.map((item) => {
                item.NAME = props.features[item.id].NAME
                item.KEYWORDS = props.features[item.id].KEYWORDS
            })
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
                    <ToggleButtonGroup value={visualization} exclusive
                                       onChange={setVisualization} style={{width: '100%'}}>
                        <ToggleButton value="scatterPlot" style={{width: '25%'}}>
                            Scatter Plot
                        </ToggleButton>
                        <ToggleButton value="categoryPlot" style={{width: '25%'}}>
                            Category Plot
                        </ToggleButton>
                        <ToggleButton value="heatmap" style={{width: '25%'}}>
                            Heatmap
                        </ToggleButton>
                        <ToggleButton value="network" style={{width: '25%'}}>
                            Network
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <div style={{
                        overflow: "scroll",
                        height: "900px",
                        width: "100%",
                        border: "1px solid rgba(0,0,0,0.12)"
                    }}>
                        <br/>
                        {visualization === "scatterPlot" &&
                            props.scatterPlotGraphs.yaxes.map((yaxis, index) => {
                                    if (index < 12) {
                                        return (
                                            <PlotlyComponent index={index} xdata={props.scatterPlotGraphs.xaxis.xdata}
                                                             ydata={yaxis.ydata}
                                                             xtit={props.scatterPlotGraphs.xaxis.xtit} ytit={yaxis.ytit}
                                                             title={yaxis.title} timeseriesnames={props.timeseriesnames}/>
                                        );
                                    }
                                }
                            )
                        }
                        {visualization === "categoryPlot" &&
                        <CategoryPlot graphs={props.scatterPlotGraphs} timeseriesnames={props.timeseriesnames}
                                      timeseriescategory={props.timeseriescategory}/>
                        }
                        {visualization === "heatmap" &&
                        <img
                            className="clustermap"
                            src={`data:image/png;base64,${props.img}`}
                            alt="mydataplohere"
                            height="850"
                            width="850"
                        />
                        }
                        {visualization === "network" &&
                        <NetworkGraph networkGraph={props.networkGraph}/>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Result)
