import React from "react";
import { FaEye } from "react-icons/fa";

export default function PayrollList({ payrolls, onView }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="px-6 py-3 border-b">Payroll ID</th>
            <th className="px-6 py-3 border-b">Month</th>
            <th className="px-6 py-3 border-b">Year</th>
            <th className="px-6 py-3 border-b">Status</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls?.length > 0 ? (
            payrolls.map((payroll) => (
              <tr key={payroll.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{payroll.id}</td>
                <td className="px-6 py-4 border-b capitalize">{payroll.month}</td>
                <td className="px-6 py-4 border-b">{payroll.year}</td>
                <td className="px-6 py-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      payroll.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : payroll.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payroll.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => onView(payroll)}
                    className="text-blue-600 hover:underline flex items-center gap-2"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-6 py-6 text-gray-500">
                No payroll records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
