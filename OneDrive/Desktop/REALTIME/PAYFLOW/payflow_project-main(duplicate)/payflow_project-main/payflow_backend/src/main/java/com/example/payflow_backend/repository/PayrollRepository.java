package com.example.payflow_backend.repository;

import com.example.payflow_backend.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    Optional<Payroll> findByEmployeeIdAndMonthAndYear(Long employeeId, int month, int year);
    List<Payroll> findByMonthAndYear(int month, int year);
}
