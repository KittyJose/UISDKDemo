import {useEffect, useState} from 'react'

export function QueryHook(woqlClient, query) {
    const [result, setResult] = useState(false)
    function executeQuery(query) {
        query.execute(woqlClient)
        .then((res) => {
            setResult(res)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        if (query) executeQuery(query)
    }, [query])

    return result.hasOwnProperty("bindings") ? result.bindings : []
}

