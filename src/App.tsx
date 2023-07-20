import WebStockProvider from './context/WebSocketProvider';
import Home from './pages/home/Home';

const App = () => {
  return (
    <WebStockProvider>
      <Home />
    </WebStockProvider>
  );
};

export default App;
