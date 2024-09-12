import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home</p>
            </Layout>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Layout>
              <p>search</p>
            </Layout>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
