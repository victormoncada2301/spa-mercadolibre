import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBox from './components/Global/SearchBox/SearchBox';
import SearchResults from './components/Pages/SearchResults/SearchResults';
import ProductDetail from './components/Pages/ProductDetail/ProductDetail';
import Home from './components/Global/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <SearchBox />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/items/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
