import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployess } from '../service/EmployeeService';
import { useNavigate } from 'react-router-dom';
function ListEmployeeComponent() {
    const [employees,setEmployess]=useState([]);
    const navigator=useNavigate();
    function getAllEmployee() {
      listEmployess().then((responce)=>{
        setEmployess(responce.data);
       }).catch((err)=>{
        console.error(err);
       })
    }
    useEffect(()=>{
       getAllEmployee()
    },[])


    
   function newAddEmployee(){
       navigator("/add-employee");
   }

   function updateEmployee(id){
    navigator(`/edit-employee/${id}`);
   }
   function removeEmployee(id){
       deleteEmployee(id).then((responce)=>{
             getAllEmployee();
       }).catch((err)=>{
        console.error(err);
       })
   }
  return (
    <div className='container my-3'>
    <h2 className='text-center'>List of Employees</h2>
    <button className='btn btn-dark my-3' onClick={newAddEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered'>
          <thead>
                <tr>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
                </tr>
  </thead>
  <tbody>
       {
        employees.map(employee=>
         <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.email}</td>
        <td>
          <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>
          <button className='btn btn-danger mx-2' onClick={()=> removeEmployee(employee.id)}>Delete</button>
        </td>
        
         </tr>)
       }
  </tbody>
</table>

    </div>
  )
}

export default ListEmployeeComponent