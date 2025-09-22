import React, { Suspense, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SkeletonLoadingPage from "./components/LoadingPage";
import Formations from "./pages/Formations";
import Apropos from "./pages/Apropos";
import Financement from "./pages/Financement";
import Cfa from "./pages/Cfa";
import Support from "./pages/Support";
import FormationDetails from "./pages/FormationDetails";
import Contact from "./pages/Contact";

const Home = React.lazy(() => import("./pages/Home"));

const App: React.FC = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimer);
  }, [location]);

  const LoadingFallback = () => {
    return isLoading ? <SkeletonLoadingPage /> : null;
  };

  return (
    <Suspense fallback={<><Header navigation={true} /> <main id="main" ref={mainRef}><LoadingFallback /></main></>}>
      <Routes>
        <Route path="/" element={<><Header navigation={true} /> <main id="main" ref={mainRef}><Home /><Footer /></main></>} />
        <Route path="/formations" element={<><Header navigation={false} /> <main id="main" ref={mainRef}><Formations /><Footer /></main></>} />
        <Route path="/formations/:id" element={<> <Header navigation={false} /> <main id="main" ref={mainRef}><FormationDetails /><Footer /></main></>} />
        <Route path="/apropos" element={<><Header navigation={false} /> <main id="main" ref={mainRef}><Apropos /><Footer /></main></>} />
        <Route path="/financement" element={<><Header navigation={true} /> <main id="main" ref={mainRef}><Financement /><Footer /></main></>} />
        <Route path="/cfa" element={<><Header navigation={true} /> <main id="main" ref={mainRef}><Cfa /><Footer /></main></>} />
        <Route path="/support" element={<><Header navigation={true} /> <main id="main" ref={mainRef}><Support /><Footer /></main></>} />
        <Route path="/contact" element={<><Header navigation={true} /> <main id="main" ref={mainRef}><Contact /><Footer /></main></>} />
        <Route path="*" element={<><Header navigation={false} /> <main id="main" ref={mainRef}><Formations /><Footer /></main></>} />
      </Routes>
    </Suspense>
  );
};

export default App;