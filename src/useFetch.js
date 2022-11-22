import { useState } from 'react';

const options = {
    method: "GET",
    Accept: "application/json",
}

const useFetch = (props) => {
    const [state, setState] = useState(props);
    const updateData = (url) => {
        if(url === 'clear')
        {
            setState([]);
            return;
        }
        else
        {
            fetch(url, options).then(res => res.json()).then(result => setState(result))
        }
    }

  return [ state, updateData];
}

export default useFetch;