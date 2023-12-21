package com.sourin.EmsBackend.dto;

import com.sourin.EmsBackend.entity.Department;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {

    private Long id;
    private String firstName;

    private String lastName;

    private String email;
    private Long departmentId;
}
