import React, {useState} from "react"
import {Menu} from "./Menu"
import {WOQLClientObj} from './init-woql-client'
import {Card, Row, Container} from "react-bootstrap"
import {TYPE, ASSET_ID, ASSET_ID_2} from "./constants"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {GetDocument} from "./utils"
import {ASSET_IDENTIFIER, COMMISIONING_DATE, DESIGN_STANDARDS, LAST_MAINTAINED, LAST_MODIFIED} from "./constants"


export const ViewPage = () => {

    const {
        woqlClient,
        frames
	} = WOQLClientObj()

    if(!frames) return <div>LOADING ...</div>

    const [framesInput, setFramesInput] = useState(frames)
    const [documentID, setDocumentID] = useState(ASSET_ID)
    const [documentID2, setDocumentID2] = useState(ASSET_ID_2)

    let assetResult=GetDocument(woqlClient, documentID)
    let assetResult2=GetDocument(woqlClient, documentID2)

    function CustomFieldTemplate(props) {
        const {id, classNames, label, help, required, description, errors, children} = props

        var css = "d-none"
        if(props.schema.title === ASSET_IDENTIFIER ||
            props.schema.title === COMMISIONING_DATE ||
            props.schema.title === DESIGN_STANDARDS ||
            props.schema.title === LAST_MAINTAINED ||
            props.schema.title === LAST_MODIFIED)
                css = "d-block w-100 mb-3"
        if(props.id === "root") css="d-flex"

        return (
            <div className={css}>
                <label htmlFor={id}>{label}{required ? "*" : null}</label>
                {description}
                {children}
                {errors}
                {help}
            </div>
        )
    }

    return <React.Fragment>
        <Menu/>
        <Container fluid className="p-0 h-100 d-flex">
            <div className="main-content w-100 ml-2 mt-4">
                <div className="container-fluid col-md-6" >
                    <h3 className="mt-5 mb-4 text-warning">{`Output - ${ASSET_ID} - VIEW`}</h3>

                    {
                    assetResult &&
                        <FrameViewer
                            frame={framesInput}
                            type={TYPE}
                            mode={"View"}
                            //FieldTemplate={CustomFieldTemplate}
                            formData={assetResult}
                            hideSubmit={true}/>
                    }

<h3 className="mt-5 mb-4 text-warning">{`Output - ${ASSET_ID_2} - VIEW`}</h3>
                    {
                    assetResult2 &&
                        <FrameViewer
                            frame={framesInput}
                            type={TYPE}
                            mode={"View"}
                            //FieldTemplate={CustomFieldTemplate}
                            formData={assetResult2}
                            hideSubmit={true}/>
                    }

                </div>
            </div>
        </Container>
    </React.Fragment>
}

/*
 {
                    assetResult &&
                        <FrameViewer
                            frame={framesInput}
                            type={TYPE}
                            mode={"View"}
                            FieldTemplate={CustomFieldTemplate}
                            formData={assetResult}
                            hideSubmit={true}/>
                    }*/


/*
<h3 className="mt-5 mb-4 text-warning">{`Output - ${ASSET_ID_2} - VIEW`}</h3>
                    {
                    assetResult2 &&
                        <FrameViewer
                            frame={framesInput}
                            type={TYPE}
                            mode={"View"}
                            FieldTemplate={CustomFieldTemplate}
                            formData={assetResult2}
                            hideSubmit={true}/>
                    }
                    */