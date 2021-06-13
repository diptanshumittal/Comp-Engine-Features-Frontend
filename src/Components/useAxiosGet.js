import {useState, useEffect} from 'react';
import axios from "axios";

const useAxiosGet = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    var startUrl = 'http://127.0.0.1:8000/'
    useEffect(() => {
        console.log(startUrl+url)
        axios.get( startUrl+ url)
            .then(response => {
                setData(response.data);
                setIsPending(false);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            });
    },[url])

    return {error, isPending, data};
}

export default useAxiosGet;