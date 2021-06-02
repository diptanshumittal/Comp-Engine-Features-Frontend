import img1 from "../assets/img/compengine-infographic.png";
import img2 from "../assets/img/preloader.gif";
import LoremIpsum from "react-lorem-ipsum";
import { useState } from "react";
import axios from "axios";



const Home = ({sendData}) => {
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
    sendData(file, featurename)
    /*
    console.log(featurename,filename);
    const formData = new FormData();
    formData.append('featurecode', file);
    formData.append('featurename', featurename);
    axios.post('http://127.0.0.1:8000/result', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response.data);
    });
     */
  }

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
        <div id="homesec">
          <div
            class="alert alert-success alert-dismissible fade show message"
            role="alert"
          >
            <strong>Holy Welcome!</strong> Please check the <b>How it works</b>{" "}
            page to understand the python code structure .
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="container">
            <h1 class="display-1">Comp-Engine-Features</h1>
            <p class="lead">
              <LoremIpsum p={1} />
            </p>
            <div id="btnsec" class="buttonssection">
              <button type="button" class="btn btn-dark btn-lg">
                <a href="/howitworks">Learn More</a>
              </button>{" "}
              <button type="button" class="btn btn-dark btn-lg">
                <a href="/explore"> Explore</a>
              </button>
            </div>

            <div class="containerfluid">
              <div class="leftside">
                <div class="image-control">
                  <img src={img1} width="400px" height="400px" />
                </div>
              </div>

              <div class="rightside">
                <form
                  id="myform"
                  class="form-container"
                  onSubmit={onSubmit}
                >
                  <div class="form-group">
                    <label for="exampleInputEmail1">Function Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      name="featurename"
                      aria-describedby="emailHelp"
                      placeholder="Enter function name"
                      required
                      onChange={onChangeName}
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      Function name should be same as defined in python file.
                    </small>
                  </div>

                  <div class="input-group mb-3">
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="inputGroupFile02"
                        name="featurecode"
                        required
                        onChange={onChangeFile}
                      />
                      <label
                        class="custom-file-label"
                        for="inputGroupFile02"
                        aria-describedby="inputGroupFileAddon02"
                      >
                        {filename}
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    value="submit"
                    class="btn btn-primary"
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
export default Home;
