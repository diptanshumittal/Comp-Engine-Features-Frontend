import { Helmet } from "react-helmet";
import PlotlyComponent from "./PlotlyComponent";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import React, {useEffect} from "react";
import axios from "axios";
import CustomDialogBox from "./CustomDialogBox";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/styles";

function createLink(params) {
    return (<Link to={`/exploremode/${params.row.ID}/${params.row.NAME}`}><Tooltip title={params.row.NAME}>
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
                      components={{
                          Toolbar: GridToolbar,
                      }}/>
        </div>
    );
}

const Result = (props) => {
    if (props.tabledata)
        for (let index = 0; index < props.tabledata.length; index++)
            props.tabledata[index].id = index
    const [openDialog, setOpenDialog] = React.useState(false);
    const [xdata, setXData] = React.useState(true);
    const [ydata, setYdata] = React.useState(true);
    const [title, setTitle] = React.useState(true);

    const handlePlotClick = (data) => {
        const index = data.points[0].pointIndex
        console.log(index)
        axios.get(props.url + 'api/gettimeseries/'+index).then((response) => {
            console.log(response)
            setYdata(response.data.ydata)
            setXData(response.data.xdata)
            setTitle(response.data.name)
            setOpenDialog(true)
        });
    }
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
                    <div id="toolbar" className="download button">
                        <a
                            className="btn btn-dark btn"
                            href="{{featurename}}\download"
                            download="Best-matching-features"
                        >
                            Download Results
                        </a>
                    </div>
                    <br/>
                    <StylingCellsGrid features={props.tabledata}/>
                    <table id="table" data-toolbar="#toolbar" data-toggle="table" data-pagination="true"
                        data-show-toggle="true" data-show-columns="true" data-show-fullscreen="true"
                        data-height="760" data-page-size="12" data-page-list="[12,25,50,100]" style={{textAlign:"left"}}>
                        <thead className="thead-dark">
                        <tr>
                            <th data-field="Rank">Rank</th>
                            <th data-field="Name">Name</th>
                            <th data-field="Keywords">Keywords</th>
                            <th data-field="Corr">Correlation</th>
                            <th data-field="pvalue" data-visible="false" >p-value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.tabledata.map((item) => (
                            <tr>
                                <td>{item.Rank}</td>
                                <td>
                                    <Link className="explorelink" to={`/exploremode/${item.ID}/${item.NAME}`}>
                                        {item.NAME}
                                    </Link>
                                </td>
                                <td>{item.KEYWORDS}</td>
                                <td>{item.COEF}</td>
                                <td>{item.PVALUE}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Helmet>
                        <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.css"/>
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js" />
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/extensions/filter-control/bootstrap-table-filter-control.min.js" />
                    </Helmet>
                    <hr/>
                    <br/>
                    <br/>
                    {props.graphs.map((graph) => (
                        <PlotlyComponent xdata={graph.xdata} ydata={graph.ydata} xtit={graph.xtit} ytit={graph.ytit} title={graph.title} timeseriesnames={props.timeseriesnames} handlePlotClick={handlePlotClick}/>
                    ))}
                    <hr/>
                    <br/>
                    <br/>
                    <img
                        className="clustermap"
                        src={`data:image/png;base64,${props.img}`}
                        alt="mydataplohere"
                        height="850"
                        width="850"
                    />
                </div>
            </div>
        </div>

    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Result)
