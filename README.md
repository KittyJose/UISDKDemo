# UISDKDemo
A video/ tutorial to Build a data-intensive application in 30 minutes

# Library used
@terminusdb/terminusdb-documents-ui

# Usage
## CREATE
```
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
/*
**  frame     - full json schema of a document
**  uiFrame   - ui json of a document
**  type      - document type of interest
**  mode      - create/ edit/ view
**  onSubmit  - a call back function which can have custom logic to process data submitted
*/
<FrameViewer
    frame={frame}
    uiFrame={uiFrame}
    type={type}
    mode={"Create"}
    onSubmit={handleSubmit}/>
```

### VIEW
```
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
/*
**  frame     - full json schema of a document
**  uiFrame   - ui json of a document
**  type      - document type of interest
**  mode      - create/ edit/ view
**  formData  - filled value of the document
**  onSubmit  - a call back function which can have custom logic to process data submitted
*/
<FrameViewer
    frame={frame}
    type={type}
    mode={"View"}
    formData={data}
    hideSubmit={true}/>
```

### Map
```
import {MapViewer} from '@terminusdb/terminusdb-documents-ui'
/*
**  documents - terminusdb documents altered to location and latiude definitions of leaflet-maps
**  zoom      - zoom poisition of map
*/
<MapViewer
    documents={showAssets}
    zoom={5}
    scrollWheelZoom={true}
/>
```
