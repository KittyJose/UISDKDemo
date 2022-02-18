
import React, {useEffect, useState} from 'react'
import {LAT, LNG, VAR_NAME, VAR_CRITICAL, VAR_INDEX, VAR_ASSET, VAR_VALUE} from "./constants"


export function CreateDocument(woqlClient, document) {
    const [result, setResult] = useState(false)

    async function addDocument() {
        try{
            const res = await woqlClient.addDocument(document, null, woqlClient.db())
            setResult(res)
            console.log(`Successfully added`)
        }
        catch(err){
           console.log(err.message)
       }
    }

    useEffect(() => {
        if (Object.keys(document).length) addDocument()
    }, [document])

    return result
}


export function GetDocument(woqlClient, documentId) {
    const [result, setResult] = useState(false)

    async function getDocument() {
        try{
            let params={}
            params['id']=documentId
            params['as_list']=false
            const res = await woqlClient.getDocument(params, woqlClient.db())
            setResult(res)
        }
        catch(err){
           console.log(err.message)
       }
    }

    useEffect(() => {
        if (documentId) getDocument()
    }, [documentId])

    return result
}

// function to extract latitude and longitude of all assets
export function extractAssetLocations(results) {
    let docs = [], json = {}
    if(!Array.isArray(results)) return docs

    results.map(item => {
        if(json.hasOwnProperty(item[VAR_ASSET])) { // if asset exists
            if(item[VAR_INDEX]["@value"] === 0) json[item[VAR_ASSET]][LAT] = item[VAR_VALUE]["@value"]
            if(item[VAR_INDEX]["@value"] === 1) json[item[VAR_ASSET]][LNG] = item[VAR_VALUE]["@value"]
        }
        else { // if asset dosent exists
            json[item[VAR_ASSET]] = {
                id: item[VAR_ASSET]
            }
            if(item[VAR_INDEX]["@value"] === 0) json[item[VAR_ASSET]][LAT] = item[VAR_VALUE]["@value"]
            if(item[VAR_INDEX]["@value"] === 1) json[item[VAR_ASSET]][LNG] = item[VAR_VALUE]["@value"]
            if(item.hasOwnProperty(VAR_NAME)) json[item[VAR_ASSET]]["name"] = item[VAR_NAME]["@value"]
            if(item.hasOwnProperty(VAR_CRITICAL)) {
                json[item[VAR_ASSET]]["critical"] = item[VAR_CRITICAL]["@value"].toString()
            }
        }
    })
    for(var things in json) {
        docs.push(json[things])
    }
    //console.log("docs", docs)
    return docs
}


