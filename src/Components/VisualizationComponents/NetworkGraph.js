import React, {memo, useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import Graph from "react-graph-vis";
import {v4} from "uuid";
import mapStateToProps from "../ReducerComponents/mapStateToProps";
import mapDispatchToProps from "../ReducerComponents/mapDispatchToProps";
import axios from "axios";
import Fab from '@material-ui/core/Fab';
import {Link} from "react-router-dom";


function NetworkGraph(props) {
    const [graph, setGraph] = useState();
    useEffect(() => {
        setGraph(props.networkGraph)
    }, [props.networkGraph])
    const [selectedFeature, setSelectedFeature] = useState(false);
    const handleClick = async (action, data) => {
        if (action === 'NODE_SINGLE_CLICK') {
            if (data.id === -1) {
                setSelectedFeature({
                    name: props.featurename,
                    id: data.id
                })
            } else {
                setSelectedFeature({
                    name: props.features[data.id].name,
                    keywords: props.features[data.id].keywords,
                    id: data.id
                })
            }
        }
    }
    const memoHandleClick = useCallback(handleClick, [])
    return (
        <div>
            {graph && <GetGraph displayer={memoHandleClick} graph={graph} url={props.url}/>}
            {!selectedFeature &&
            <div style={{marginLeft: "15%", marginTop: "2%", width: '70%', marginRight: "15%"}}>
                <p>Single click on a node to view details</p>
                <p>Double click on a node to centerize that node</p>
            </div>

            }
            {selectedFeature &&
            <ul className="list-group"
                style={{marginLeft: "15%", marginTop: "2%", width: '70%', marginRight: "15%",}}>

                {selectedFeature.id === -1 &&
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <b>Feature Name </b>
                    <span className="table-cell-trucate">{selectedFeature.name}</span>
                </li>
                }
                {selectedFeature.id > -1 &&
                <div>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Feature Name </b>
                        {selectedFeature.name === props.featurename &&
                            <span className="table-cell-trucate">{selectedFeature.name}</span>
                        }
                        {selectedFeature.name !== props.featurename &&
                        <Link to={`/exploremode/${selectedFeature.id}/${selectedFeature.name}`}>
                            <span className="table-cell-trucate">{selectedFeature.name}</span>
                        </Link>
                        }
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Keywords</b>
                        <span className="badge badge-primary badge-pill">
                        {selectedFeature.keywords}
                    </span>
                    </li>
                </div>
                }
            </ul>
            }
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
        edges: {
            color: "#000000"
        },
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
        arrows: {
            to: {enabled: false},
            from: {enabled: false}
        },
        width: 0.5,
        smooth: true
        // smooth: {
        //     type: 'cubicBezier',
        //     roundness: 0.9
        // }
    }
    for (let i = 0; i < graph.edges.length; i++) {
        if(i<= graph.edges.length/3){
            graph.edges[i].width = 1.5
        }
        if(graph.edges[i].length < 1){
            graph.edges[i].length = 1000 - Math.abs(graph.edges[i].length) * 1000
        }
        graph.edges[i] = {...additionalLayout, ...graph.edges[i]}
    }
    for (let i = 0; i < graph.nodes.length; i++) {
        graph.nodes[i].color = 'blue'
        if (graph.nodes[i].id === 0) {
            graph.nodes[i].color = 'black'
        }
    }
    console.log(graph)
    return (
        <div>
            <Graph
                key={v4()}
                graph={graph}
                options={options}
                events={events}
                interaction={interactions}
            />
            { graph !== props.graph &&
                <Fab variant="extended"
                     style={{display: 'flex', justifyContent: 'flex-start', position: "absolute", marginLeft: "1%", marginTop: "2%"}}
                     onClick={() => {
                         setGraph(props.graph)
                     }}>
                    Recentre
                </Fab>
            }

        </div>
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(NetworkGraph)