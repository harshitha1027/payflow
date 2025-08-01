package com.example.payflow_backend.controller;

import com.example.payflow_backend.model.LeaveRequest;
import com.example.payflow_backend.model.LeaveStatus;
import com.example.payflow_backend.service.LeaveRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:5173")
public class LeaveController {

    private final LeaveRequestService leaveService;

    public LeaveController(LeaveRequestService leaveService) {
        this.leaveService = leaveService;
    }

    // ✅ EMPLOYEE: Apply for leave
    @PostMapping("/apply/{employeeId}")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<LeaveRequest> applyLeave(@PathVariable Long employeeId,
                                                   @RequestBody LeaveRequest leaveRequest) {
        LeaveRequest saved = leaveService.applyLeave(employeeId, leaveRequest);
        return ResponseEntity.ok(saved);
    }

    // ✅ EMPLOYEE: Get own leave requests
    @GetMapping("/{employeeId}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('HR') or hasRole('MANAGER')")
    public ResponseEntity<List<LeaveRequest>> getLeaves(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getEmployeeLeaves(employeeId));
    }

    // ✅ HR/MANAGER: Approve or reject a leave
    @PutMapping("/{leaveId}/status")
    @PreAuthorize("hasAnyRole('HR','MANAGER')")
    public ResponseEntity<LeaveRequest> updateLeaveStatus(@PathVariable Long leaveId,
                                                          @RequestParam LeaveStatus status) {
        LeaveRequest updated = leaveService.updateStatus(leaveId, status);
        return ResponseEntity.ok(updated);
    }

    // ✅ HR/MANAGER: View all leave requests (optional)
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('HR','MANAGER')")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        return ResponseEntity.ok(leaveService.getAll());
    }
}
