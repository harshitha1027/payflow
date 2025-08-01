// // // import React, { useEffect, useState } from "react";
// // // import Sidebar from "../components/Sidebar";
// // // import axios from "axios";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // export default function PayrollDashboard() {
// // //   const [payrolls, setPayrolls] = useState([]);
// // //   const [month, setMonth] = useState(new Date().getMonth() + 1); // Current month
// // //   const [year, setYear] = useState(new Date().getFullYear());

// // //   const fetchPayrolls = async () => {
// // //     try {
// // //       const res = await axios.get(`/api/payroll`, {
// // //         params: { month, year },
// // //       });
// // //       setPayrolls(res.data);
// // //     } catch (err) {
// // //       toast.error("Failed to fetch payrolls");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchPayrolls();
// // //   }, [month, year]);

// // //   const handleAction = async (id, action) => {
// // //     try {
// // //       await axios.put(`/api/payroll/${action}/${id}`);
// // //       toast.success(`Payroll ${action} successful`);
// // //       fetchPayrolls();
// // //     } catch (err) {
// // //       toast.error(`Failed to ${action} payroll`);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex">
// // //       <Sidebar />
// // //       <div className="p-6 w-full">
// // //         <ToastContainer />
// // //         <h2 className="text-2xl font-bold mb-4">Payroll Dashboard</h2>

// // //         <div className="flex gap-4 mb-4">
// // //           <select
// // //             value={month}
// // //             onChange={(e) => setMonth(Number(e.target.value))}
// // //             className="border rounded p-2"
// // //           >
// // //             {[...Array(12)].map((_, i) => (
// // //               <option key={i + 1} value={i + 1}>
// // //                 {new Date(0, i).toLocaleString("default", { month: "long" })}
// // //               </option>
// // //             ))}
// // //           </select>

// // //           <input
// // //             type="number"
// // //             value={year}
// // //             onChange={(e) => setYear(Number(e.target.value))}
// // //             className="border rounded p-2"
// // //           />
// // //         </div>

// // //         <table className="w-full table-auto border">
// // //           <thead className="bg-gray-100">
// // //             <tr>
// // //               <th className="p-2 border">Employee ID</th>
// // //               <th className="p-2 border">Month</th>
// // //               <th className="p-2 border">Year</th>
// // //               <th className="p-2 border">Salary</th>
// // //               <th className="p-2 border">Bonuses</th>
// // //               <th className="p-2 border">Deductions</th>
// // //               <th className="p-2 border">Net Salary</th>
// // //               <th className="p-2 border">Status</th>
// // //               <th className="p-2 border">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {payrolls.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan="9" className="text-center p-4">
// // //                   No payroll data
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               payrolls.map((pay) => (
// // //                 <tr key={pay.id}>
// // //                   <td className="p-2 border">{pay.employeeId}</td>
// // //                   <td className="p-2 border">{pay.month}</td>
// // //                   <td className="p-2 border">{pay.year}</td>
// // //                   <td className="p-2 border">₹{pay.basicSalary}</td>
// // //                   <td className="p-2 border">₹{pay.bonuses}</td>
// // //                   <td className="p-2 border">₹{pay.deductions}</td>
// // //                   <td className="p-2 border font-semibold">₹{pay.netSalary}</td>
// // //                   <td className="p-2 border">{pay.status}</td>
// // //                   <td className="p-2 border space-x-1">
// // //                     <button
// // //                       onClick={() => handleAction(pay.id, "hold")}
// // //                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
// // //                     >
// // //                       Hold
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleAction(pay.id, "cancel")}
// // //                       className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
// // //                     >
// // //                       Cancel
// // //                     </button>
// // //                     <button
// // //                       onClick={() => handleAction(pay.id, "retry")}
// // //                       className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
// // //                     >
// // //                       Retry
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React from "react";

// // const PayrollDashboard = () => {
// //   return (
// //     <div style={{ padding: "2rem" }}>
// //       <h1>Payroll Dashboard</h1>
// //       <p>This is the Payroll Dashboard component.</p>
// //     </div>
// //   );
// // };

// // export default PayrollDashboard;
// // src/pages/PayrollDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Sidebar from "../components/Sidebar";
// import { FaMoneyBillWave, FaUserTie, FaHistory, FaCalendarAlt } from "react-icons/fa";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const PayrollDashboard = () => {
//   const [payrolls, setPayrolls] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPayrolls = async () => {
//       try {
//         const response = await fetch("https://your-api-endpoint.com/payrolls"); // 🔁 Replace with real API URL
//         const data = await response.json();
//         setPayrolls(data);
//       } catch (error) {
//         console.error("Failed to fetch payrolls:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayrolls();
//   }, []);

//   const totalPayrolls = payrolls.length;
//   const completed = payrolls.filter((p) => p.status === "Completed").length;
//   const pending = payrolls.filter((p) => p.status === "Pending").length;
//   const totalAmount = payrolls.reduce((sum, p) => sum + p.amount, 0);

//   const pieData = {
//     labels: ["Completed", "Pending"],
//     datasets: [
//       {
//         data: [completed, pending],
//         backgroundColor: ["#34d399", "#facc15"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const barData = {
//     labels: payrolls.map((p) => p.employee),
//     datasets: [
//       {
//         label: "Salary Paid",
//         data: payrolls.map((p) => p.amount),
//         backgroundColor: "#60a5fa",
//       },
//     ],
//   };

//   if (loading) {
//     return (
//       <div style={{ display: "flex" }}>
//         <Sidebar />
//         <div style={{ padding: "2rem", fontSize: "1.5rem" }}>Loading payroll data...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ flex: 1, padding: "2rem", background: "#f9fafb", minHeight: "100vh" }}>
//         <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
//           Payroll Dashboard
//         </h1>

//         {/* Summary Cards */}
//         <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
//           <StatCard icon={<FaUserTie />} label="Total Payrolls" value={totalPayrolls} />
//           <StatCard icon={<FaMoneyBillWave />} label="Total Amount" value={`₹${totalAmount}`} />
//           <StatCard icon={<FaHistory />} label="Completed" value={completed} />
//           <StatCard icon={<FaCalendarAlt />} label="Pending" value={pending} />
//         </div>

//         {/* Charts */}
//         <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
//           <div style={{ flex: 1, background: "#fff", padding: "1rem", borderRadius: "10px" }}>
//             <h3 style={{ marginBottom: "1rem" }}>Salary Distribution</h3>
//             <Bar data={barData} />
//           </div>
//           <div style={{ width: 300, background: "#fff", padding: "1rem", borderRadius: "10px" }}>
//             <h3 style={{ marginBottom: "1rem" }}>Status Breakdown</h3>
//             <Pie data={pieData} />
//           </div>
//         </div>

//         {/* Payroll Table */}
//         <div style={{ marginTop: "2.5rem", background: "#fff", padding: "1rem", borderRadius: "10px" }}>
//           <h3 style={{ marginBottom: "1rem" }}>Recent Payrolls</h3>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
//                 <th style={{ padding: "0.75rem" }}>Employee</th>
//                 <th style={{ padding: "0.75rem" }}>Amount</th>
//                 <th style={{ padding: "0.75rem" }}>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payrolls.map((p, i) => (
//                 <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
//                   <td style={{ padding: "0.75rem" }}>{p.employee}</td>
//                   <td style={{ padding: "0.75rem" }}>₹{p.amount}</td>
//                   <td
//                     style={{
//                       padding: "0.75rem",
//                       color: p.status === "Completed" ? "green" : "#f59e0b",
//                     }}
//                   >
//                     {p.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon, label, value }) => (
//   <div
//     style={{
//       flex: 1,
//       background: "#fff",
//       padding: "1.25rem 1.5rem",
//       borderRadius: "10px",
//       boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
//       minWidth: 220,
//     }}
//   >
//     <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//       <div style={{ fontSize: "1.5rem", color: "#2563eb" }}>{icon}</div>
//       <div>
//         <div style={{ fontWeight: "bold", fontSize: "1rem" }}>{label}</div>
//         <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "0.2rem" }}>{value}</div>
//       </div>
//     </div>
//   </div>
// );

// export default PayrollDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaMoneyBillWave, FaUserTie, FaHistory, FaCalendarAlt } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PayrollDashboard = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await fetch("https://your-api-endpoint.com/payrolls"); // Replace with real API
        const data = await response.json();
        setPayrolls(data);
      } catch (error) {
        console.error("Failed to fetch payrolls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, []);

  const totalPayrolls = payrolls.length;
  const completed = payrolls.filter((p) => p.status === "Completed").length;
  const pending = payrolls.filter((p) => p.status === "Pending").length;
  const totalAmount = payrolls.reduce((sum, p) => sum + p.amount, 0);

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#34d399", "#facc15"],
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: payrolls.map((p) => p.employee),
    datasets: [
      {
        label: "Salary Paid",
        data: payrolls.map((p) => p.amount),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "2rem", fontSize: "1.5rem" }}>Loading payroll data...</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem", background: "#f9fafb", minHeight: "100vh" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
          Payroll Dashboard
        </h1>

        <button
          onClick={() => navigate("/generate-payroll")}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            marginBottom: "1.5rem",
          }}
        >
          Generate Payroll Now
        </button>

        {/* Summary Cards */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <StatCard icon={<FaUserTie />} label="Total Payrolls" value={totalPayrolls} />
          <StatCard icon={<FaMoneyBillWave />} label="Total Amount" value={`₹${totalAmount}`} />
          <StatCard icon={<FaHistory />} label="Completed" value={completed} />
          <StatCard icon={<FaCalendarAlt />} label="Pending" value={pending} />
        </div>

        {/* Charts */}
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, background: "#fff", padding: "1rem", borderRadius: "10px" }}>
            <h3 style={{ marginBottom: "1rem" }}>Salary Distribution</h3>
            <Bar data={barData} />
          </div>
          <div style={{ width: 300, background: "#fff", padding: "1rem", borderRadius: "10px" }}>
            <h3 style={{ marginBottom: "1rem" }}>Status Breakdown</h3>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Payroll Table */}
        <div style={{ marginTop: "2.5rem", background: "#fff", padding: "1rem", borderRadius: "10px" }}>
          <h3 style={{ marginBottom: "1rem" }}>Recent Payrolls</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "0.75rem" }}>Employee</th>
                <th style={{ padding: "0.75rem" }}>Amount</th>
                <th style={{ padding: "0.75rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "0.75rem" }}>{p.employee}</td>
                  <td style={{ padding: "0.75rem" }}>₹{p.amount}</td>
                  <td
                    style={{
                      padding: "0.75rem",
                      color: p.status === "Completed" ? "green" : "#f59e0b",
                    }}
                  >
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div
    style={{
      flex: 1,
      background: "#fff",
      padding: "1.25rem 1.5rem",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      minWidth: 220,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div style={{ fontSize: "1.5rem", color: "#2563eb" }}>{icon}</div>
      <div>
        <div style={{ fontWeight: "bold", fontSize: "1rem" }}>{label}</div>
        <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "0.2rem" }}>{value}</div>
      </div>
    </div>
  </div>
);

export default PayrollDashboard;