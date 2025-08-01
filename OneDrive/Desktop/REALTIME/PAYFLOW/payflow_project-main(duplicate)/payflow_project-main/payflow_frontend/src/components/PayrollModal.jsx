import React from "react";
import { FaTimes } from "react-icons/fa";

export default function PayrollModal({ payroll, onClose }) {
  if (!payroll) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Payroll Details
        </h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <strong>Payroll ID:</strong> {payroll.id}
          </div>
          <div>
            <strong>Month:</strong> {payroll.month}
          </div>
          <div>
            <strong>Year:</strong> {payroll.year}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                payroll.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : payroll.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {payroll.status}
            </span>
          </div>
          <div>
            <strong>Created Date:</strong>{" "}
            {new Date(payroll.createdAt).toLocaleString()}
          </div>
          <div>
            <strong>Total Employees:</strong> {payroll.employeeCount || "N/A"}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
