import React from 'react';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

function PlotlyComponent({xdata, ydata, xtit, ytit, title}) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const data = [{
        x: xdata,
        y: ydata,
        mode: 'markers',
        marker:{
            color: randomColor,
        }
    }]
    const layout = {

        autosize: false,
        margin: {
            l: 33,
            r: 20,
            b: 90,
            t: 27,
        },
        title: {
            text:title,
            standoff: 10,
            font: {
                size: 18
            },
            pad: {
                b: 100
            },
        },
        width: 270,
        height: 347,
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
        yaxis: {
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
    function handleClick(data) {
        console.log(data);
    }
    return (
            <Plot
                data={data}
                layout={layout}
                config={{displayModeBar: false}}
                onclick = {(data) => handleClick(data)}
            />
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(PlotlyComponent)