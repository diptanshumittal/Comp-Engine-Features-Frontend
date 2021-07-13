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
import {useEffect, useState} from "react";


function createLink(params) {
    return (<Link to={`/exploremode/${params.row.id}/${params.row.NAME}`}><Tooltip title={params.row.NAME}>
        <span className="table-cell-trucate">{params.row.NAME}</span>
    </Tooltip></Link>);
}

const columns = [
    {
        field: 'id',
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
    // if (props.features)
    //     for (let index = 0; index < props.features.length; index++)
    //         props.features[index].id = index
    console.log(props)

    const [features, setFeatures] = useState([]);

    useEffect(() =>{
        if(props.features) {
            let tFeatures = [];
            for (const [key, val] of Object.entries(props.features)) {
                tFeatures.push(val);
            }
            console.log(tFeatures);
            setFeatures(tFeatures);
        }
    },[props.features])



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
                    <StylingCellsGrid features={features}/>
                </div>
            )}
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Explore)
