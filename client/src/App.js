
import { MainBar } from './navigations/mainbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Signin} from './components/signin'
import { Signup } from './components/signup';
import { AdminDashboard } from './components/admin/admin_dashboard';
import { OwnerDashboard } from './components/owner/owner_dashboard';
import { RenterDashboard } from './components/renter/renter_dashboard';
import { Home } from './components/home'
import { ViewBooks } from './components/admin/view_books';
import { ApproveBooks } from './components/admin/approve_books';
import {OwnerBookUpload} from './components/owner/owner_book_upload';
import { ViewUsers } from './components/admin/view_users';
import { ApproveRent } from './components/admin/approve_rent';
import { RenterBooks } from './components/renter/renter_books';
import { OwnerViewBooks } from './components/owner/owner_view_books';
import { RenterRents } from './components/renter/renter_rents';


function App() {

  return (
    <BrowserRouter>
    <MainBar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            <Route path='/admin/books' element={<ViewBooks/>}/>
            <Route path='/admin/approve/books' element={<ApproveBooks/>}/>
            <Route path='/admin/renters' element={<ApproveRent/>}/> 
            <Route path='/admin/users' element={<ViewUsers/>}/>
            <Route path='/owner/dashboard' element={<OwnerDashboard/>}/>
            <Route path='/owner/bookupload' element={<OwnerBookUpload/>}/>
            <Route path='/owner/viewbooks' element={<OwnerViewBooks/>}/>
            <Route path='/renter/dashboard' element={<RenterDashboard/>}/>
            <Route path='/renter/books' element={<RenterBooks/>}/>
            <Route path='/renter/rents' element={<RenterRents/>}/>
        </Routes> 
    </BrowserRouter>
  );
}

export default App;
