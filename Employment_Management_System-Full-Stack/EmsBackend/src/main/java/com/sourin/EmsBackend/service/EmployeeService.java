package com.sourin.EmsBackend.service;

import com.sourin.EmsBackend.dto.EmployeeDto;
import com.sourin.EmsBackend.entity.Department;
import com.sourin.EmsBackend.entity.Employee;
import com.sourin.EmsBackend.exception.ResourceNotFoundException;
import com.sourin.EmsBackend.repository.DepartmentRepository;
import com.sourin.EmsBackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
      @Autowired
      EmployeeRepository employeeRepository;
      @Autowired
      DepartmentRepository departmentRepository;
      public String createEmployee(Employee employee) {
            Department department=departmentRepository.findById(employee.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department is not found : "+employee.getDepartmentId()));
            if(department!=null){
               employee.setDepartment(department);
                  employeeRepository.save(employee);
                  return "Employee Save";
            }

            return "Employee not Save";

      }

      public ResponseEntity<Employee> findEmployee(Long id) {
            Employee employee=employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is not found : "+id));

            return ResponseEntity.ok(employee);
      }

      public List<Employee> findAllEmployee() {
            return employeeRepository.findAll();
      }

      public String UpdateEmployee(Long id, Employee employee) {
            Employee findEmployee=employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is not found : "+id));
            Department department=departmentRepository.findById(employee.getDepartmentId()).orElseThrow(() -> new ResourceNotFoundException("Department is not found : "+employee.getDepartmentId()));

            if(findEmployee!=null && department!=null){
                  findEmployee.setFirstName(employee.getFirstName());
                  findEmployee.setLastName(employee.getLastName());
                  findEmployee.setEmail(employee.getEmail());
                  findEmployee.setDepartment(department);
                  employeeRepository.save(findEmployee);
                  return "Update Done";
            }

            return "Employee is not found : " +id;

      }

      public String DeleteEmployee(Long id) {
            Employee findEmployee=employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is not found : "+id));
            if(findEmployee!=null){
                  employeeRepository.delete(findEmployee);
                  return "Delete done";
            }
            return "Employee is not found : " +id;
      }
}
