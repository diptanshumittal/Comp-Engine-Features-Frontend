import { useEffect, useState } from "react";
import axios from "axios";
import Result from "./Results";
import Pageloader from "./Pageloader";

const UserFeatureSubmitted = ({featureName, featureCode}) => {
    const url = "http://127.0.0.1:8000/result";
    const [isPending, changeIsPending] = useState(true);
    const [tableData, changeTabledata] = useState([]);
    const [totalMatches, changeMatches] = useState(0);
    const [featurename, changeFname] = useState("");
    const [img, changeImage] = useState("");

    useEffect(() => {
        console.log(featureName,featureCode);
        const formData = new FormData();
        formData.append('featurecode', featureCode);
        formData.append('featurename', featureName);
        axios.post('http://127.0.0.1:8000/result', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
            changeTabledata(response.data.tabledata);
            changeMatches(response.data.totalmatches);
            changeFname(response.data.featurename);
            changeImage(response.data.heatmap);
            changeIsPending(false);
        });
    }, []);

    return (
        <div>
            {isPending && <Pageloader/>      }
            {!isPending && <Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img}/>}
        </div>
    );
};

export default UserFeatureSubmitted;
