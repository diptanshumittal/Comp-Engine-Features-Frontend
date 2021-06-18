import img2 from "../assets/img/preloader.gif";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

const Explore = (props) => {
    return (
        <div>
            {props.features === null && (
                <div id="pageloader">
                    <p className="display-4">
                        <strong>This may take some time so sit back and relax.</strong>
                    </p>
                    <div className={{display: "flex", justifyContent: "center"}}>
                        <img src={img2}/>
                    </div>
                </div>
            )}
            {props.features && (
                <div className="container mt-2 mb-2">
                    <br/><br/>
                    <div id="exploresec">
                        <div className="display-1">Explore time series features</div>
                        <hr/>
                        <p className="lead">
                            {props.lorem}
                        </p>
                    </div>

                    <table className="table-striped" id="table" data-toggle="table" data-pagination="true"
                           data-filter-control="true"
                           data-height="730" data-page-size="12" data-page-list="[15,35,55,100]">
                        <thead className="thead-dark">
                        <tr>
                            <th data-field="ID">S.No</th>
                            <th data-field="Name" data-filter-control="input"
                                data-filter-control-placeholder="Search by feature name">Feature Names
                            </th>
                            <th data-field="Keywords" data-filter-control="input"
                                data-filter-control-placeholder="Search by Tags">Tags
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            props.features.map((item) => (
                                <tr>
                                    <td>{item.ID}</td>
                                    <td><Link to={`/exploremode/${item.ID}/${item.NAME}`}>{item.NAME}>{item.NAME}</Link></td>
                                    <td>{item.KEYWORDS}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <Helmet>
                        <link rel="stylesheet"
                              href="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.css"/>
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js"/>
                        <script
                            src="https://unpkg.com/bootstrap-table@1.17.1/dist/extensions/filter-control/bootstrap-table-filter-control.min.js"/>
                    </Helmet>
                </div>
            )}
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Explore)
