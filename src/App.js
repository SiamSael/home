import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return( 
    <Router>
      <Header />
      <Footer />
    </Router>
  )
}

export default App;
