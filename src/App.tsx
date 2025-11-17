import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chapter1 from './pages/Chapter1';
import Chapter2 from './pages/Chapter2';
import Chapter3 from './pages/Chapter3';
import Chapter4 from './pages/Chapter4';
import Chapter5 from './pages/Chapter5';
import Chinchirorin from './pages/Chinchirorin';
import ClawMachine from './pages/ClawMachine';
import SlotMachine from './pages/SlotMachine';
import Janken from './pages/Janken';
import RainWalk from './pages/RainWalk';
import SurvivorBias from './pages/SurvivorBias';
import AncestorProbability from './pages/AncestorProbability';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter1" element={<Chapter1 />} />
        <Route path="/chapter2" element={<Chapter2 />} />
        <Route path="/chapter3" element={<Chapter3 />} />
        <Route path="/chapter4" element={<Chapter4 />} />
        <Route path="/chapter5" element={<Chapter5 />} />
        <Route path="/chinchirorin" element={<Chinchirorin />} />
        <Route path="/claw-machine" element={<ClawMachine />} />
        <Route path="/slot-machine" element={<SlotMachine />} />
        <Route path="/janken" element={<Janken />} />
        <Route path="/rain-walk" element={<RainWalk />} />
        <Route path="/survivor-bias" element={<SurvivorBias />} />
        <Route path="/ancestor-probability" element={<AncestorProbability />} />
      </Routes>
    </Layout>
  );
}

export default App;
