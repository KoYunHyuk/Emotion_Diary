import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home'
import New from './Pages/New'
import Edit from './Pages/Edit'
import Diary from './Pages/Diary'
import RouteTest from './components/RouteTest'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
        </Routes>
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
