import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { useNavigate,useParams } from 'react-router-dom';
import { listALLDeparments } from '../service/DepartmentService';

function EmployeeComponent() {

    const [firstName,setFirstname]=useState('');
    const [lastName,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [departmentId,setDepartmentId]=useState('');
    const [departments,setDepartments]=useState([]);

    const {id}=useParams();

    useEffect(()=>{
      listALLDeparments().then((response)=>{
           setDepartments(response.data);
      }).catch((err)=>{
        console.error(err);
      })
        
    },[])

    const [errors,setErrors]=useState({
          firstName:'',
          lastName:'',
          email:'',
          departments:''
    });

    

    const navigator=useNavigate();

    useEffect(()=>{
      
      if(id){
        getEmployee(id).then((response)=>{
            setFirstname(response.data.firstName);
            setLastname(response.data.lastName);
            setEmail(response.data.email);
        }).catch((err)=>{
          console.error(err);
        })
      }


    },[id])
   
    function saveAndUpdateEmploye(e){
        e.preventDefault();

  if (validateForm()) {
          const employe={firstName,lastName,email,departmentId}


       if(id){
             
           updateEmployee(id,employe).then((response)=>{
          console.log(response.data);
          navigator('/employees');
           }).catch((err)=>{
          console.error(err);
             })
         }else{
            
        createEmployee(employe).then((response)=>{
          console.log(response.data);
          navigator('/employees');
           }).catch((err)=>{
            console.error(err);
             })
        }
        

        }
        
    }

    function validateForm(){
      let valid=true;

      const errorsCopy={... errors};
      if (firstName.trim()) {
         errorsCopy.firstName='';
      }else{
        errorsCopy.firstName='First name is required';
        valid=false;
      }

      if (lastName.trim()) {
        errorsCopy.lastName='';
     }else{
       errorsCopy.lastName='Last name is required';
       valid=false;
     }
     
     if (email.trim()) {
      errorsCopy.email='';
      }else{
     errorsCopy.email='Email is required';
     valid=false;
       }

       if (departmentId) {
        errorsCopy.departments='';
       } else {
         errorsCopy.departments='Department is required';
         valid=false;

       }

        setErrors(errorsCopy);
       return valid;

    }

    function pageTitle(){
          if(id){
            return <h2 className='text-center'>Update Employee</h2>
          }else{
            return <h2 className='text-center'>Add Employee</h2>
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
                        <label className='form-label'>First Name</label>
                        <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName?'is-invalid':''}`}
                                onChange={(e) => setFirstname(e.target.value)}
                            >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Last Name</label>
                        <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName?'is-invalid':''}`}
                                onChange={(e) => setLastname(e.target.value)}
                            >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Email Id</label>
                        <input
                                type='email'
                                placeholder='Enter Employee Email Id'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email?'is-invalid':''}`}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                    </div>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Select Department</label>
                        <select
                                value={departmentId}
                                className={`form-control ${errors.departments?'is-invalid':''}`}
                                onChange={(e) => setDepartmentId(e.target.value)}
                            >
                              <option value="Select Department">Select Department</option>
                              {
                                departments.map(department=>
                                  <option key={department.id} value={department.id}>{department.departmentName}</option>
                                  
                                  )
                              }
                            </select>
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                    </div>
                    <button className="btn btn-success my-3" onClick={saveAndUpdateEmploye}>Sumbit</button>

                 </form>


               </div>
             
             
             
             </div>

        </div>
    </div>
  )
}

export default EmployeeComponent