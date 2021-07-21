import React, {memo, useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import Graph from "react-graph-vis";
import {v4} from "uuid";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import axios from "axios";


function NetworkGraph(props) {
    const [graph, setGraph] = useState();
    useEffect(() => {
        setGraph(props.networkGraph)
    }, [])
    const [selectedFeature, setSelectedFeature] = useState("");
    const handleClick = async (action, data) => {
        if (action === 'NODE_SINGLE_CLICK') {
            setSelectedFeature(props.features[data.id].NAME + " " + props.features[data.id].KEYWORDS)
        }
        // if (action === 'NODE_DOUBLE_SINGLE_CLICK') {
        //     axios.get(props.url + 'network/' + data.id + '/' + data.totalNodes).then((response) => {
        //         // setGraph(response.data)
        //         return response.data
        //     });
        // }

    }
    const memoHandleClick = useCallback(handleClick, [])
    return (
        <div>
            {graph &&
            <GetGraph displayer={memoHandleClick} graph={graph} url={props.url}/>}
            <h1>{selectedFeature}</h1>
        </div>
    );
}

const GetGraph = memo((props) => {
    const [graph, setGraph] = React.useState(props.graph);
    const [totalNode, setTotalNode] = React.useState(20);
    let selectedFeatureId = ""
    const options = {
        layout: {
            hierarchical: false
        },
        // edges: {
        //     color: "#000000"
        // },
        height: "600px"
    };
    const interactions = {
        navigationButtons: true
    }
    const events = {
        select: (event) => {
            if (event.nodes.length !== 0) {
                props.displayer('NODE_SINGLE_CLICK', {
                    'id': graph.nodes[event.nodes[0]].title
                })
                selectedFeatureId = graph.nodes[event.nodes[0]].title
            }
        },
        doubleClick: (event) => {
            let {nodes, edges} = event;
            if (nodes.length !== 0) {
                axios.get(props.url + 'network/' + graph.nodes[event.nodes[0]].title + '/' + totalNode).then((response) => {
                    // console.log(response.data.networkGraph)
                    setGraph(response.data.networkGraph)
                });
                // let data = props.displayer('NODE_DOUBLE_SINGLE_CLICK', {
                //     'id':,
                //     'totalNodes':
                // })
            }
        },
    };
    let additionalLayout = {
        length: 400,
        arrows: {
            to: {enabled: true, type: 'arrow', scaleFactor: 0.3},
            from: {enabled: true, type: 'arrow', scaleFactor: 0.3}
        },
        smooth: true
        // smooth: {
        //     type: 'cubicBezier',
        //     roundness: 0.9
        // }
    }
    for (let i = 0; i < graph.edges.length; i++) {
        graph.edges[i].color = "green"
        let length = parseFloat(graph.edges[i].label)*1000
        console.log(length)
        if (length<0){
            graph.edges[i].color = "red"
        }
        length = Math.abs(length)
        graph.edges[i].length = 1200 - length
        graph.edges[i] = {...additionalLayout, ...graph.edges[i]}
    }
    for (let i = 0; i < graph.nodes.length; i++) {
        let color = 'black'
        if (graph.nodes[i].id > 0 && graph.nodes[i].id <= 10) {
            color = 'red'
        } else if (graph.nodes[i].id > 10 && graph.nodes[i].id <= 20) {
            color = 'blue'
        }
        graph.nodes[i].color = color
    }
    console.log(graph)
    return (
        <Graph
            key={v4()}
            graph={graph}
            options={options}
            events={events}
            interaction={interactions}
        />
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(NetworkGraph)