import React, {useState} from "react"
import {Menu} from "./Menu"
import {WOQLClientObj} from './init-woql-client'
import {Card, Row, Container} from "react-bootstrap"
import {TYPE} from "./constants"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {CreateDocument, GetDocument} from "./utils"

export const CreatePage = () => {

    const {
        woqlClient,
        frames
	} = WOQLClientObj()

    if(!frames) return <div>LOADING ...</div>

    const [framesInput, setFramesInput] = useState(frames)
    const [uiFrames, setUiFrames] = useState({})
    const [extracted, setExtracted] = useState(false)

    let result=CreateDocument(woqlClient, extracted)

    function handleSubmit(data) {
        if(!Object.keys(data).length) return
        if(!data.hasOwnProperty("@type")) data["@type"]=TYPE
        setExtracted(data)
    }


    return <React.Fragment>
        <Menu/>
        <Container fluid className="p-0 h-100 d-flex">
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

                    <FrameViewer
                            frame={framesInput}
                            uiFrame={uiFrames}
                            type={TYPE}
                            mode={"Create"}
                            onSubmit={handleSubmit}/>
                    </div>
            </div>
        </Container>
    </React.Fragment>
}


/*<FrameViewer
                            frame={framesInput}
                            uiFrame={uiFrames}
                            type={TYPE}
                            mode={"Create"}
                            onSubmit={handleSubmit}/>*/