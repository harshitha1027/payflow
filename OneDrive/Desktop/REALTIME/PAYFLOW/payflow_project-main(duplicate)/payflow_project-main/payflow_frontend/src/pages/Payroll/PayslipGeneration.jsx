import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PayslipGeneration() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const generatePayslips = () => {
    fetch(`/api/payroll/generate?month=${month}&year=${year}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => toast.success("Payslips generated successfully"))
      .catch(() => toast.error("Failed to generate payslips"));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <h2 className="text-2xl font-semibold mb-4">Payslip Generation</h2>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            style={{ padding: "8px", borderRadius: "8px" }}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            min={2023}
            max={new Date().getFullYear()}
            style={{ padding: "8px", borderRadius: "8px" }}
          />
        </div>

        <button
          onClick={generatePayslips}
          style={{
            padding: "10px 20px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Generate Payslips
        </button>

        <ToastContainer />
      </main>
    </div>
  );
}
