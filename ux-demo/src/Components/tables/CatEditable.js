import React, {useEffect, useState} from 'react';


const CAT_API = "https://api.thecatapi.com/v1/breeds/";

function CatEd() {
    const [data, setData] = useState([]);

    const fetchCats = () => {
        fetch("https://api.thecatapi.com/v1/breeds")
            .then(res => res.json())
            .then(json => setData(json));
    }

    useEffect(() => {
        fetchCats();
    }, []);


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [catIntel, setIntel] = useState(null);

    /**
     *
     * @param id - The id of the product
     * @param currentIntel - The current unit price of the product
     */
    const onEdit = ({id, currentIntel}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setIntel(currentIntel);
    }

    /**
     *
     * @param id
     * @param newIntel
     */
     const updateCAT = ({id, newIntel}) => {
        fetch(`${CAT_API}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                temperament: newIntel
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        .then(response => response.json())
        .then(json => {
           
            
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                fetchCats();
            })
    }

    /**
     *
     * @param id -The id of the product
     * @param newIntel - The new unit price of the product
     */
    const onSave = ({id, newIntel}) => {
        updateCAT({id, newIntel});
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setIntel(null);
    }

    
    return (
        <div className="container" style={{marginTop:'70px'}}>
            <h1>Simple Cat Table (edit temperament)</h1>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Cat Temperament</th>
                    <th scope="col">Cat Name </th>
                  
                    <th scope="col">Intelligence</th>
                    <th scope="col">Imange</th>
                </tr>
                </thead>
                <tbody>
                <th scope="row"></th>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                        
                        <td>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={catIntel}
                                               onChange={(event) => setIntel(event.target.value)}
                                        />
                                    ) : (
                                        item.temperament
                                    )
                                }
                                
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <React.Fragment>
                                            <button   style={{margin:'20px'}}
                                                className={"btn btn-outline-dark"}
                                                onClick={() => onSave({id: item.id, newIntel: catIntel})}
                                            >
                                                Save
                                            </button>

                                            <button   style={{margin:'20px'}}
                                                className={"btn btn-outline-danger"}
                                                style={{marginLeft: 8}}
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                        </React.Fragment>
                                    ) : (
                                        <button
                                        style={{margin:'20px'}}
                                            className={"btn btn-outline-warning"}
                                            onClick={() => onEdit({id: item.id, currentIntel: item.temperament})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                            </td>
                            <td>{item.name}</td>
                            <td>{item.intelligence}</td>
                            <td >	<img style={{width:'250px'}}  src={item.image?.url} /></td>
                           
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default CatEd;