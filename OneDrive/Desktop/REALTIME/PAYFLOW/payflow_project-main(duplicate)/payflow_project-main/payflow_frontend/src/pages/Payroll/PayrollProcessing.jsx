import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PayrollProcessing() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayrolls = () => {
    setLoading(true);
    fetch("/api/payroll/all", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching payrolls");
        return res.json();
      })
      .then((data) => setPayrolls(data))
      .catch(() => toast.error("Failed to fetch payrolls"))
      .finally(() => setLoading(false));
  };

  const processPayroll = (payrollId) => {
    setLoading(true);
    fetch(`/api/payroll/process/${payrollId}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error processing payroll");
        return res.json();
      })
      .then(() => {
        toast.success("Payroll processed successfully");
        fetchPayrolls(); // refresh list
      })
      .catch(() => toast.error("Failed to process payroll"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: 220, padding: "2rem", width: "100%" }}>
        <h2 className="text-2xl font-semibold mb-4">Payroll Processing</h2>

        {loading && <p>Loading...</p>}

        {!loading && payrolls.length === 0 && <p>No payrolls scheduled.</p>}

        {!loading &&
          payrolls.map((payroll) => (
            <div
              key={payroll.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p>
                <strong>Month:</strong>{" "}
                {new Date(0, payroll.month - 1).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {payroll.year}
              </p>
              <p>
                <strong>Status:</strong> {payroll.status}
              </p>
              <button
                onClick={() => processPayroll(payroll.id)}
                disabled={payroll.status === "PROCESSED"}
                style={{
                  marginTop: "0.5rem",
                  padding: "8px 16px",
                  backgroundColor:
                    payroll.status === "PROCESSED" ? "#ccc" : "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor:
                    payroll.status === "PROCESSED" ? "not-allowed" : "pointer",
                }}
              >
                {payroll.status === "PROCESSED"
                  ? "Already Processed"
                  : "Process Payroll"}
              </button>
            </div>
          ))}

        <ToastContainer />
      </main>
    </div>
  );
}
