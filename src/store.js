import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

/* ------------------- PRODUCT SLICE ------------------- */

// Thunk to fetch all products (with localStorage support)
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products");

    // ✅ Save to localStorage for offline use
    localStorage.setItem("cachedProducts", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.warn("⚠️ Backend not reachable. Loading cached products...");

    const cached = localStorage.getItem("cachedProducts");
    if (cached) {
      return JSON.parse(cached);
    } else {
      throw new Error("No backend and no cached data found!");
    }
  }
});

const savedProducts = JSON.parse(localStorage.getItem("cachedProducts")) || [];

const productSlice = createSlice({
  name: "products",
  initialState: {
    vegItems: savedProducts.filter((p) => p.category?.toLowerCase() === "veg"),
    nonVegItems: savedProducts.filter(
      (p) => p.category?.toLowerCase() === "non-veg"
    ),
    chocolateItems: savedProducts.filter(
      (p) => p.category?.toLowerCase() === "chocolate"
    ),
    bakeryItems: savedProducts.filter(
      (p) => p.category?.toLowerCase() === "bakery"
    ),
    milkItems: savedProducts.filter(
      (p) => p.category?.toLowerCase() === "milk"
    ),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;

        // Divide products by category
        state.vegItems = data.filter(
          (p) => p.category?.toLowerCase() === "veg"
        );
        state.nonVegItems = data.filter(
          (p) => p.category?.toLowerCase() === "non-veg"
        );
        state.bakeryItems = data.filter(
          (p) => p.category?.toLowerCase() === "bakery"
        );
        state.milkItems = data.filter(
          (p) => p.category?.toLowerCase() === "milk"
        );
        state.chocolateItems = data.filter(
          (p) => p.category?.toLowerCase() === "chocolate"
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

/* ------------------- CART SLICE ------------------- */
const authData = JSON.parse(localStorage.getItem("authentication"));
const currentUser = authData?.currentUser?.userName;
const savedCart = JSON.parse(localStorage.getItem(`cart_${currentUser}`)) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    loadCart: (state, action) => action.payload,
    addToCart: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    incQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
    },
    decQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) item.quantity -= 1;
      else return state.filter((i) => i.id !== action.payload.id);
    },
    clearCart: () => [],
  },
});

export const {
  addToCart,
  removeFromCart,
  incQuantity,
  decQuantity,
  clearCart,
  loadCart,
} = cartSlice.actions;

/* ------------------- ORDERS SLICE ------------------- */
const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const ordersSlice = createSlice({
  name: "orders",
  initialState: savedOrders,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { addOrder } = ordersSlice.actions;

/* ------------------- AUTH SLICE ------------------- */
const savedAuth = JSON.parse(localStorage.getItem("authentication"));

const authSlice = createSlice({
  name: "authentication",
  initialState: savedAuth || {
    users: [],
    currentUser: null,
    isAuthenticated: false,
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const { userName, password } = action.payload;
      const user = state.users.find(
        (u) => u.userName === userName && u.password === password
      );
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
      } else {
        state.isAuthenticated = false;
        state.currentUser = null;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});
export const { registerUser, loginUser, logoutUser } = authSlice.actions;


/* Search bar slice */
const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload.toLowerCase();
    },
    clearSearchTerm: (state) => {
      state.term = "";
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;


/* ------------------- STORE CONFIGURATION ------------------- */
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    authentication: authSlice.reducer,
    search: searchSlice.reducer,
  },
});

/* ------------------- SUBSCRIPTIONS ------------------- */

// Save cart per user
store.subscribe(() => {
  const state = store.getState();
  const userName = state.authentication?.currentUser?.userName;
  if (userName) {
    localStorage.setItem(`cart_${userName}`, JSON.stringify(state.cart));
  }
});

// Save authentication
store.subscribe(() => {
  localStorage.setItem(
    "authentication",
    JSON.stringify(store.getState().authentication)
  );
});

// Save orders
store.subscribe(() => {
  localStorage.setItem("orders", JSON.stringify(store.getState().orders));
});

export default store;
