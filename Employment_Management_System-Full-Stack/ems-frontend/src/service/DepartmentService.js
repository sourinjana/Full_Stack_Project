import axios from "axios";

const REST_DEPT_URl="http://localhost:8080/api/departments";

export const listALLDeparments =()=> axios.get(REST_DEPT_URl);

export const createDepartments=(department)=>axios.post(REST_DEPT_URl,department);

export const getDepartmentbById=(departmentId)=>axios.get(REST_DEPT_URl +'/'+ departmentId);

export const updateDepartmentbById=(departmentId,department)=>axios.put(REST_DEPT_URl +'/'+ departmentId,department);

export const deleteDepartmentbById=(departmentId)=>axios.delete(REST_DEPT_URl +'/'+ departmentId);
