import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./authContext.jsx";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard";
import ManagerDashboard from "./pages/Managerdashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeavesInfo from "./pages/LeavesInfo";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeList from "./pages/Employee/EmployeeList";
import AddEmployee from "./pages/Employee/AddEmployee";
import LeaveRequests from "./pages/Leave/LeaveRequests";
import LeaveApproval from "./pages/Leave/LeaveApproval";
import PayrollDashboard from "./pages/PayrollDashboard";
import ViewPayslip from "./pages/Payroll/ViewPayslip";
import PayrollProcessing from "./pages/Payroll/PayrollProcessing";
import PayslipGeneration from "./pages/Payroll/PayslipGeneration";
import GeneratePayrollForm from "./pages/GeneratePayrollForm";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/payroll-dashboard" element={<PayrollDashboard />} />
    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
     <Route path="/apply-leave" element={<ApplyLeave />} />
      <Route path="/leaves-info" element={<LeavesInfo />} />
      <Route path="/generate-payroll" element={<GeneratePayrollForm />} />
      {/* Employee Routes */}
      {user && user.role === "employee" && (
        <>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
          <Route path="/leaves-info" element={<LeavesInfo />} />
          <Route path="/view-payslip" element={<ViewPayslip />} />
        </>
      )}

      {/* Admin Routes */}
      {user && user.role === "admin" && (
        <>
          <Route path="/admin" element={<AdminDashboard active="dashboard" />} />
          <Route path="/admin/add-user" element={<AdminDashboard active="createForm" />} />
          <Route path="/admin/users" element={<AdminDashboard active="userList" />} />
          <Route path="/admin/employees" element={<EmployeeListPage />} />
        </>
      )}

      {/* HR Routes */}
      {user && (user.role === "HR" || user.role === "hr") && (
        <>
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/payroll-dashboard" element={<PayrollDashboard />} />
          <Route path="/payroll-processing" element={<PayrollProcessing />} />
          <Route path="/generate-payslip" element={<PayslipGeneration />} />
        </>
      )}

      {/* Manager Routes */}
      {user && (user.role === "MANAGER" || user.role === "manager") && (
        <>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/payroll-dashboard" element={<PayrollDashboard />} />
          <Route path="/payroll-processing" element={<PayrollProcessing />} />
          <Route path="/generate-payslip" element={<PayslipGeneration />} />
        </>
      )}

      {/* Universal access (e.g., onboarding) */}
      <Route path="/Employee/AddEmployee/add" element={<AddEmployee />} />

      {/* Catch-all for unknown paths */}
      <Route
        path="*"
        element={
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/login" style={{ color: "#38bdf8" }}>Go to Login</a>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
