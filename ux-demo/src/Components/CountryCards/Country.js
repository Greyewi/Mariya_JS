import React, { useState, useEffect } from "react";

function createData(name, capital, languages, flag) {
  return { name, capital, languages, flag };
}

export default function FetchCountry() {
  const [rowList, setRowList] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRowList(
          data.map((item) =>
            createData(item.name, item.capital, item.languages, item.flag)
          )
        );
      });
  }, []);

  if (!rowList) {
    return <div>Still Loading</div>;
  }

  console.log(rowList);

  return <RandomSelector list={rowList} />;
}

function Country(props) {
 
  var style = {
    border: "2px solid #B0B0B0",
    width: "650px",
    borderRadius: "20px",
    textAlign: "center",
    margin: "auto",
    padding: "10px",
    backgroundColor: "#E8E8E8",
    color:"#2c4e85"
  };

  var picStyle = {
    maxWidth:'300px'
  };

  return (
    <div style={style} className="col">
      <h1>{props.item.name}</h1>
      <h2>Description: {props.item.capital}</h2>

      <h3>Temperament {props.item.currenct}</h3>
      <br />
      <img style={picStyle} src={props.item.flag} />
    </div>
  );
}

function RandomSelector(props) {
  const rowList = props.list;
    
   const [randItem, setRandItem] = useState(rowList[1]);

  const returnCountry = () => {
    var i = parseInt(Math.random() * (rowList.length - 1));
    setRandItem(rowList[i]);
  };

  return (
    <div className="back">
      <div className="centered">
        <h1>Countries</h1>
        <h1>All of them: {rowList.length}</h1>
        <br />

        <button className="btn btn-success" onClick={returnCountry}>
          Choose the country
        </button>
        <br />
        <br />
        <div className="centered">
          {randItem === "" ? null : (
            <Country item={randItem} />
          )}
        </div>
      </div>
      <br /><br />
    </div>
  );
}
