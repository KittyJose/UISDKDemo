import React, {useState} from "react"
import {WOQLClientObj} from './init-woql-client'
import {Card, Row, Button, Container} from "react-bootstrap"
import {TYPE, ASSET_ID} from "./constants"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {CreateDocument, GetDocument} from "./utils"
import {Accordion} from 'react-bootstrap-accordion'
import {MapViewer} from '@terminusdb/terminusdb-documents-ui'

export const Layout = () => {

    const {
        woqlClient,
        frames
	} = WOQLClientObj()

    if(!frames) return <div>LOADING ...</div>

    const [framesInput, setFramesInput] = useState(frames)
    const [uiFrames, setUiFrames] = useState({})
    const [extracted, setExtracted] = useState(false)
    const [documentID, setDocumentID] = useState(ASSET_ID)

    let result=CreateDocument(woqlClient, extracted)
    let assetResult=GetDocument(woqlClient, documentID)

    function handleSubmit(data) {
        if(!Object.keys(data).length) return
        if(!data.hasOwnProperty("@type")) data["@type"]=TYPE
        setExtracted(data)
    }

    return <Container fluid className="p-0 h-100 d-flex">
        <div className="side-black ml-2 mt-4 d-flex splits">
            <Row >
                <Card className="m-4 w-100 editor">
                    <Card.Header as="h3" className="bg-transparent">Frames</Card.Header>
                    <Card.Body>
                        <textarea
                            className="p-4 w-100 bg-secondary text-light h-100"
                            onBlur={(e) => setFramesInput(JSON.parse(e.target.value))}>
                            {JSON.stringify(framesInput, null, 2)}
                        </textarea>
                    </Card.Body>
                </Card>

                <Card className="m-5 w-100 editor">
                    <Card.Header as="h3" className="bg-transparent">UI JSON</Card.Header>
                    <Card.Body>
                        <textarea
                            className="p-4 w-100 bg-secondary text-light h-100"
                            onBlur={(e) => setUiFrames(JSON.parse(e.target.value))}>
                            {JSON.stringify(uiFrames, null, 2)}
                        </textarea>
                    </Card.Body>
                </Card>
            </Row>
        </div>

        <div className="main-content w-100 ml-2 mt-4">
            <div className="container-fluid" >
                <h3 className="mt-5 mb-4 text-warning">{`Output - ${TYPE} - CREATE`}</h3>
                <Accordion title={"Create Example"}>
                    <FrameViewer
                        frame={framesInput}
                        uiFrame={uiFrames}
                        type={TYPE}
                        mode={"Create"}
                        onSubmit={handleSubmit}/>
                </Accordion>
                <h3 className="mt-5 mb-4 text-warning">{`Output - ${ASSET_ID} - VIEW`}</h3>
                {
                assetResult &&
                    <FrameViewer
                        frame={framesInput}
                        type={TYPE}
                        mode={"View"}
                        formData={assetResult}
                        hideSubmit={true}
                        onSubmit={handleSubmit}/>
                }

                {
                assetResult &&
                    <MapViewer
                        documents={[{id: 'Asset/Portsmouth%20Hospital', lat: 15.58333, name: 'Portsmouth', lng: -61.46667}]}
                        zoom={5}
                        scrollWheelZoom={true}
                    />
                }


            </div>
        </div>
    </Container>
}