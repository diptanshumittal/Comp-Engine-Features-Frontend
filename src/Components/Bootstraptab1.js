import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
export class Bootstraptab1 extends Component {
    state = {
        products: [],
        columns: [
            {
                dataField: "ID",
                text: "ID",
            },
            {
                dataField: "Name",
                text: "Name",
                filter: textFilter()
            },
            {
                dataField: "Keywords",
                text: "Keywords",
                filter: textFilter()
            }]
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/getfeatures')
            .then((response) => {
                console.log(response);
                this.setState({products: response.data.data});
            });
    }

    render() {
        const options = {
            page: 2,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '25', value: 25
            },{
                text: '50', value: 50
            },{
                text: '100', value: 100
            }, {
                text: 'All', value: this.state.products.length
            }],
            sizePerPage: 10,
            pageStartIndex: 0,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'top'
        };
        return (
            <div className="container">
                <div class="row" className="hdr">
                </div>
                <div className="container" style={{marginTop: 50}}>
                    <BootstrapTable
                        striped
                        hover
                        keyField='id'
                        data={this.state.products}
                        columns={this.state.columns}
                        filter={filterFactory()}
                        pagination={paginationFactory(options)}/>
                </div>
            </div>
        )
    }
}

export default Bootstraptab1