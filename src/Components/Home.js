import img1 from "../assets/img/compengine-infographic.png";
import img2 from "../assets/img/preloader.gif";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom"
import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";


const Home = (props) => {
    const hist = useHistory();
    const [isPending, changeIsPending] = useState(false);
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Upload your .py file here');
    const [featurename, setFeaturename] = useState('Upload your .py file here');

    const onChangeName = e => {
        setFeaturename(e.target.value)
    };

    const onChangeFile = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };
    const onSubmit = e => {
        e.preventDefault();
        props.sendData(file, featurename);
        hist.push("/results");
    }

    return (
        <div>
            {isPending && (
                <div id="pageloader">
                    <p className="display-4">
                        <strong>This may take some time so sit back and relax.</strong>
                    </p>
                    <div className={{display: "flex", justifyContent: "center"}}>
                        <img src={img2}/>
                    </div>
                </div>
            )}
            {!isPending && (
                <div id="homesec">
                    <div
                        className="alert alert-success alert-dismissible fade show message"
                        role="alert"
                    >
                        <strong>Holy Welcome!</strong> Please check the <b>How it works</b>{" "}
                        page to understand the python code structure .
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="container">
                        <h1 className="display-1">Comp-Engine-Features</h1>
                        <p className="lead">{props.lorem}
                        </p>
                        <div id="btnsec" className="buttonssection">
                            <button type="button" className="btn btn-dark btn-lg">
                                <Link to="/howitworks" onClick={props.addLinkCount}>Learn More</Link>
                            </button>
                            {" "}
                            <button type="button" className="btn btn-dark btn-lg">
                                <Link to="/explore" onClick={props.addLinkCount}> Explore</Link>
                            </button>
                        </div>

                        <div className="containerfluid">
                            <div className="leftside">
                                <div className="image-control">
                                    <img src={img1} width="400px" height="400px"/>
                                </div>
                            </div>

                            <div className="rightside">
                                <form
                                    id="myform"
                                    className="form-container"
                                    onSubmit={onSubmit}
                                >
                                    <div className="form-group">
                                        <label>Function Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter function name"
                                            required
                                            onChange={onChangeName}
                                        />
                                        <small id="emailHelp" className="form-text text-muted">
                                            Function name should be same as defined in python file.
                                        </small>
                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                required
                                                onChange={onChangeFile}
                                            />
                                            <label
                                                className="custom-file-label"
                                                aria-describedby="inputGroupFileAddon02">
                                                {filename}
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        value="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Home)
