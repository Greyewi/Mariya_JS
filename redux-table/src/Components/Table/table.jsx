import React, { useEffect, useCallback, useState } from "react";
import ShortCountriesForm from "../../ShortCountriesForm";
import { batch } from "react-redux";

export default function Table({
  handleFetchTableList,
  tableData,
  error,
  isLoader,
  sort,
  searchString,
  handleFilterTable,
  handleChangeSort,
  handleAddNewLine,
  handleCheckTableRow,
  handleClearCheckedLines,
  handleRemoveLine,
  checkedLines,
  handleEditTable,
}) {
  const [changedRows, setChangedRows] = useState([]);

  useEffect(() => {
    handleFetchTableList();
  }, [handleFetchTableList]);

  useEffect(() => {
    setChangedRows(tableData.map(row => ({...row})));
  }, [tableData]);

  const handleChange = (event) => {
    handleFilterTable(event.target.value);
    console.log(searchString);
  };

  const handleCheck = useCallback(
    (row) => {
      handleCheckTableRow(row);
      if (checkedLines.includes(row.id)) {
        checkedLines = checkedLines.filter(function (item) {
          return item !== row.id;
        });
      } else {
        checkedLines.push(row.id);
      }
    },
    [handleCheckTableRow, checkedLines]
  );

  const handleRemove = useCallback(() => {
    handleRemoveLine();
  }, [handleRemoveLine]);

  function isCheckedLine(row) {
    if (checkedLines.includes(row.id)) {
      return true;
    } else {
      return false;
    }
  }

  if (isLoader) {
    return (
      <div className="App">
        <header className="App-header">Now Loading ....</header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">{error}</header>
      </div>
    );
  }

  return (
    <>
      <p>Filter country</p>
      <input
        type="text"
        placeholder="Filter country"
        style={{ marginBottom: "20px" }}
        value={searchString}
        onChange={handleChange}
      />

      <ShortCountriesForm
        handleSubmit={handleAddNewLine}
        initialData={{
          id: "",
          name: "",
          capital: "",
          language: "",
          currency: "",
        }}
      />

      <button
        type="button"
        className="btn btn-primary"
        style={{ padding: "10px", minWidth: "100px" }}
        onClick={handleRemove}
      >
        Remove selected countries
      </button>

      <table className="table" style={{ color: "inherit" }}>
        <thead>
          <tr>
            <th scope="col" align="center">
              No.
            </th>
            <th
              scope="col"
              align="center"
              onClick={() => {
                handleChangeSort({
                  field: "name",
                  isUpDirection: !sort.isUpDirection,
                });
              }}
            >
              Name
            </th>
            <th
              scope="col"
              align="center"
              onClick={() => {
                handleChangeSort({
                  field: "capital",
                  isUpDirection: !sort.isUpDirection,
                });
              }}
            >
              Capital
            </th>
            <th
              scope="col"
              align="center"
              onClick={() => {
                handleChangeSort({
                  field: "language",
                  isUpDirection: !sort.isUpDirection,
                });
              }}
            >
              Language
            </th>
            <th scope="col" align="center">
              Currency
            </th>
            <th scope="col" align="center"></th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => {
            return (
              <tr key={row.name}>
                <th scope="row">{row.id}</th>
                <td align="center">
                  {isCheckedLine(row) ? (
                    <input
                      type="text"
                      name={"countryName"}
                      defaultValue={row.name}
                      onChange={(event) =>
                        setChangedRows((prevData) => {
                          return prevData.map((editedRow) => {
                            if (row.id === editedRow.id) {
                              editedRow.name = event.target.value;
                            }
                            return editedRow;
                          });
                        })
                      }
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td align="center">
                  {isCheckedLine(row) ? (
                    <input
                      type="text"
                      name={"capital"}
                      defaultValue={row.capital}
                      onChange={(event) =>
                        setChangedRows((prevData) => {
                          return prevData.map((editedRow) => {
                            if (row.id === editedRow.id) {
                              editedRow.capital = event.target.value;
                            }
                            return editedRow;
                          });
                        })
                      }
                    />
                  ) : (
                    row.capital
                  )}
                </td>
                <td align="center">
                  {isCheckedLine(row) ? (
                    <div>
                      <input
                        type="text"
                        name={"language"}
                        defaultValue={row.language}
                        
                        onChange={(event) => {
                          setChangedRows((prevData) => {
                            return prevData.map((editedRow) => {
                              if (row.id === editedRow.id) {
                                editedRow.language = event.target.value;
                              }

                              return editedRow;
                            });
                          });
                          console.log(changedRows);
                        }}
                      />{" "}
                    </div>
                  ) : (
                    row.language
                  )}
                </td>
                <td align="center">
                  {isCheckedLine(row) ? (
                    <input
                      type="text"
                      name={"currency"}
                      defaultValue={row.currency}
                      onChange={(event) =>
                        setChangedRows((prevData) => {
                          return prevData.map((editedRow) => {
                            if (row.id === editedRow.id) {
                              editedRow.currency = event.target.value;
                            }
                            return editedRow;
                          });
                        })
                      }
                    />
                  ) : (
                    row.currency
                  )}
                </td>
                <td align="center">
                  <input
                    type="checkbox"
                    checked={checkedLines.includes(row.id)}
                    onClick={() => handleCheck(row)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {checkedLines.length ? (
        <>
          <button
            onClick={() => {
              batch(() => {
                handleEditTable(changedRows);
                handleClearCheckedLines(checkedLines);
              });
            }}
          >
            Save changes
          </button>
          <button
            onClick={() => {
              batch(() => {
                setChangedRows(tableData.map(row => ({...row})));
                handleClearCheckedLines(checkedLines);
              });
            }}
          >
            Back
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
}