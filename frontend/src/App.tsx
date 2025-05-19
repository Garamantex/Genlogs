import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import './App.css'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
