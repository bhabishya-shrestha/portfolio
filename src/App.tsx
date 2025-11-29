
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
          <Route path="/about" element={<div className="p-8 text-center">About Page (Coming Soon)</div>} />
          <Route path="/projects" element={<div className="p-8 text-center">Projects Page (Coming Soon)</div>} />
          <Route path="/contact" element={<div className="p-8 text-center">Contact Page (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
