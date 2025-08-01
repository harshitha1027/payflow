package com.example.payflow_backend.service;

import com.example.payflow_backend.model.*;
import com.example.payflow_backend.repository.PayrollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import com.example.payflow_backend.dto.PayrollRequest;

@Service
@RequiredArgsConstructor
public class PayrollService {
    private final PayrollRepository payrollRepository;
    private final LeaveRequestService leaveService;
    private final EmployeeService employeeService;
    private final EmailService emailService;

    public Payroll schedulePayroll(Long employeeId, int month, int year) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        double salary = employee.getSalary();
        double bonus = 1000.0; // static for now
        double deductions = leaveService.calculateDeductions(employeeId, month, year);
        double netSalary = salary + bonus - deductions;

        Payroll payroll = Payroll.builder()
                .employeeId(employeeId)
                .month(month)
                .year(year)
                .basicSalary(salary)
                .bonuses(bonus)
                .deductions(deductions)
                .netSalary(netSalary)
                .status(PayrollStatus.SCHEDULED)
                .createdAt(LocalDateTime.now())
                .build();

        payrollRepository.save(payroll);
        emailService.sendPayrollScheduledEmail(employee.getEmail(), payroll);
        return payroll;
    }

    public Payroll holdPayroll(Long id) {
        Payroll payroll = payrollRepository.findById(id).orElseThrow();
        payroll.setStatus(PayrollStatus.HELD);
        return payrollRepository.save(payroll);
    }

    public Payroll cancelPayroll(Long id) {
        Payroll payroll = payrollRepository.findById(id).orElseThrow();
        payroll.setStatus(PayrollStatus.FAILED);
        return payrollRepository.save(payroll);
    }

    public Payroll retryPayroll(Long id) {
        Payroll payroll = payrollRepository.findById(id).orElseThrow();
        payroll.setStatus(PayrollStatus.PROCESSING);
        return payrollRepository.save(payroll);
    }

    public List<Payroll> getPayrollsByMonthAndYear(int month, int year) {
        return payrollRepository.findByMonthAndYear(month, year);
    }

    public Payroll generatePayslip(Long employeeId, int month, int year) {
        return payrollRepository.findByEmployeeIdAndMonthAndYear(employeeId, month, year)
                .orElseThrow(() -> new RuntimeException("Payslip not found"));
    }
    
    public void generatePayroll(PayrollRequest request) {
        String monthStr = request.getMonth();
        String yearStr = request.getYear();
        int month = Integer.parseInt(monthStr);
        int year = Integer.parseInt(yearStr);

        for (String empIdStr : request.getSelectedEmployees()) {
            Long employeeId = Long.parseLong(empIdStr);
            Employee employee = employeeService.getEmployeeById(employeeId);
            double salary = request.getSalaries().getOrDefault(empIdStr, employee.getSalary());

            double bonus = 1000.0; // static bonus
            double deductions = leaveService.calculateDeductions(employeeId, month, year);
            double netSalary = salary + bonus - deductions;

            Payroll payroll = Payroll.builder()
                    .employeeId(employeeId)
                    .month(month)
                    .year(year)
                    .basicSalary(salary)
                    .bonuses(bonus)
                    .deductions(deductions)
                    .netSalary(netSalary)
                    .status(PayrollStatus.SCHEDULED)
                    .createdAt(LocalDateTime.now())
                    .build();

            payrollRepository.save(payroll);

            // Send notification email
            emailService.sendPayrollScheduledEmail(employee.getEmail(), payroll);
        }
    }


}
