import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewPayslip() {
  const [payslip, setPayslip] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  const fetchPayslip = () => {
    setLoading(true);
    fetch(`/api/payroll/payslip?month=${month}&year=${year}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setPayslip(data))
      .catch(() => {
        toast.error("No payslip available for selected month/year");
        setPayslip(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPayslip();
  }, [month, year]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>View Payslip</h2>

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

        {loading ? (
          <p>Loading payslip...</p>
        ) : payslip ? (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "2rem",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "600px",
              background: "#f9fafb",
            }}
          >
            <h3>
              Payslip for{" "}
              {new Date(0, payslip.month - 1).toLocaleString("default", {
                month: "long",
              })}{" "}
              {payslip.year}
            </h3>
            <p>
              <strong>Basic Salary:</strong> ₹{payslip.basicSalary.toFixed(2)}
            </p>
            <p>
              <strong>Bonuses:</strong> ₹{payslip.bonuses.toFixed(2)}
            </p>
            <p>
              <strong>Deductions:</strong> ₹{payslip.deductions.toFixed(2)}
            </p>
            <p>
              <strong>Net Salary:</strong> ₹{payslip.netSalary.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {payslip.status}
            </p>

            <button
              onClick={() => window.print()}
              style={{
                marginTop: "1rem",
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Download / Print Payslip
            </button>
          </div>
        ) : (
          <p style={{ marginTop: "1rem" }}>No payslip found.</p>
        )}

        <ToastContainer />
      </main>
    </div>
  );
}
