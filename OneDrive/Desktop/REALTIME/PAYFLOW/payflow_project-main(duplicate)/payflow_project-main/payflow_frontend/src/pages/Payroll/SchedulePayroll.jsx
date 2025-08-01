import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SchedulePayroll() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/employees/all", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => toast.error("Failed to fetch employees"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmployeeId || !amount) {
      toast.warning("Please select employee and enter amount");
      return;
    }

    setSubmitting(true);

    fetch("/api/payroll/schedule", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId: selectedEmployeeId, amount }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Payroll Scheduled Successfully");
          setSelectedEmployeeId("");
          setAmount("");
        } else {
          throw new Error("Failed to schedule payroll");
        }
      })
      .catch(() => toast.error("Payroll scheduling failed"))
      .finally(() => setSubmitting(false));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
          Schedule Payroll
        </h2>

        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: 500,
              background: "#fff",
              padding: 30,
              borderRadius: 12,
              boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
              >
                Select Employee:
              </label>
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              >
                <option value="">-- Choose Employee --</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.fullName} ({emp.email})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", fontWeight: 600, marginBottom: 8 }}
              >
                Amount:
              </label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? "#94a3b8" : "#2563eb",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: 600,
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                width: "100%",
              }}
            >
              {submitting ? "Scheduling..." : "Schedule"}
            </button>
          </form>
        )}

        <ToastContainer />
      </main>
    </div>
  );
}
