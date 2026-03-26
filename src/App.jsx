import './App.css'
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import InventoryPage from './pages/InventoryPage';
import ShoppingListPage from './pages/ShoppingListPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {


  return (
    <>  
      <Navbar />
      <section id="">
        
      </section>

      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/shopping-list" element={<ShoppingListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  )
}

export default App
