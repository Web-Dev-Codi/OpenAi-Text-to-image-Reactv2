import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {


  return (
    <div className="flex flex-col justify-between mx-auto">
      <NavBar />
      <main className="container h-screen mx-auto">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
