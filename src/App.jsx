import './App.css';
import Pages from './Pages/Pages';
import Categories from './Components/Categories';
import { BrowserRouter } from 'react-router-dom';
import Search from './Components/Search';

function App() {

  return (
    <BrowserRouter>
      <Search/>
      <Categories/>
      <Pages/>
    </BrowserRouter>
  )
}

export default App
