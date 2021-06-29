import img2 from "../assets/img/preloader.gif";
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import Tooltip from "@material-ui/core/Tooltip";
import * as React from 'react';
import {
    DataGrid,
    GridToolbar
} from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/styles';


function createLink(params) {
    return (<Link to={`/exploremode/${params.row.ID}/${params.row.NAME}`}><Tooltip title={params.row.NAME}>
        <span className="table-cell-trucate">{params.row.NAME}</span>
    </Tooltip></Link>);
}

const columns = [
    {
        field: 'ID',
        type: 'number',
        headerName: 'S.No',
        headerAlign: 'left',
        align: 'left',
        headerClassName: 'super-app-theme--header',
        label: 'NAME',
        flex: 0.1,
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
        flex: 0.4
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


const Explore = (props) => {
    if (props.features)
        for (let index = 0; index < props.features.length; index++)
            props.features[index].id = index


    return (
        <div>
            {props.features === null && (
                <div id="pageloader">
                    <p className="display-4">
                        <strong>This may take some time so sit back and relax.</strong>
                    </p>
                    <div className={{display: "flex", justifyContent: "center"}}>
                        <img src={img2}/>
                    </div>
                </div>
            )}
            {props.features && (
                <div className="container mt-2 mb-2">
                    <br/><br/>
                    <div id="exploresec">
                        <div className="display-1">Explore time series features</div>
                        <hr/>
                        <p className="lead">
                            {props.lorem}
                        </p>
                    </div>
                    <StylingCellsGrid features={props.features}/>
                    {false &&
                    <table className="table-striped" id="table" data-toggle="table" data-pagination="true"
                           data-filter-control="true"
                           data-height="730" data-page-size="12" data-page-list="[15,35,55,100]">
                        <thead className="thead-dark">
                        <tr>
                            <th data-field="ID">S.No</th>
                            <th data-field="Name" data-filter-control="input"
                                data-filter-control-placeholder="Search by feature name">Feature Names
                            </th>
                            <th data-field="Keywords" data-filter-control="input"
                                data-filter-control-placeholder="Search by Tags">Tags
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            props.features.map((item) => (
                                <tr>
                                    <td onClick={() => console.log("Clicked")}><a>{item.ID}</a></td>
                                    <td><Link to={`/exploremode/${item.ID}/${item.NAME}`}>{item.NAME}>{item.NAME}</Link>
                                    </td>
                                    <td>{item.KEYWORDS}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    }
                    {false &&
                    <Helmet>
                        <link rel="stylesheet"
                              href="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.css"/>
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js"/>
                        <script
                            src="https://unpkg.com/bootstrap-table@1.17.1/dist/extensions/filter-control/bootstrap-table-filter-control.min.js"/>
                    </Helmet>
                    }
                </div>
            )}
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Explore)
