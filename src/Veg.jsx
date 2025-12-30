import React, { useEffect, useState } from "react";
import "./veg.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Veg() {
  const dispatch = useDispatch();

  const { vegItems, loading, error } = useSelector((state) => state.products);

  const searchTerm = useSelector((state) => state.search.term);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Fetch products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ✅ SEARCH (filter first)
  const filteredVegItems = vegItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ PAGINATION (after filtering)
  const totalPages = Math.ceil(filteredVegItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredVegItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (loading) return <h2>Loading Veg Items...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!filteredVegItems.length) return <h3>No matching Veg Items found 😞</h3>;

  // ✅ Render items
  const vegListItems = currentItems.map((product) => (
    <li key={product.id}>
      <img src={product.imgUrl} alt="no image" />
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
      className="pagenation-buttons"
      style={{
        fontWeight: currentPage === index + 1 ? "bold" : "normal",
      }}
    >
      {index + 1}
    </button>
  ));

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="veg-container">
        <h1 className="veg-head">
          🥗 <span>Veg Items</span>
        </h1>

        <ul className="item mt-5">{vegListItems}</ul>

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

export default Veg;
