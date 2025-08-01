import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewPayroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchPayrolls = () => {
    fetch(`/api/payroll?month=${month}&year=${year}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPayrolls(data))
      .catch(() => toast.error("Failed to load payrolls"));
  };

  useEffect(() => {
    fetchPayrolls();
  }, [month, year]);

  const handleAction = (id, action) => {
    fetch(`/api/payroll/${action}/${id}`, {
      method: "PUT",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          toast.success(`Payroll ${action}ed successfully`);
          fetchPayrolls();
        } else {
          throw new Error();
        }
      })
      .catch(() => toast.error(`Failed to ${action} payroll`));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>View Payrolls</h2>

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
            onChange={(e) => setYear(e.target.value)}
            style={{ padding: "8px", borderRadius: "8px" }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Month</th>
                <th>Year</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p) => (
                <tr key={p.id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                  <td>{p.id}</td>
                  <td>{p.employeeId}</td>
                  <td>{p.month}</td>
                  <td>{p.year}</td>
                  <td>₹{p.netSalary.toFixed(2)}</td>
                  <td>{p.status}</td>
                  <td style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                    <button onClick={() => handleAction(p.id, "retry")}>Retry</button>
                    <button onClick={() => handleAction(p.id, "hold")}>Hold</button>
                    <button onClick={() => handleAction(p.id, "cancel")}>Cancel</button>
                  </td>
                </tr>
              ))}
              {payrolls.length === 0 && (
                <tr>
                  <td colSpan="7">No payrolls found for selected month/year.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </main>
    </div>
  );
}
