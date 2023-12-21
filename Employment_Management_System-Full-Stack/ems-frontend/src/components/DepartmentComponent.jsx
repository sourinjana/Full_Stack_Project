import React, { useEffect, useState } from 'react'
import { createDepartments, getDepartmentbById, updateDepartmentbById } from '../service/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

function DepartmentComponent() {

  const [departmentName,setDerparmentNeme]=useState('');

  const [departmentDescription,setDerpartmentDescription]=useState('');
  const [errors,setErrors]=useState({
    departmentName:'',
    departmentDescription:''
});
const {id}=useParams();
const navigator=useNavigate();

useEffect(()=>{

  getDepartmentbById(id).then((response)=>{
    setDerparmentNeme(response.data.departmentName);
    setDerpartmentDescription(response.data.departmentDescription);
  }).catch((err)=>{
    console.error(err);
  })

},[id])



function validateForm(){
  let valid=true;

  const errorsCopy={... errors};
  if (departmentName.trim()) {
     errorsCopy.departmentName='';
  }else{
    errorsCopy.departmentName='Department name is required';
    valid=false;
  }

  if (departmentDescription.trim()) {
    errorsCopy.departmentDescription='';
 }else{
   errorsCopy.departmentDescription='Department Description is required';
   valid=false;
 }

    setErrors(errorsCopy);
   return valid;

}
function saveAndUpdateDepartment(e){
  e.preventDefault();
        if (validateForm()) {
          const department={departmentName,departmentDescription}


          if(id){
            updateDepartmentbById(id,department).then((response)=>{
              console.log(response.data);
              navigator('/departments')
            }).catch((err)=>{
              console.log(err);
            })
          }else{
            createDepartments(department).then((response)=>{
              console.log(response.data);
              navigator('/departments')
            }).catch((err)=>{
              console.log(err);
            })

          }

     

    }

    
     
}

function pageTitle(){
  if(id){
    return <h2 className='text-center'>Update Department</h2>
  }else{
    return <h2 className='text-center'>Add Department</h2>
  }
}


  
  return (

    <div className='container'>
        <div className='row'>
           <div className="card col-md-6 offset-md-3 my-5">
           {
            pageTitle()
           }
            <div className="card-body">

                 <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Department Name</label>
                        <input
                                type='text'
                                placeholder='Enter Department Name'
                                name='departmentName'
                                value={departmentName}
                                className={`form-control ${errors.departmentName ?'is-invalid':''}`}
                                onChange={(e) => setDerparmentNeme(e.target.value)}
                            >
                            </input>
                             {errors.departmentName && <div className='invalid-feedback'>{errors.departmentName}</div>} 
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Department Description</label>
                        <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='departmentDescription'
                                value={departmentDescription}
                                className={`form-control ${errors.departmentDescription ?'is-invalid':''}`}
                                onChange={(e) => setDerpartmentDescription(e.target.value)}
                            >
                            </input>
                             {errors.departmentDescription && <div className='invalid-feedback'>{errors.departmentDescription}</div>} 
                    </div>
      
                    <button className="btn btn-success my-3" onClick={(e)=>saveAndUpdateDepartment(e)}>Sumbit</button>

                 </form>


               </div>
             
             
             
             </div>

        </div>
    </div>
 )
}

export default DepartmentComponent