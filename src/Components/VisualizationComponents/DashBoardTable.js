import {connect} from "react-redux";
import mapStateToProps from "../ReducerComponents/mapStateToProps";
import mapDispatchToProps from "../ReducerComponents/mapDispatchToProps";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/styles";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import React from "react";


function createLink(params) {
    return (<Link to={`/exploremode/${params.row.id}/${params.row.NAME}`}><Tooltip title={params.row.NAME}>
        <span className="table-cell-trucate">{params.row.NAME}</span>
    </Tooltip></Link>);
}

const DashboardTableColumns = [
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
            <DataGrid pagination disableSelectionOnClick rowBuffer={20} rows={props.features} columns={DashboardTableColumns}
                      rowHeight={35}
                      components={{
                          Toolbar: GridToolbar,
                      }}/>
        </div>
    );
}

const DashBoardTable = (props) => {
    return <StylingCellsGrid features={props.tabledata}/>
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardTable)
