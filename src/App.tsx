import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { NavBar } from './components/NavBar'


function App() {

  return (
    <div className="d-flex flex-column  min-vh-100">
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      <footer className="mt-auto d-flex justify-content-center">List Items Demo 2023</footer>
    </div>
  )
}

export default App
