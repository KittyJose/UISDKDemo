
import React, {useEffect, useState} from 'react'
import {MapViewer} from '@terminusdb/terminusdb-documents-ui'

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




