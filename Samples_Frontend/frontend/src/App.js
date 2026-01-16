import React, { useState } from "react";
import axios from "axios";

function App() {
  const [step, setStep] = useState(1);
  const [sampleId, setSampleId] = useState("");
  const [sampleData, setSampleData] = useState(null);
  const [collectionDate, setCollectionDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const getSample = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/sample/${sampleId}/`);
      setSampleData(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Sample NOT Found");
      setSampleData(null);
    }
  };

  const postSample = async () => {
    try {
      await axios.post(`http://localhost:8000/api/sample/submit/`, {
        sample_id: sampleId,
        collection_date: collectionDate,
        notes,
      });
      alert("Submission successful!");
      setStep(1);
      setSampleId("");
      setSampleData(null);
      setCollectionDate("");
      setNotes("");
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Lab Sample Intake Application</h1>
      {step === 1 && (
        <div>
          <input
            placeholder="Sample ID"
            value={sampleId}
            onChange={(e) => setSampleId(e.target.value)}
          />
          <button onClick={getSample}>Lookup</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {sampleData && (
            <div>
              <p>Name: {sampleData.name}</p>
              <p>Date of Birth: {sampleData.date_of_birth}</p>
              <button onClick={() => setStep(2)}>Confirm</button>
            </div>
          )}
        </div>
      )}
      {step === 2 && (
        <div 
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "16px",
        }}>
          <input
            type="date"
            value={collectionDate}
            onChange={(e) => setCollectionDate(e.target.value)}
            required
          />
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button onClick={postSample}>Submit</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
