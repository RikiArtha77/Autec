import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Device from '../components/DevicePage'
import Login from '../components/LoginPage'
import App from '../components/App'

const index = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/Device' element={<Device/>}/>
            <Route path='/Login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default index