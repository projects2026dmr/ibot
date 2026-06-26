import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import WojewodztwoPage from "./pages/WojewodztwoPage";
import PowiatPage from "./pages/PowiatPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/wojewodztwo/:wojSlug" element={<WojewodztwoPage />} />
          <Route path="/miasto/:slug" element={<MiastoPage />} />
          <Route path="/powiat/:powiatSlug" element={<PowiatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
