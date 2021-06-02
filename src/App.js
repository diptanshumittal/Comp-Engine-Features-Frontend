import { BrowserRouter as Router, Route, Switch, Redirect , Link } from 'react-router-dom';
import Navbarcustom from "./Components/Navbarcustom";
import Home from "./Components/Home";
import Explore from "./Components/Explore";
import Contact from "./Components/Contact";
import Howitworks from "./Components/HowitWorks";
import Exploremode from "./Components/Exploremode";
import {useState} from "react";
import axios from "axios";


const App = () => {

    const [featureCode, setFeatureCode] = useState('');
    const [featureName, setFeatureName] = useState('Upload your .py file here');

    const onFileSubmit = (featurecode, featurename) => {
        console.log(featurename,featurecode);
        const formData = new FormData();
        formData.append('featurecode', featurecode);
        formData.append('featurename', featurename);
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
                </Switch>
            </div>

        </Router>
    );
}

export default App;
