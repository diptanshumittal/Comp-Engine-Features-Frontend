import { BrowserRouter as Router, Route, Switch, Redirect , Link } from 'react-router-dom';
import Navbarcustom from "./Components/Navbarcustom";
import Home from "./Components/Home";
import Explore from "./Components/Explore";
import Contact from "./Components/Contact";
import Howitworks from "./Components/HowitWorks";
import Exploremode from "./Components/Exploremode";
import {useState} from "react";
import axios from "axios";
import PlotlyComponent from "./Components/PlotlyComponent";
import {Col, Row} from "reactstrap";
import {Grid} from "@material-ui/core";
import { useHistory} from "react-router-dom";
import UserFeatureSubmitted from "./Components/UserFeatureSubmitted";


const App = () => {
    const history = useHistory();
    const [featureCode, setFeatureCode] = useState('');
    const [featureName, setFeatureName] = useState('Upload your .py file here');
    const data = [{
        x: [1, 2, 3, 5,6,7,8,9,5,5,5],
        y: [2, 6, 3, 5,5,5,5,5,5,5,5],
        mode: 'markers',
    }]
    const layout = {
        title: 'A Fancy Plot',
        xaxis: {
            title: {
                text: 'Myaxis'
            },
        },
        yaxis: {
            title: {
                text: 'y'
            }
        },

    }
    const config = {displayModeBar: false}

    const onFileSubmit = (featurecode, featurename) => {
        console.log(featurename,featurecode);
        const formData = new FormData();
        setFeatureCode(featurecode);
        setFeatureName(featurename);
        history.push("/results")

        formData.append('featurecode', featureCode);
        formData.append('featurename', featureName);
        axios.post('http://127.0.0.1:8000/result', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <Router>
            <Navbarcustom/>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Home sendData={onFileSubmit}/>
                    </Route>
                    <Route exact path="/howitworks">
                        <Howitworks/>
                    </Route>
                    <Route exact path="/contact">
                        <Contact/>
                    </Route>
                    <Route exact path="/contribute">
                        <Home/>
                    </Route>
                    <Route exact path="/exploremode/:id/:name">
                        <Exploremode/>
                    </Route>
                    <Route path="/result">
                    </Route>
                    <Route exact path="/explore">
                        <Explore/>
                    </Route>
                    <Route exact path="/results">
                        <UserFeatureSubmitted featureCode={featureCode} featureName={featureName}/>
                    </Route>
                </Switch>
            </div>
            <Grid container item xs={12}>
                <Grid item xs={3}>
                    <PlotlyComponent data={data} layout={layout} config={config}/>
                </Grid>
                <Grid item xs={3}>
                    <PlotlyComponent data={data} layout={layout} config={config}/>
                </Grid>
                <Grid item xs={3}>
                    <PlotlyComponent data={data} layout={layout} config={config}/>
                </Grid>
                <Grid item xs={3}>
                    <PlotlyComponent data={data} layout={layout} config={config}/>
                </Grid>
            </Grid>

        </Router>
    );
}

export default App;
