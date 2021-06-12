import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Result from "./Results";
import Pageloader from "./Pageloader";

const Exploremode = () => {
  const { id, name } = useParams();
  const url = "http://127.0.0.1:8000/api/exploremode/" + id + "/" + name;
  const [isPending, changeIsPending] = useState(true);
  const [tableData, changeTabledata] = useState([]);
  const [totalMatches, changeMatches] = useState(0);
  const [featurename, changeFname] = useState("");
  const [img, changeImage] = useState("");

  useEffect(() => {
    axios.get(url).then((response) => {
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

export default Exploremode;