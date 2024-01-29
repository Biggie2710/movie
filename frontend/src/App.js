import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import View from './component/View';
import Wishlist from './component/Wishlist';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/view' element={<View />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
