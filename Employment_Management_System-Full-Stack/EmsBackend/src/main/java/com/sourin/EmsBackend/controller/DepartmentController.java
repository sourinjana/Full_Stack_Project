package com.sourin.EmsBackend.controller;

import com.sourin.EmsBackend.entity.Department;
import com.sourin.EmsBackend.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;
    @PostMapping
    public ResponseEntity<String> createDepartment(@RequestBody Department department){
        return departmentService.createDepartment(department);
    }

    @GetMapping("{id}")
    public ResponseEntity<Department> findDepartment(@PathVariable Long id){
        return departmentService.findDepartment(id);
    }

    @GetMapping
    public List<Department> findAllDepartment(){
        return departmentService.findAllDepartment();
    }

    @PutMapping("{id}")
    public ResponseEntity<String> updateDepartment(@PathVariable Long id,@RequestBody Department department){
        return departmentService.updateDepartment(id,department);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id){
        return departmentService.deleteDepartment(id);
    }



}
