package com.sourin.EmsBackend.service;

import com.sourin.EmsBackend.entity.Department;
import com.sourin.EmsBackend.exception.ResourceNotFoundException;
import com.sourin.EmsBackend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    DepartmentRepository departmentRepository;
    public ResponseEntity<String> createDepartment(Department department) {
        departmentRepository.save(department);
        return ResponseEntity.ok("Save Done");

    }

    public ResponseEntity<Department> findDepartment(Long id) {
        Department department=departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is not found : "+id));
        return ResponseEntity.ok(department);
    }

    public List<Department> findAllDepartment() {
        List<Department> departmentList=departmentRepository.findAll();
        return departmentList;
    }

    public ResponseEntity<String> updateDepartment(Long id, Department department) {

        Department finddepartment=departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is not found : "+id));
           if(finddepartment!=null){
               finddepartment.setDepartmentName(department.getDepartmentName());
               finddepartment.setDepartmentDescription(department.getDepartmentDescription());

               departmentRepository.save(finddepartment);
               return ResponseEntity.ok("Update Done");
           }

        return ResponseEntity.ok("Id Not found");

    }

    public ResponseEntity<String> deleteDepartment(Long id) {

        Department finddepartment=departmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is not found : "+id));
        if(finddepartment!=null){

            departmentRepository.delete(finddepartment);
            return ResponseEntity.ok("Delete Done");
        }

       return ResponseEntity.ok("Id Not found");
    }
}
