import "./App.css"

import React from "react"
import DataTable from "./Components/Tables/CountriesShort"
import CountryTable from "./Components/Tables/CountriesLong"
import SimpleCat from "./Components/Tables/SimpleCat"
import CatMock from "./Components/Tables/CatMock"
import CatEd from "./Components/Tables/CatEditable"
import NavBar from "./Components/Nav/NavBar"
import {Route, Switch} from 'react-router-dom'


function App() {
  let styles = {backgroundColor: "#6C8B93", color: "black"}

  return (
    <div style={styles} className="App">
      <header className="App-header">
        <NavBar/>
        <Switch>

          <Route exact path='/' render={() => <DataTable/>}/>
          <Route path='/countries'>
            <CountryTable/>
          </Route>
          <Route path='/simplecat' component={SimpleCat}/>
          <Route path='/catmock' component={CatMock}/>
          <Route path='/cated' component={CatEd}/>
          <Route path="*"><h2>Not found</h2></Route>

        </Switch>
      </header>
    </div>
  )
}

export default App
