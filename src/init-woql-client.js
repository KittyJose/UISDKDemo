import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const WOQLContext = React.createContext()
export const WOQLClientObj = () => useContext(WOQLContext)
import {DATA_PRODUCT} from "./constants"

export const WOQLClientProvider = ({children, params}) => {

    let team = process.env.MY_TEAM
    let token = process.env.MY_TOKEN
    let user = process.env.MY_USER
    let server = process.env.TERMINUSDB_SERVER

    const [woqlClient, setWoqlClient] = useState(false)
    const [frames, setFrames] = useState(false)


    const client = new TerminusDBClient.WOQLClient(`${server}${team}/`, {
        user: user,
        organization: team
    })

    /* Initialize client */
    useEffect(() => {
        try{
            client.setApiKey(token)
            client.db(DATA_PRODUCT)
            setWoqlClient(client)
        }
        catch(e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        if(!woqlClient) return
        woqlClient.getSchemaFrame(null, DATA_PRODUCT).then((res) => {
            setFrames(res)
        })
        .catch((err) =>  {
            console.log(`Error in init woql while fetching schema frames - ${err.message}`)
        })
    }, [woqlClient])


    return (
        <WOQLContext.Provider
            value={{
                woqlClient,
                frames
            }}
        >
            {children}
        </WOQLContext.Provider>
    )
}
