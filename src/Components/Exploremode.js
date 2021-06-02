import img2 from "../assets/img/preloader.gif";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  const [grp, changeGraph] = useState("");

  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response.data);
      changeTabledata(response.data.tabledata);
      changeMatches(response.data.totalmatches);
      changeFname(response.data.featurename);
      changeImage(response.data.image2);
      changeGraph(response.data.grp);
      console.log(grp);
      changeIsPending(false);
    });
  }, []);

  return (
    <div>
      {isPending && <Pageloader/>      }
      {!isPending && <Result tabledata={tableData} totalmatches={totalMatches} featurename={featurename} img={img} grp={grp}/>}
    </div>
  );
};

export default Exploremode;
