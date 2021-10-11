import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import LongCountriesForm from "./LongCountriesForm";

function createData(numericCode, name, capital, population) {
  return { numericCode, name, capital, population };
}

export default function CountryTable() {
  const [rowList, setRowList] = useState([]);
  const [isUpDirection, setIsUpDirection] = useState(true);
  const initialForm = {
    numericCode: "",
    name: "",
    capital: "",
    population: 0,
  };
  const [checkedLines, setCheckedLines] = useState([]);

  const handleAddCountry = useCallback(
    (values) => {
      setRowList((prevList) => [...prevList, values]);
    },
    [setRowList]
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCity, setSearchTermCity] = useState("");

  const handleSortByField = useCallback(
    (field) => {
      const sortedRowList = rowList.sort((a, b) => {
        if (a[field] > b[field]) {
          return isUpDirection ? 1 : -1;
        } else if (a[field] < b[field]) {
          return isUpDirection ? -1 : 1;
        } else {
          return 0;
        }
      });
      setRowList(
        sortedRowList.map((item) => {
          return createData(
            item.numericCode,
            item.name,
            item.capital,
            item.population
          );
        })
      );

      setIsUpDirection(!isUpDirection);
    },
    [rowList, setRowList, setIsUpDirection, isUpDirection]
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeCity = (event) => {
    setSearchTermCity(event.target.value);
  };

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowList(
          data
            .slice(20, 35)
            .map((item) =>
              createData(
                item.numericCode,
                item.name,
                item.capital,
                item.population
              )
            )
        );
      });
  }, [setRowList, createData]);

  const filteredRowList = rowList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.capital.toLowerCase().includes(searchTermCity.toLowerCase())
  );

  const handleCheckLine = useCallback((row) => {
    setCheckedLines((prevList) => {
      if (prevList.find((item) => item === row.name)) {
        return prevList.filter((f) => f !== row.name);
      } else {
        return [...prevList, row.name];
      }
    });
  }, []);

  const handleRemoveLine = useCallback(() => {
    setRowList((prevList) => {
      return prevList.filter((f) => !checkedLines.includes(f.name));
    });

    setCheckedLines([]);
  }, [checkedLines, setRowList]);

  if (!rowList) {
    return <div>Still Loading</div>;
  }

  const handleChangeTableField = (event, line) => {
    const newValue = event.target.value;
    const fieldName = event.target.name;
    setRowList((oldList) => {
      return oldList.map((row, index) => {
        if (index === line) {
          return { ...row, [fieldName]: newValue };
        } else {
          return row;
        }
      });
    });
  };

  return (
    <div style={{ paddingTop: "50px", marginTop: "60px" }}>
      <h1 style={{ color: "#ab0075" }}>The Table of Countries RESTful API</h1>
      <br />
      <div className="App">
        <input
          type="text"
          placeholder="Filter country"
          value={searchTerm}
          onChange={handleChange}
        />
        <div />
        <div className="App">
          <input
            type="text"
            placeholder="Filter city"
            value={searchTermCity}
            onChange={handleChangeCity}
          />
          <div />
          <div>
            <br />
            <h1> ADD A COUNTRY </h1>
            <LongCountriesForm
              handleSubmit={handleAddCountry}
              initialData={initialForm}
            />
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: "10px", minWidth: "100px" }}
              onClick={handleRemoveLine}
            >
              Remove selected countries
            </button>
            <button
              className="btn btn-success"
              style={{
                padding: "10px",
                margin: "10px",
                minwidth: "100px",
                color: "white",
              }}
              onClick={() => {
                handleSortByField("numericCode");
              }}
            >
              Sort by Code{" "}
            </button>
            <button
              className="btn btn-success"
              style={{
                padding: "10px",
                margin: "10px",
                minwidth: "100px",
                color: "white",
              }}
              onClick={() => {
                handleSortByField("name");
              }}
            >
              Sort by Name{" "}
            </button>
            <button
              className="btn btn-success"
              style={{
                padding: "10px",
                margin: "10px",
                minwidth: "100px",
                color: "white",
              }}
              onClick={() => {
                handleSortByField("capital");
              }}
            >
              Sort by Capital{" "}
            </button>
            <button
              className="btn btn-success"
              style={{
                padding: "10px",
                margin: "10px",
                minwidth: "100px",
                color: "white",
              }}
              onClick={() => {
                handleSortByField("population");
              }}
            >
              Sort by Population{" "}
            </button>
          </div>
          <br />

          <table className="table" style={{ color: "inherit" }}>
            <thead>
              <tr>
                <th
                  scope="col"
                  align="center"
                  onClick={() => handleSortByField("numericCode")}
                >
                  Code
                </th>
                <th
                  scope="col"
                  align="center"
                  onClick={() => handleSortByField("name")}
                >
                  Name
                </th>
                <th
                  scope="col"
                  align="center"
                  onClick={() => handleSortByField("capital")}
                >
                  Capital
                </th>
                <th
                  scope="col"
                  align="center"
                  onClick={() => handleSortByField("population")}
                >
                  Population
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRowList.map((row, index) => {
                const isCheckedLine = checkedLines.includes(row.name);
                return (
                  <tr
                    key={row.numericCode}
                    style={{
                      backgroundColor: checkedLines.includes(row.name)
                        ? "yellow"
                        : "transparent",
                    }}
                    className="table-tr"
                  >
                    <th scope="row">{row.numericCode}</th>

                    <td align="center">
                      {isCheckedLine ? (
                        <input
                          type="text"
                          name={"name"}
                          defaultValue={row.name}
                          onChange={(event) =>
                            handleChangeTableField(event,index)
                          }
                        />
                      ) : (
                        row.name
                      )}
                    </td>
                    <td align="center">
                      {isCheckedLine ? (
                        <input
                          type="text"
                          name={"capital"}
                          defaultValue={row.capital}
                          onChange={(event) =>
                            handleChangeTableField(event,index)
                          }
                        />
                      ) : (
                        row.capital
                      )}
                    </td>
                    <td align="center">
                      {isCheckedLine ? (
                        <input
                          type="text"
                          name={"population"}
                          defaultValue={row.population}
                          onChange={(event) =>
                            handleChangeTableField(event, index)
                          }
                        />
                      ) : (
                        row.population
                      )}
                    </td>
                    <td align="center">
                      <input
                        type="checkbox"
                        onClick={() => handleCheckLine(row)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
