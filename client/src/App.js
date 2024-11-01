import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBox from './components/SearchBox/SearchBox';
import SearchResults from './components/SearchResults/SearchResults';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <SearchBox />
        <Routes>
          <Route path="/" element={<SearchResults />} />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/items/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
