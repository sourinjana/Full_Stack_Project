package com.sourin.EmsBackend.controller;

import com.sourin.EmsBackend.dto.EmployeeDto;
import com.sourin.EmsBackend.entity.Employee;
import com.sourin.EmsBackend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {


  @Autowired
  EmployeeService employeeService;


  @PostMapping
  public String createEmployee(@RequestBody Employee employee){
    return employeeService.createEmployee(employee);

  }

  @GetMapping("{id}")
  public ResponseEntity<Employee> findEmployee(@PathVariable Long id){
    return employeeService.findEmployee(id);
  }

  @GetMapping
  public List<Employee> findAllEmployee(){
    return employeeService.findAllEmployee();
  }

  @PutMapping("{id}")
  public String UpdateEmployee(@PathVariable Long id,@RequestBody Employee employee){
    return employeeService.UpdateEmployee(id,employee);
  }

  @DeleteMapping("{id}")
  public String DeleteEmployee(@PathVariable Long id){
    return employeeService.DeleteEmployee(id);
  }
}


