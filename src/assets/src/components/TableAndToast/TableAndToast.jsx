import { useEffect, useRef, useState } from "react";

const TableAndCart = () => {
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const cardId = useRef({});

  const AddToCart = (product) => {
    setCartList((prev) => {
      if (prev.some((cart) => cart.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });

    cardId.current.id = setTimeout(() => {
      handleClose(product);
    }, 3000);

    return () => clearTimeout(cardId.current);
  };

  const handleClose = (product) => {
    const value = product.id;
    setCartList((prev) => prev.filter((item) => item.id !== product.id));
    clearTimeout(cardId.current[value]);
    delete cardId.current[value];
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>category</th>
              <th>description</th>
              <th>price</th>
              <th>Cart</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() => AddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          right: "20px",
          top: "20px",
          gap: "10px",
        }}
      >
        {cartList.map((item) => {
          return (
            <div
              style={{
                color: "white",
                padding: "8px 12px",
                backgroundColor: "red",
                borderRadius: "5px",
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableAndCart;
