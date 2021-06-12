import img2 from "../assets/img/preloader.gif";

const Pageloader = () => {
    return (
        <div id="pageloader">
            <p className="display-4">
                <strong>This may take some time so sit back and relax.</strong>
            </p>
            <div className={{ display: "flex", justifyContent: "center" }}>
                <img src={img2} />
            </div>
        </div>
    );
};

export default Pageloader;