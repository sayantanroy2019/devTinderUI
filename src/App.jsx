import Body from './Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
 

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body />} />
         

      </Routes>

    </BrowserRouter>


  )
      
}

export default App;
