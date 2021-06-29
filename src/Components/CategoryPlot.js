import React from 'react';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PlotlyComponent from "./PlotlyComponent";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const setplotdata = (props, ind) => {
    console.log(ind)
    let grdata = [];
    const layout = {
        hovermode: 'closest',
        autosize: false,
        margin: {
            l: 55,
            b: 90,
            t: 27,
            r:5
        },
        title: {
            text: props.graphs[ind].ytit +'    |    '+ props.graphs[ind].title,
            font: {
                size: 18
            }
        },
        width: 1000,
        height: 450,
        yaxis: {
            title: {
                text: props.graphs[ind].ytit,
                standoff: 15,
                font: {
                    size: 12
                }
            },
            gridcolor: '#ffffff',
            gridwidth: 2,
            zerolinecolor: '#ffffff',
            zerolinewidth: 2,
            linecolor: '#ffffff',
            linewidth: 2
        },
        xaxis: {
            title: {
                text: props.graphs[ind].xtit,
                standoff: 10,
                font: {
                    size: 12
                }
            },
            gridcolor: '#ffffff',
            gridwidth: 2,
            zerolinecolor: '#ffffff',
            zerolinewidth: 2,
            linecolor: '#ffffff',
            linewidth: 2
        },
        plot_bgcolor: '#ededed',
        showlegend: true,
        legend: {"orientation": "h"}
    }
    for (let i = 0; i < props.timeseriescategory.length; i++) {
        let dic = {
            x: props.graphs[ind].xdata[i],
            y: props.graphs[ind].ydata[i],
            mode: 'markers',
            text: props.timeseriesnames[i],
            name: props.timeseriescategory[i],
            marker: {
                size: 5
            }
        }
        grdata.push(dic);
    }
    return [grdata, layout]

}

const timeseriesplot = (xdata, ydata, title) => {
    const data = [{
        x: xdata,
        y: ydata,
        mode: 'lines',
        marker:{
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
            l: 55,
            r: 5,
            b: 100,
            t: 22,
        },
        pad:{
            l:10,
            b:0,
            t:0,
            r:0
        },
        title: {
            text: title,
            font: {
                size: 15
            }
        },
        width: 1000,
        height: 250,
        yaxis: {
            zerolinecolor: '#000000',
            zerolinewidth: 1
        },
        xaxis: {
            zerolinecolor: '#000000',
            zerolinewidth: 1,
            range: [-10, xdata.length]
        },
        plot_bgcolor: '#ededed'
    }
    return [data, layout]
}

function CategoryPlot(props) {
    const [timeseriesdata, setTimeseriesdata] = React.useState(false);
    const [timeserieslayout, setTimeserieslayout] = React.useState(false);
    const classes = useStyles();
    const [featureData, setFeatureData] = React.useState(false);
    const [featureLayout, setFeatureLayout] = React.useState(false);
    const handleChange = (event) => {
        const graph = setplotdata(props, event.target.value)
        setFeatureData(graph[0])
        setFeatureLayout(graph[1])
    };
    const handlePlotClick = (data) => {
        const index = data.points[0].text
        axios.get(props.url + 'api/gettimeseries/' + index).then((response) => {
            const ydata = response.data.ydata
            const xdata = response.data.xdata
            const title = response.data.name
            const [tdata, tlay] = timeseriesplot(xdata, ydata, title)
            setTimeseriesdata(tdata)
            setTimeserieslayout(tlay)
        });
    }

    const Plot = createPlotlyComponent(Plotly);
    const Plot1 = createPlotlyComponent(Plotly);
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Select Feature</InputLabel>
                <Select
                    autoWidth
                    onChange={handleChange}
                >
                    {props.graphs.map((graph,index) => (
                        <MenuItem value={index}>{graph.ytit}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br/>
            <br/>
            {featureLayout &&
            <Plot
                data={featureData}
                layout={featureLayout}
                config={{
                    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
                    displaylogo: false
                }}
                onClick={(data) => handlePlotClick(data)}
            />
            }
            <br/>
            {timeseriesdata &&
            <Plot1
                data={timeseriesdata}
                layout={timeserieslayout}
                config={{
                    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
                    displaylogo: false
                }}
            />
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPlot)