import React, { useState } from "react";

const GeneratePayrollForm = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [salaryInput, setSalaryInput] = useState("");
  const [salaries, setSalaries] = useState({});

  const handleSalaryChange = (e) => {
    setSalaryInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setSalaries(parsed);
    } catch (error) {
      setSalaries({});
    }
  };

  const handleGenerate = () => {
    const payroll = {
      month,
      year,
      selectedEmployees,
      salaries,
    };

    console.log("Generated Payroll:", payroll);

    // Optional: POST to backend
    // fetch("/api/generate-payroll", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payroll),
    // });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto", background: "#f9fafb", borderRadius: "12px" }}>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.75rem" }}>🧾 Generate Payroll</h2>

      {/* Month Selector */}
      <label style={{ fontWeight: "bold" }}>Month:</label>
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{ marginBottom: "1rem", display: "block", width: "100%", padding: "0.5rem" }}
      >
        <option value="">-- Select Month --</option>
        {[
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {/* Year Input */}
      <label style={{ fontWeight: "bold" }}>Year:</label>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="e.g. 2025"
        style={{ marginBottom: "1rem", display: "block", width: "100%", padding: "0.5rem" }}
      />

      {/* Employee Input */}
      <label style={{ fontWeight: "bold" }}>Employees (comma-separated):</label>
      <input
        type="text"
        placeholder="e.g. Alice, Bob, Charlie"
        onChange={(e) => setSelectedEmployees(e.target.value.split(",").map((emp) => emp.trim()))}
        style={{ marginBottom: "1rem", display: "block", width: "100%", padding: "0.5rem" }}
      />

      {/* Salary JSON Input */}
      <label style={{ fontWeight: "bold" }}>Salary Data (JSON format):</label>
      <textarea
        value={salaryInput}
        onChange={handleSalaryChange}
        placeholder='e.g. { "Alice": 50000, "Bob": 55000 }'
        style={{ marginBottom: "1rem", display: "block", width: "100%", height: "120px", padding: "0.5rem", fontFamily: "monospace" }}
      />

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        style={{
          backgroundColor: "#2563eb",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🚀 Generate Payroll
      </button>
    </div>
  );
};

export default GeneratePayrollForm;