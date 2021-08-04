import {useEffect, useState} from "react";
import axios from "axios";
import Result from "../Results";
import Pageloader from "../Pageloader";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import mapStateToProps from "../ReducerComponents/mapStateToProps";
import mapDispatchToProps from "../ReducerComponents/mapDispatchToProps";
import Timeout from "./Timeout";
import SyntaxError from "./SyntaxError";
import WarningPage from "./WarningPage";

const UserFeatureSubmitted = (props) => {
    const [stat, changeStat] = useState("");
    const [isPending, changeIsPending] = useState(true);
    const [dashboardData, setDashboardData] = useState("");
    // const [tableData, changeTabledata] = useState([]);
    // const [totalMatches, changeMatches] = useState(0);
    // const [featurename, changeFname] = useState("");
    // const [img, changeImage] = useState("");
    // const [scatterPlotGraphs, changeScatterPlotGraphs] = useState("");
    // const [timeseriesnames, changeTimeSeriesNames] = useState([]);
    // const [timeseriescategory, changeTimeSeriesCategory] = useState([]);
    // const [networkGraph, changeNetworkGraph] = useState([]);

    useEffect(() => {
        props.addLinkCount()
        console.log("UsersubmittedCode", props.featureName, props.featureCode);
        const formData = new FormData();
        formData.append('featurecode', props.featureCode);
        formData.append('featurename', props.featureName);
        axios.post(props.url+'result', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.stat === 1) {
                setDashboardData(response.data)
                // changeTabledata(response.data.tabledata);
                // changeMatches(response.data.totalmatches);
                // changeFname(response.data.featurename);
                // changeImage(response.data.heatmap);
                // changeScatterPlotGraphs(response.data.scatterplotgraphs);
                // changeTimeSeriesNames(response.data.timeseriesnames);
                // changeTimeSeriesCategory(response.data.timeseriescategory);
                // changeNetworkGraph(response.data.networkGraph);
            }
            changeStat(response.data.stat)
            changeIsPending(false);
        });
    }, []);

    return (
        <div>
            {isPending && <Pageloader/>}
            {/*{!isPending && stat === 1 &&*/}
            {/*<Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img}*/}
            {/*        scatterPlotGraphs={scatterPlotGraphs} timeseriesnames={timeseriesnames} timeseriescategory={timeseriescategory} networkGraph={networkGraph}/>*/}
            {/*}*/}
            {!isPending && stat === 1 &&
            <Result {...dashboardData}/>
            }
            {!isPending && stat === 2 &&
            <SyntaxError/>
            }
            {!isPending && stat === 3 &&
            <WarningPage/>
            }
            {!isPending && stat === 4 &&
            <Timeout />
            }
            {!isPending && stat === 5 && <Redirect to="/"/>}
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(UserFeatureSubmitted)
