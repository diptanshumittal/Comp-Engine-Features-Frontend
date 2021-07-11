import React from 'react';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

function PlotlyComponent({xdata, ydata, xtit, ytit, title, timeseriesnames, handlePlotClick}) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const xData = [].concat(...xdata);
    const yData = [].concat(...ydata);
    const timeSeriesNames = [].concat(...timeseriesnames);
    const data = [{
        x: xData,
        y: yData,
        mode: 'markers',
        text: timeSeriesNames,
        //hovertemplate:  'X: %{x}' + 'Y: %{y}' + '<b>%{text}</b>' +'<extra></extra>',
        marker:{
            color: randomColor,
            size:5
        }
    }]
    const layout = {
        hovermode: 'closest',
        autosize: false,
        margin: {
            l: 55,
            r: 20,
            b: 90,
            t: 22,
        },
        title: {
            text:title,
            font: {
                size: 15
            }
        },
        width: 360-37,
        height: 320+40,
        yaxis: {
            title: {
                text: ytit,
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
                text: xtit,
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
    const Plot = createPlotlyComponent(Plotly);
    return (
        <Plot
            data={data}
            layout={layout}
            config={{ modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
                      displaylogo: false}}
            onClick={(data) => handlePlotClick(data)}
        />
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(PlotlyComponent)