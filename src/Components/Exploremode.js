import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Result from "./Results";
import Pageloader from "./Pageloader";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const Exploremode = (props) => {
    const { id, name } = useParams();
    const url = props.url+"api/exploremode/" + id + "/" + name;
    const [isPending, changeIsPending] = useState(true);
    const [tableData, changeTabledata] = useState([]);
    const [totalMatches, changeMatches] = useState(0);
    const [featurename, changeFname] = useState("");
    const [img, changeImage] = useState("");
    const [graph, changeGraph] = useState([]);

    useEffect(() => {
        props.addLinkCount()
        axios.get(url).then((response) => {
            changeTabledata(response.data.tabledata);
            changeMatches(response.data.totalmatches);
            changeFname(response.data.featurename);
            changeImage(response.data.heatmap);
            changeGraph(response.data.graph);
            changeIsPending(false);
        });
    }, [])

    return (
        <div>
              {isPending && <Pageloader/>      }
              {!isPending && <Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img} graphs={graph}/>}
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Exploremode)
