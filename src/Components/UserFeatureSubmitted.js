import {useEffect, useState} from "react";
import axios from "axios";
import Result from "./Results";
import Pageloader from "./Pageloader";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const UserFeatureSubmitted = (props) => {
    const [isPending, changeIsPending] = useState(true);
    const [tableData, changeTabledata] = useState([]);
    const [totalMatches, changeMatches] = useState(0);
    const [featurename, changeFname] = useState("");
    const [img, changeImage] = useState("");
    const [graphs, changeGraphs] = useState("");
    const [stat, changeStat] = useState("");

    useEffect(() => {
        props.addLinkCount()
        console.log("UsersubmittedCode", props.featureName, props.featureCode);
        const formData = new FormData();
        formData.append('featurecode', props.featureCode);
        formData.append('featurename', props.featureName);
        axios.post(props.url+'result', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response)
            if (response.data.stat === 1) {
                changeTabledata(response.data.tabledata);
                changeMatches(response.data.totalmatches);
                changeFname(response.data.featurename);
                changeImage(response.data.heatmap);
                changeGraphs(response.data.graph);
            }
            changeStat(response.data.stat)
            changeIsPending(false);
        });
    }, []);

    return (
        <div>
            {isPending && <Pageloader/>}
            {!isPending && stat === 1 &&
            <Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img}
                    graphs={graphs}/>
            }
            {!isPending && stat === 2 &&
            <Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img}
                    graphs={graphs}/>
            }
            {!isPending && stat === 3 &&
            <Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img}
                    graphs={graphs}/>
            }
            {!isPending && stat === 4 &&
            <Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img}
                    graphs={graphs}/>
            }
            {!isPending && stat === 5 && <Redirect to="/"/>}
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(UserFeatureSubmitted)
