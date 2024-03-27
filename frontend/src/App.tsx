import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Organisation from "./pages/Organisation";
import Booking from "./pages/Booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/create-organization" element={<Organisation />} />
          <Route path="/organization/:organizationId" element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
