import PlotlyComponent from "./PlotlyComponent";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import React, {useEffect} from "react";
import CustomDialogBox from "./CustomDialogBox";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/styles";
import CategoryPlot from "./CategoryPlot";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import NetworkGraph from "./NetworkGraph";


function createLink(params) {
    return (<Link to={`/exploremode/${params.row.id}/${params.row.NAME}`}><Tooltip title={params.row.NAME}>
        <span className="table-cell-trucate">{params.row.NAME}</span>
    </Tooltip></Link>);
}

const columns = [
    {
        field: 'Rank',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        headerName: 'Rank',
        headerClassName: 'super-app-theme--header',
        label: 'NAME',
        flex: 0.12,
    },
    {
        field: 'NAME',
        headerName: 'Feature Names',
        headerClassName: 'super-app-theme--header',
        renderCell: createLink,
        flex: 0.4
    },
    {
        field: 'KEYWORDS',
        headerName: 'Tags',
        headerClassName: 'super-app-theme--header',
        flex: 0.3
    },
    {
        field: 'COEF',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        headerName: 'Corr',
        headerClassName: 'super-app-theme--header',
        flex: 0.2
    }
];


const useStyles = makeStyles({
    root: {
        '& .super-app-theme--header': {
            fontWeight: '900',
            fontSize: '1rem'
        },
        '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.negative': {
            backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.positive': {
            backgroundColor: '#d47483',
            color: '#1a3e72',
            fontWeight: '600',
        },
    },
});


function StylingCellsGrid(props) {
    const classes = useStyles();
    return (
        <div style={{height: 730, width: '100%'}} className={classes.root}>
            <DataGrid pagination disableSelectionOnClick rowBuffer={20} rows={props.features} columns={columns}
                      rowHeight={35}
                      components={{
                          Toolbar: GridToolbar,
                      }}/>
        </div>
    );
}

const Result = (props) => {



    const [openDialog, setOpenDialog] = React.useState(false);
    const [xdata, setXData] = React.useState(true);
    const [ydata, setYdata] = React.useState(true);
    const [title, setTitle] = React.useState(true);
    const [tableData, setTableData] = React.useState("network");
    const [visualization, setVisualisation] = React.useState("network");
    const setVisualization = (event, newAlignment) => {
        setVisualisation(newAlignment)
    }

    useEffect(()=>{
        let list = []
        if (props.tabledata)
            props.tabledata.map((item) => {
                item.NAME = props.features[item.id].NAME
                item.KEYWORDS = props.features[item.id].KEYWORDS
                list.push(item)
            })
        setTableData(list);
    },[props.tabledata])
    return (
        <div id="resultsec">
            {openDialog && <CustomDialogBox xdata={xdata} ydata={ydata} title={title} setOpenDialog={setOpenDialog}/>}
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
                    <StylingCellsGrid features={props.tabledata}/>
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
