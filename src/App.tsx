import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./route";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/PrivateRoute/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import ModalDetailTask from "./components/Modal/ModalDetailTask";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ModalDetailTask />
      <Routes>
        {PublicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}

        {PrivateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute>
                <route.element />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
