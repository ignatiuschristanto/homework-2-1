import './App.css';
import HomePage from './pages/home';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <HomePage />  
      </div>
    </Provider>
  );
}

export default App;
