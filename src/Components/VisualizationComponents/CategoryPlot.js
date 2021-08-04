import React, {useEffect} from 'react';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import {connect} from "react-redux";
import mapStateToProps from "../ReducerComponents/mapStateToProps";
import mapDispatchToProps from "../ReducerComponents/mapDispatchToProps";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    let x = 0
    let grdata = [];
    let colors = ['blue', 'orange', 'green', 'red', 'purple']
    const layout = {
        hovermode: 'closest',
        autosize: false,
        margin: {
            l: 55,
            b: 90,
            t: 60,
            r: 65,
        },
        showlegend: true,
        legend: {
            x: 1,
            y: 1,
            itemwidth: 10
        },
        title: {
            text: props.graphs.yaxes[ind].ytit + '    |    ' + props.graphs.yaxes[ind].title + '<br>Keywords : ' + props.features[props.graphs.yaxes[ind].yfid].keywords,
            font: {
                size: 15
            },
            x: 0.06,
        },
        width: 714 + x,
        height: 530 + x,
        yaxis: {
            title: {
                text: props.graphs.yaxes[ind].ytit,
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
                text: props.graphs.xaxis.xtit,
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

    }
    for (let i = 0; i < props.timeseriescategory.length; i++) {
        let dic = {
            x: props.graphs.xaxis.xdata[i],
            y: props.graphs.yaxes[ind].ydata[i],
            mode: 'markers',
            hoverinfo: "x+y+text",
            text: props.timeseriesnames[i],
            name: props.timeseriescategory[i],
            marker: {
                color: colors[i],
                size: Array.from(Array(props.graphs.xaxis.xdata[i].length).fill(5))
            }
        }
        grdata.push(dic);
    }
    return [grdata, layout]

}

const timeseriesplot = (xdata, ydata, title, color) => {
    const data = [{
        x: xdata,
        y: ydata,
        mode: 'lines',
        color: color,
        line: {
            width: 1,
            color: color
        },
    }]
    const layout = {
        hovermode: 'closest',
        autosize: false,
        margin: {
            l: 55,
            r: 30,
            b: 40,
            t: 22,
        },
        pad: {
            l: 10,
            b: 0,
            t: 0,
            r: 0
        },
        title: {
            text: '<a href="https://www.comp-engine.org/#!search/' + title + '">' + title + '</a>',
            font: {
                size: 15
            }
        },
        width: 1000,
        height: 250,
        yaxis: {
            title: {
                text: "Value",
                standoff: 10,
                font: {
                    size: 13
                }
            },
            zerolinecolor: '#000000',
            zerolinewidth: 1
        },
        xaxis: {
            title: {
                text: "Time",
                standoff: 10,
                font: {
                    size: 13
                }
            },
            zerolinecolor: '#000000',
            zerolinewidth: 1,
            range: [-Math.floor(xdata.length * 0.005), Math.floor(xdata.length * 1.005)]
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
    const [lastclickIndex, setLastclickIndex] = React.useState(0);
    const [lastclickCurve, setLastclickCurve] = React.useState(0);
    const [timeseriesLoading, setTimeseriesLoading] = React.useState(false);

    const handleChange = (event) => {
        const graph = setplotdata(props, event.target.value)
        setFeatureData(graph[0])
        setFeatureLayout(graph[1])
    };
    const handlePlotClick = (data) => {
        let cn = data.points[0].curveNumber;
        let pn = data.points[0].pointNumber;
        let gdata = featureData;
        gdata[cn].marker.size[pn] = 20;
        gdata[lastclickCurve].marker.size[lastclickIndex] = 5;
        setLastclickIndex(pn);
        setLastclickCurve(cn);
        setFeatureData(gdata);
        const index = data.points[0].text;

        if (props.timeseriesBuffer[index] !== undefined) {
            const ydata = props.timeseriesBuffer[index].ydata;
            const xdata = props.timeseriesBuffer[index].xdata;
            const title = props.timeseriesBuffer[index].name;
            const [tdata, tlay] = timeseriesplot(xdata, ydata, title, data.points[0].data.marker.color)
            setTimeseriesdata(tdata)
            setTimeserieslayout(tlay)
        } else {
            setTimeseriesLoading(true)
            axios.get(props.url + 'gettimeseries/' + index).then((response) => {
                const ydata = response.data.ydata;
                const xdata = response.data.xdata;
                const title = response.data.name;
                const [tdata, tlay] = timeseriesplot(xdata, ydata, title, data.points[0].data.marker.color)
                props.addTimeseriesToBuffer(response.data, index)
                setTimeseriesdata(tdata)
                setTimeserieslayout(tlay)
                setTimeseriesLoading(false)
            });
        }
    }

    useEffect(() => {
        const graph = setplotdata(props, 0)
        setFeatureData(graph[0])
        setFeatureLayout(graph[1])
    }, [])

    const Plot = createPlotlyComponent(Plotly);
    const Plot1 = createPlotlyComponent(Plotly);
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Select Feature</InputLabel>
                <Select
                    autoWidth
                    onChange={handleChange}
                    defaultValue={0}
                >
                    {props.graphs.yaxes.map((graph, index) => (
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
                    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d'],
                    displaylogo: false
                }}
                onClick={(data) => handlePlotClick(data)}
            />
            }
            <br/>
            {timeseriesdata && !timeseriesLoading &&
            <Plot1
                data={timeseriesdata}
                layout={timeserieslayout}
                config={{
                    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d'],
                    displaylogo: false
                }}
            />
            }
            {timeseriesLoading &&
            <CircularProgress/>
            }
            {!timeseriesdata &&
            <p>
                Click on data points to load time series !!!
            </p>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPlot)