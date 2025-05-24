import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
  </ThemeProvider>
)
