import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import './App.css'

function App() {
  return (
    <Router>
      <div className="bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
