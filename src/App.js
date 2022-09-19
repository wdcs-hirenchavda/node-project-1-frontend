import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import './App.css';
import AddProduct from './component/AddProduct';
import Footer from './component/Footer';
import Login from './component/Login';
import Nav1 from './component/Nav1';
import PrivateComponent from './component/PrivateComponent';
import Products from './component/Products';
import Signup from './component/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateProduct from './component/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav1/>
        <Routes>

          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<Products/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update/:Id" element={<UpdateProduct/>} />
          <Route path="/logout" element={<Products/>} />
          <Route path="/profile" element={<Products/>} />
          </Route>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />

        </Routes>
         {/* <Footer/>  */}
      </BrowserRouter>
    </div>
  );
}

export default App;
