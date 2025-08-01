import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";

export default function PayslipCard({ payslip, onDownload }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 w-full max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-3">
        <FaFileInvoiceDollar size={28} className="text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">
          Payslip - {payslip.month} {payslip.year}
        </h3>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Employee:</strong> {payslip.employeeName}</p>
        <p><strong>Basic Salary:</strong> ₹{payslip.basicSalary}</p>
        <p><strong>Deductions:</strong> ₹{payslip.deductions}</p>
        <p><strong>Net Pay:</strong> ₹{payslip.netSalary}</p>
        <p><strong>Status:</strong> {payslip.status}</p>
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={() => onDownload(payslip)}
          className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
