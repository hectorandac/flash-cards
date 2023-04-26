import React, { useState, useEffect } from "react";

const DataSetSelector = ({ setFlashcards, flashcards }) => {
  const [dataSets, setDataSets] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState("");
  const [newDataSetName, setNewDataSetName] = useState("");

  useEffect(() => {
    fetch("http://10.147.20.151:3023/flashcards")
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setDataSets(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleNewDataSet = () => {
    if (newDataSetName.trim() === "") {
      alert("Please enter a name for the new dataset.");
      return;
    }

    const newDataSet = { name: newDataSetName, flashcardsYAML: flashcards };
    setDataSets([...dataSets, newDataSet]);
    localStorage.setItem("dataSets", JSON.stringify([...dataSets, newDataSet]));
    setSelectedDataSet(newDataSetName);
  };

  const handleDataSetChange = (e) => {
    setSelectedDataSet(e.target.value);
    const selected = dataSets.find((dataSet) => dataSet.name === e.target.value);
    setFlashcards(selected.flashcardsYAML);
  };

  return (
    <div className="data-set-selector">
      <label htmlFor="dataSetSelect">Select Dataset:</label>
      <select
        id="dataSetSelect"
        value={selectedDataSet}
        onChange={handleDataSetChange}
      >
        <option value="">--Select a Dataset--</option>
        {dataSets.map((dataSet) => (
          <option key={dataSet.name} value={dataSet.name}>
            {dataSet.name}
          </option>
        ))}
      </select>
      <label htmlFor="newDataSetName">New Dataset Name:</label>
      <input
        type="text"
        id="newDataSetName"
        value={newDataSetName}
        onChange={(e) => setNewDataSetName(e.target.value)}
      />
      <button style={{marginBottom: '16px', marginTop: '8px'}} onClick={handleNewDataSet}>Create New Dataset</button>
    </div>
  );
};

export default DataSetSelector;
