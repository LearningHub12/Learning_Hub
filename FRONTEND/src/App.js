import Login from './Component/Login/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './Component/Register/Register';
import Home from './Component/Home/Home';
import Form from './Component/Form/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/form' element={<Form/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
