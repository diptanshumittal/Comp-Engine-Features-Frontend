import React from 'react';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

function PlotlyComponent({data, layout, config}) {
    const Plot = createPlotlyComponent(Plotly);
    function handleClick(data) {
        console.log(data);
    }
    return (
        <Plot
            data={data}
            layout={layout}
            //config={config}
            onclick = {(data) => handleClick(data)}
        />
    );
}

export default PlotlyComponent;