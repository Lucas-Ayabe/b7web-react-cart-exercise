import { Layout, Cart, ProductCard } from "./components";
import { useProducts } from "./hooks";

function App() {
  const [products, addToCart] = useProducts([
    {
      id: 1,
      name: "Teclado",
      quantity: 1,
      price: 28,
    },
    {
      id: 2,
      name: "Mouse",
      quantity: 5,
      price: 36,
    },
    {
      id: 3,
      name: "Monitor",
      quantity: 3,
      price: 299.99,
    },
    {
      id: 4,
      name: "CPU",
      quantity: 2,
      price: 1099,
    },
  ]);

  return (
    <Layout>
      <section className="auto-grid flex-3">
        {products.list.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAdd={() => addToCart(product.id)}
          />
        ))}
      </section>

      <Cart items={products.inCart} />
    </Layout>
  );
}

export default App;
