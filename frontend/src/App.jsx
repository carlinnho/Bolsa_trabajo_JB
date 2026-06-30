import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <Outlet />{" "}
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<div className="p-10 text-center">Página Principal</div>}
          />
        </Route>

        <Route
          path="/login"
          element={
            <main className="min-h-screen bg-slate-50">
              <Login />
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
