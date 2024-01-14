import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'

const App = () => {
  return( 
    <Router>
      <Header />
      <Home />
      <Footer />
    </Router>
  )
}

export default App;
