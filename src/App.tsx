import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// We will create these shortly
import SakayCaseStudy from './pages/SakayCaseStudy';
import BibwakCaseStudy from './pages/BibwakCaseStudy';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f4f4f4] font-sans selection:bg-white selection:text-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-study/sakay" element={<SakayCaseStudy />} />
          <Route path="/case-study/bibwak" element={<BibwakCaseStudy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
