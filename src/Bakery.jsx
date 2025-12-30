import React, { useEffect, useState } from "react";
import "./Bakery.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Bakery() {
  const dispatch = useDispatch();

  const { bakeryItems, loading, error } = useSelector(
    (state) => state.products
  );

  const searchTerm = useSelector((state) => state.search.term);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Reset page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ✅ SEARCH FIRST
  const filteredBakeryItems = bakeryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <h2>Loading Bakery Items...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!filteredBakeryItems.length)
    return <h3>No matching Bakery Items found 🍔</h3>;

  // ✅ PAGINATION AFTER SEARCH
  const totalPages = Math.ceil(filteredBakeryItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredBakeryItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // ✅ Bakery list
  const bakeryListItems = currentItems.map((product) => (
    <li key={product.id}>
      <img src={product.imgUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <strong>₹{product.price}</strong>
      <p>{product.description}</p>
      <button
        onClick={() => {
          dispatch(addToCart(product));
          toast.success(`${product.name} added to cart 🛒`);
        }}
      >
        Add To Cart
      </button>
    </li>
  ));

  // ✅ Pagination buttons
  const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        margin: "5px",
        fontWeight: currentPage === index + 1 ? "bold" : "normal",
      }}
      className="pagenation-buttons"
    >
      {index + 1}
    </button>
  ));

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="bakery-container">
        <h1 className="bakery-head">
          🍔 <span>Bakery Items</span>
        </h1>

        <ul className="item mt-5">{bakeryListItems}</ul>

        {/* Pagination */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="previous-button"
          >
            ⏪ Prev
          </button>

          <div>{paginationButtons}</div>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="next-button"
          >
            Next ⏩
          </button>
        </div>
      </div>
    </>
  );
}

export default Bakery;
