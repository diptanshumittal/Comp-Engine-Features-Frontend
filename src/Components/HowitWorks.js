import img from "../assets/img/Sample Code.png";

const Howitworks = () => {
    return (
        <div id="howitworkssec">
            <div className="container">
                <p className="display-1">How It Works</p>
                <hr/>
                <div className="section">
                    <div className="left">
                        <h3>
                            Code Structure<br/>
                            <small className="text-muted">Points to consider while making your python code.</small>
                        </h3>
                        <ul className="list">
                            <li>The function should accept only one parameter in the form of a numpy.ndarray</li>
                            <li>The function name provided at the time of submitting your .py file should be the
                                same as defined in your function definition
                            </li>
                            <li>If the function has some external module dependencies, then please declare them
                                above the function definition (as shown in the sample code on the right).
                            </li>
                            <li><strong>The supported modules are:</strong>
                                <ul>
                                    <li>Math, Statistics, Numpy, Scipy, Sklearn, Pandas, Statsmodels.</li>
                                </ul>
                            </li>
                            <li><strong>The supported inbuilt functions are:</strong>
                                <ul>
                                    <li>sum, max, min, sorted, abs, round, type.</li>
                                    <li>Function should only return a real value.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="right"><img src={img}/>
                    </div>
                </div>

                <div class="timeline-container">
                    <div className="timeline">
                        <ul>
                            <li>
                                <div className="content">
                                    <h3 className="lead">Enter function name and Python file.</h3>
                                    <p className="lead">
                                        Upload your function name and python file.The code in your .py file should
                                        follow the same structure as described above.
                                    </p>
                                </div>
                                <div className="time">
                                    <h4>
                                        Step 1
                                    </h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Parsing timeseries </h3>
                                    <p className="lead">
                                        The function you uploaded will be parsed through 1000+ timeseries dataset.
                                    </p>
                                </div>
                                <div className="time">
                                    <h4>
                                        Step 2
                                    </h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Comparison with other models</h3>
                                    <p className="lead">
                                        Your method will then be compared to 7000+ time series analysis methods.
                                    </p>
                                </div>
                                <div className="time">
                                    <h4>
                                        Step 3
                                    </h4>
                                </div>
                            </li>
                            <li>
                                <div className="content">
                                    <h3>Best Matches.</h3>
                                    <p className="lead">
                                        The best matches of your analysis method will be produced as output.
                                    </p>
                                </div>
                                <div className="time">
                                    <h4>
                                        Step 4
                                    </h4>


                                </div>


                            </li>

                            <div style={{clear:"both"}}>
                            </div>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Howitworks;
