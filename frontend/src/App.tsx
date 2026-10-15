import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./hooks/AuthProvider";
import { WishlistProvider } from "./hooks/WishlistProvider";
import { CartProvider } from "./features/cart/context/CartProvider";


function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
         <AppRoutes />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;