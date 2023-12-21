import './App.css'
import DepartmentComponent from './components/DepartmentComponent'
import EmployeeComponent from './components/EmployeeComponent'
import HeaderComponents from './components/HeaderComponents'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <> 
       <BrowserRouter>
        <HeaderComponents/>
        <Routes>
        <Route path='/' element={<ListEmployeeComponent/>}></Route>
        </Routes>
        <Routes>
          <Route path='/' element={<ListDepartmentComponent/>}></Route>
        </Routes>
        <Routes>
          <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>

          <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
          <Route path='/departments' element={<ListDepartmentComponent/>}></Route>

          <Route path='/add-department' element={<DepartmentComponent/>}></Route>

          <Route path='/edit-department/:id' element={<DepartmentComponent/>}></Route>

        </Routes>

          
        </BrowserRouter>
      
    </>
  )
}

export default App
