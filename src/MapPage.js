import React, {useState, useEffect} from "react"
import {Menu} from "./Menu"
import {WOQLClientObj} from './init-woql-client'
import {Container} from "react-bootstrap"
import {extractAssetLocations} from "./utils"
import {MapViewer} from '@terminusdb/terminusdb-documents-ui'
import {getAvailableAssets} from "./queries"
import {QueryHook} from "./QueryHook"

export const MapPage = () => {

    const {
        woqlClient,
        frames
	} = WOQLClientObj()

    if(!frames) return <div>LOADING ...</div>

    const [query, setQuery] = useState(false)
    const [showAssets, setShowAssets] = useState(false)

    let queryResults = QueryHook(woqlClient, query)

    useEffect(() => {
        if(!woqlClient) return
        let q = getAvailableAssets()
        setQuery(q)
    }, [woqlClient])

    useEffect(() => {
        if(queryResults.length) {
            let locs = extractAssetLocations(queryResults)
            setShowAssets(locs)
        }
    }, [queryResults])

    return <React.Fragment>
        <Menu/>
        <Container fluid className="p-0 h-100 d-flex">
            <div className="main-content w-100 ml-2 mt-4">
                <div className="container-fluid col-md-6" >
                    <h3 className="mt-5 mb-4 text-warning">{`MAP VIEW`}</h3>

                    {
                    showAssets &&
                        <MapViewer
                            documents={showAssets}
                            zoom={5}
                            scrollWheelZoom={true}
                        />
                    }
                </div>
            </div>
        </Container>
    </React.Fragment>
}

/*
{
                    showAssets &&
                        <MapViewer
                            documents={showAssets}
                            zoom={5}
                            scrollWheelZoom={true}
                        />
                    }*/