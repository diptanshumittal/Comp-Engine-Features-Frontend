import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbarcustom from "./Components/Navbarcustom";
import Home from "./Components/Home";
import Explore from "./Components/Explore";
import Contact from "./Components/Contact";
import Howitworks from "./Components/HowitWorks";
import Exploremode from "./Components/Exploremode";
import {useEffect, useState} from "react";
import UserFeatureSubmitted from "./Components/UserFeatureSubmitted";
import Contribute from "./Components/Contribute";
import {connect} from "react-redux";
import axios from "axios";
import mapStateToProps from "./Components/mapStateToProps";
import mapDispatchToProps from "./Components/mapDispatchToProps";

const App = (props) => {
    const [featureCode, setFeatureCode] = useState('');
    const [featureName, setFeatureName] = useState('Upload your .py file here');
    const onFileSubmit = (featurecode, featurename) => {
        setFeatureCode(featurecode);
        setFeatureName(featurename);
    }
    useEffect(() => {
        axios.get(props.url+'api/getfeatures')
            .then((response) => {
                props.addFeatures(response.data.data);
            });
    }, [])

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
                        <Contribute/>
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
        </Router>
    );
    /*
    <Grid container item xs={12}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
     */
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
