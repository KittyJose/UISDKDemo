import React from "react"
import {Router,Switch,Route} from "react-router-dom"
import {CreatePage} from "./CreatePage"
import {ViewPage} from "./ViewPage"
import {MapPage} from "./MapPage"
import history from "./history"
import {CREATE_PAGE, VIEW_PAGE, MAP_PAGE} from "./constants"


export function App (props){

    return <React.Fragment>
		<div className="container-fluid container-background h-100">
			<Router history={history}>
				<Switch>
					<Route path={CREATE_PAGE} component = {CreatePage} exact/>
					<Route path={VIEW_PAGE} component = {ViewPage} exact/>
					<Route path={MAP_PAGE} component = {MapPage} exact/>
				</Switch>
			</Router>
        </div>

    </React.Fragment>
}
