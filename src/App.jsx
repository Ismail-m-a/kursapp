import Navbar from './components/navbarcomponent/Navbar';
import BookSearch from './components/productcomponent/BookSearch';
import BookList from './components/productcomponent/BookList';
import BestSeller from './components/productcomponent/BestSeller';
import './App.css'


function App() {
  return (
    <>
      <Navbar />  {/* Endast Navbar-komponenten visas */}
      {/* Endast Produktlista-komponenten visas */}
      <BookSearch /> 
      <BestSeller />
      <BookList /> {/* Endast Boklista-komponenten visas */}
      
    </>
  );
}

export default App;
