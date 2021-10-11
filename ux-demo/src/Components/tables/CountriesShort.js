import React, { useCallback, useEffect, useState } from "react";
import ShortCountriesForm from "./ShortCountriesForm";

function createData(id, name, capital, language, currency) {
  return { id, name, capital, language, currency };
}

export default function DataTable() {
  const [rowList, setRowList] = useState([]);
  const [isUpDirection, setIsUpDirection] = useState(true);
  const initialForm = {
    id: "",
    name: "",
    capital: "",
    language: "",
    currency: "",
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
        sortedRowList.map((item) =>
          createData(
            item.id,
            item.name,
            item.capital,
            item.language,
            item.currency
          )
        )
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
    fetch(
      "https://gist.githubusercontent.com/mariarogina/1bf4e1947ec2fc1e8ded4882e57f4d69/raw/89eb2570fcfd69f31c4dfd21f5f49733fe0bb4d0/countriesdata.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowList(
          data.map((item) =>
            createData(
              item.id,
              item.name,
              item.capital,
              item.language,
              item.currency
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
      if (prevList.find((item) => item === row.id)) {
        return prevList.filter((f) => f !== row.id);
      } else {
        return [...prevList, row.id];
      }
    });
  }, []);

  const handleRemoveLine = useCallback(() => {
    setRowList((prevList) => {
      return prevList.filter((f) => !checkedLines.includes(f.id));
    });

    setCheckedLines([]);
  }, [checkedLines, setRowList]);

  if (!filteredRowList) {
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
      <h1 style={{ color: "#ab0075" }}>The Short Table of Countries</h1>
      <br />
      <div className="App">
        <input
          type="text"
          placeholder="Filter country"
          value={searchTerm}
          onChange={handleChange}
        />
        <div />
        
          <input
            type="text"
            placeholder="Filter city"
            value={searchTermCity}
            onChange={handleChangeCity}
          />
         
          <div>
            <div style={{ paddingTop: "50px" }}>
              <h1 style={{ color: "white" }}>The table of Three Countries</h1>
              <div>
                <br />

                <ShortCountriesForm
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
              </div>
              <br />
              <button
                className="btn btn-info"
                style={{
                  padding: "10px",
                  margin: "10px",
                  minwidth: "100px",
                  color: "white",
                }}
                onClick={() => {
                  handleSortByField("id");
                }}
              >
                Sort by Id
              </button>
              <button
                className="btn btn-info"
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
                Sort by Name
              </button>
              <button
                className="btn btn-info"
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
                Sort by Capital
              </button>
              <button
                className="btn btn-info"
                style={{
                  padding: "10px",
                  margin: "10px",
                  minwidth: "100px",
                  color: "white",
                }}
                onClick={() => {
                  handleSortByField("language");
                }}
              >
                Sort by Language
              </button>
              <button
                className="btn btn-info"
                style={{
                  padding: "10px",
                  margin: "10px",
                  minwidth: "100px",
                  color: "white",
                }}
                onClick={() => {
                  handleSortByField("currency");
                }}
              >
                Sort by Currency
              </button>

              <table className="table" style={{ color: "inherit" }}>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      align="center"
                      onClick={() => handleSortByField("id")}
                    >
                      No.
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
                      onClick={() => handleSortByField("language")}
                    >
                      Language
                    </th>
                    <th
                      scope="col"
                      align="center"
                      onClick={() => handleSortByField("currency")}
                    >
                      Currency
                    </th>
                    <th scope="col" align="center"></th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRowList.map((row, index) => {
                    const isCheckedLine = checkedLines.includes(row.id);
                    return (
                      <tr
                        key={row.name}
                        style={{
                          backgroundColor: isCheckedLine
                            ? "yellow"
                            : "transparent",
                        }}
                        className="table-tr"
                      >
                        <th scope="row">{row.id}</th>
                        <td align="center">
                          {isCheckedLine ? (
                            <input
                              type="text"
                              name={"name"}
                              defaultValue={row.name}
                              onChange={(event) =>
                                handleChangeTableField(event, index)
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
                                handleChangeTableField(event, index)
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
                              name={"language"}
                              defaultValue={row.language}
                              onChange={(event) =>
                                handleChangeTableField(event, index)
                              }
                            />
                          ) : (
                            row.language
                          )}
                        </td>
                        <td align="center">
                          {isCheckedLine ? (
                            <input
                              type="text"
                              name={"currency"}
                              defaultValue={row.currency}
                              onChange={(event) =>
                                handleChangeTableField(event, index)
                              }
                            />
                          ) : (
                            row.currency
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
      </div>
    </div>
  );
}
