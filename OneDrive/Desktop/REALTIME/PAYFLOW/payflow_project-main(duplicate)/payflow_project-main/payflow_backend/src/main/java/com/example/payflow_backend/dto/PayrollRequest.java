package com.example.payflow_backend.dto; // Or request/model based on your structure

import java.util.List;
import java.util.Map;

public class PayrollRequest {
    private String month;
    private String year;
    private List<String> selectedEmployees;
    private Map<String, Double> salaries;

    // Getters and Setters

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<String> getSelectedEmployees() {
        return selectedEmployees;
    }

    public void setSelectedEmployees(List<String> selectedEmployees) {
        this.selectedEmployees = selectedEmployees;
    }

    public Map<String, Double> getSalaries() {
        return salaries;
    }

    public void setSalaries(Map<String, Double> salaries) {
        this.salaries = salaries;
    }
}
