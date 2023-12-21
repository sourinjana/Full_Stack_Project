import React, { useEffect, useState } from 'react'
import {deleteDepartmentbById, listALLDeparments } from '../service/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';

function ListDepartmentComponent(props) {
 const [departments,setDepartments]=useState([]);
 const navigator=useNavigate();

 function getAllDeparments(){
    listALLDeparments().then((response)=>{
        setDepartments(response.data);
    }).catch((err)=>{
        console.error(err);
    })
 }

 useEffect(()=>{
     getAllDeparments();
 },[])


function updateDepartment(id){
      navigator(`/edit-department/${id}`);
}

function removeDepartment(id){
    deleteDepartmentbById(id).then((response)=>{
      getAllDeparments();
    }).catch((err)=>{
      console.error(err);
    })
}


  return (

    <div className='container my-3'>
    <h2 className='text-center'>List of Departments</h2>
    <Link className='btn btn-dark my-3' to='/add-department'>Add Department</Link>
      <table className='table table-striped table-bordered'>
          <thead>
                <tr>
                <th>Department Id</th>
                <th>Department Name</th>
                <th>Department Description</th>
                <th>Actions</th>
                </tr>
  </thead>
  <tbody>
       {
        departments.map(department=>
         <tr key={department.id}>
        <td>{department.id}</td>
        <td>{department.departmentName}</td>
        <td>{department.departmentDescription}</td>
        <td>
          <button className='btn btn-info' onClick={()=> updateDepartment(department.id)}>Update</button>
          <button className='btn btn-danger mx-2' onClick={()=> removeDepartment(department.id)}>Delete</button>
        </td>
         </tr>)
       }
  </tbody>
</table>

    </div>
  )
}

export default ListDepartmentComponent