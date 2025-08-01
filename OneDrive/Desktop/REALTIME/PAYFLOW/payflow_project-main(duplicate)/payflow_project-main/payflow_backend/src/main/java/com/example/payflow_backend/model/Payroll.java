package com.example.payflow_backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private int month;
    private int year;
    private double basicSalary;
    private double bonuses;
    private double deductions;
    private double netSalary;

    @Enumerated(EnumType.STRING)
    private PayrollStatus status;

    private LocalDateTime createdAt;
}
