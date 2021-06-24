import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-basic-dist";
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({}))(MuiDialogContent);


const CustomDialogBox = (props) => {
    const open = true
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const data = [{
        x: props.xdata,
        y: props.ydata,
        mode: 'markers',
        marker:{
            color: randomColor,
            size:3,
            line: {
                width: 0.5},
            opacity: 0.8
        }
    }]
    const layout = {
        hovermode: 'closest',
        autosize: false,
        margin: {
            l: 100,
            r: 100,
            b: 100,
            t: 100,
        },
        pad:{
            l:200,
            b:0,
            t:0,
            r:0
        },
        width: props.xdata.length*1.5,
        height: 500,
        yaxis: {
            zerolinecolor: '#000000',
            zerolinewidth: 1
        },
        xaxis: {
            zerolinecolor: '#000000',
            zerolinewidth: 1,
            range: [-10, props.xdata.length]
        },
        plot_bgcolor: '#ededed',

    }

    const handleClose = () => {
        props.setOpenDialog(false);
    };
    const Plot = createPlotlyComponent(Plotly);

    return (
        <div>
            <Dialog maxWidth="xl" TransitionComponent={Transition} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Time Series Name = {props.title}
                </DialogTitle>
                <DialogContent dividers>
                    <Plot
                        data={data}
                        layout={layout}
                        config={{ modeBarButtonsToRemove: ['pan2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
                            displaylogo: false}}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialogBox)