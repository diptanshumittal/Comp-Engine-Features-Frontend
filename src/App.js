import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import TableContainer from "./TableContainer"
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Bootstraptab1 from "./Bootstraptab1";
import ScriptTag from 'react-script-tag';
import useScript from "./useScript";
import {Helmet} from "react-helmet";


const App = () => {
    const [features, setData] = useState([]);
    useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/getfeatures')
        .then((response) => {
          console.log(response);

          setData(response.data.data);
        });
    }, [])
    const columns = useMemo(() => [
            {
                Header: "ID",
                accessor: "ID",
            },
            {
                Header: "Name",
                accessor: "Name",
            },
            {
                Header: "Keywords",
                accessor: "Keywords",
            }
        ],
        []
    )
    //return <TableContainer columns={columns} data={features} />
    /*
    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={features} />
        </Container>
    );
    */
    if(features.length===0){
        return <div/>
    }
    return (
      <div className="App">
        <h1>Simple Table</h1>
          <div className="container mt-2 mb-2">

              <Helmet>
                  <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.css"/>
                  <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/bootstrap-table.min.js"/>
                  <script src="https://unpkg.com/bootstrap-table@1.17.1/dist/extensions/filter-control/bootstrap-table-filter-control.min.js"/>
              </Helmet>

              <table className="table-striped" id="table" data-toggle="table" data-pagination="true" data-filter-control="true"
                  data-height="640" data-page-size="12" data-page-list="[15,35,55,100]">
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
                              <td><a className="explorelink" href="/exploremode/{{i.ID}}/{{i.Name}}">{item.Name}</a></td>
                              <td>{item.Keywords}</td>
                          </tr>
                      ))
                  }
                  </tbody>
              </table>
          </div>
      </div>
    );
}

export default App;
