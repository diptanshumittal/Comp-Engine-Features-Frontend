import img2 from "../assets/img/preloader.gif";
import LoremIpsum from "react-lorem-ipsum";
import {useEffect, useState} from "react";
import axios from "axios";
import {Helmet} from "react-helmet";

const Explore = () => {
    const [isPending, changeIsPending] = useState(true);
    const [features, setData] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getfeatures')
            .then((response) => {
                setData(response.data.data);
                changeIsPending(false);
            });
    }, [])

    return (
        <div>
            {isPending && (
                <div id="pageloader">
                    <p className="display-4">
                        <strong>This may take some time so sit back and relax.</strong>
                    </p>
                    <div className={{ display: "flex", justifyContent: "center" }}>
                        <img src={img2} />
                    </div>
                </div>
            )}
            {!isPending && (
                <div className="container mt-2 mb-2">
                    <br/><br/>
                    <div id="exploresec">
                        <div className="display-1">Explore time series features</div>
                        <hr/>
                        <p className="lead">
                            <LoremIpsum p={1}/>
                        </p>
                    </div>

                    <table className="table-striped" id="table" data-toggle="table" data-pagination="true" data-filter-control="true"
                           data-height="730" data-page-size="12" data-page-list="[15,35,55,100]">
                        <thead className="thead-dark">
                        <tr>
                            <th data-field="ID">S.No</th>
                            <th data-field="Name" data-filter-control="input" data-filter-control-placeholder="Search by feature name">Feature Names
                            </th>
                            <th data-field="Keywords" data-filter-control="input" data-filter-control-placeholder="Search by Tags">Tags
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            features.map((item) => (
                                <tr>
                                    <td>{item.ID}</td>
                                    <td><a className="explorelink" href={`/exploremode/${item.ID}/${item.Name}`}>{item.Name}</a></td>
                                    <td>{item.Keywords}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <Helmet>
                        <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.css"/>
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js"/>
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/extensions/filter-control/bootstrap-table-filter-control.min.js"/>
                    </Helmet>
                </div>
            )}
        </div>
    );
};
export default Explore;
