import {connect} from "react-redux";
import mapStateToProps from "../ReducerComponents/mapStateToProps";
import mapDispatchToProps from "../ReducerComponents/mapDispatchToProps";
import React from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import PlotlyComponent from "./PlotlyComponent";
import CategoryPlot from "./CategoryPlot";
import NetworkGraph from "./NetworkGraph";


const VisualizationDrawer = (props) => {
    const [visualization, setVisualisation] = React.useState("network");
    const setVisualization = (event, newAlignment) => {
        setVisualisation(newAlignment)
    }

    return (
        <div>
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
                overflow: "scroll", height: "900px", width: "100%",
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
    )
};
export default connect(mapStateToProps, mapDispatchToProps)(VisualizationDrawer)
