import { Helmet } from "react-helmet";

const Result = ({tabledata, totalmatches, featurename, img, grp}) => {
    return (
        <div id="resultsec">
            <div class="container">
                <p className="display-2">Dashboard</p>
                <hr />
                <br />
                <br />
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Feature Name </b>
                        <span className="badge badge-primary badge-pill">
          {featurename}
        </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <b>Total Matches </b>
                        <span className="badge badge-primary badge-pill">
          {totalmatches}
        </span>
                    </li>
                </ul>
                <div className="container mt-2 mb-2">
                    <div id="toolbar" className="download button">
                        <a
                            className="btn btn-dark btn"
                            href="{{featurename}}\download"
                            download="Best-matching-features"
                        >
                            Download Results
                        </a>
                    </div>
                    <table
                        id="table"
                        data-toolbar="#toolbar"
                        data-toggle="table"
                        data-pagination="true"
                        data-show-toggle="true"
                        data-show-columns="true"
                        data-show-fullscreen="true"
                        data-height="650"
                        data-page-size="12"
                        data-page-list="[12,25,50,100]"
                    >
                        <thead class="thead-dark">
                        <tr>
                            <th data-field="Rank">Rank</th>
                            <th data-field="Name">Name</th>
                            <th data-field="Keywords">Keywords</th>
                            <th data-field="Signedcorrvalue">Correlation</th>
                            <th data-field="pvalue">p-value</th>
                            <th data-field="Corr" data-visible="false">
                                Absloute-value
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tabledata.map((item) => (
                            <tr>
                                <td>{item.Rank}</td>
                                <td>
                                    <a
                                        className="explorelink"
                                        href={`/exploremode/${item.ID}/${item.Name}`}
                                    >
                                        {item.Name}
                                    </a>
                                </td>
                                <td>{item.Keywords}</td>
                                <td>{item.Signedcorrvalue}</td>
                                <td>{item.pvalue}</td>
                                <td>{item.Corr}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Helmet>
                        <link
                            rel="stylesheet"
                            href="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.css"
                        />
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js" />
                        <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/extensions/filter-control/bootstrap-table-filter-control.min.js" />
                    </Helmet>

                    <img
                        className="clustermap"
                        src={`data:image/png;base64,${img}`}
                        alt="mydataplohere"
                        height="850"
                        width="850"
                    />
                </div>
            </div>
        </div>

    );
};

export default Result;
