import Register from './components/forms/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './index.css';
import Sign from './components/forms/Sign';
import Login from './components/forms/Login';
import Navbar from './components/Navbar';
import Terms from './components/Terms';
import Dashboard from './components/admin/Dashboard';
import AdminView from './components/admin/AdminView';
import EditProfile from './components/forms/EditProfile';
import EditMOU from './components/forms/EditMOU';
import MOU from './components/MOU';
import EditShopFromAdmin from './components/forms/EditShopFromAdmin';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/ed/pr' element={<EditProfile />} />
          <Route exact path='/ed/mou' element={<EditMOU />} />
          <Route exact path='/v/fin' element={<Sign />} />
          <Route exact path='/v/tc' element={<Terms />} />
          <Route exact path='/ad/pt/pdf' element={<AdminView />} />
          <Route exact path='/ad/dsh/' element={<Dashboard />} />
          <Route exact path='/v/pt/pdf' element={<MOU />} />
          <Route exact path='/ad/ed/sh' element={<EditShopFromAdmin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;