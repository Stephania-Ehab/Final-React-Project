import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("../pages/home/home"));
const WatchListPage = lazy(() => import('../pages/watchlist/watchlist'));
const NotfoundPage = lazy(() => import("../pages/notFound/not-found"));
const MovieDetailsPage = lazy (() => import("../pages/movieDetails/movieDetails"))

export default function AppRoute() {
  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/watch_list" element={<WatchListPage />}/>
                <Route path="*" element={<NotfoundPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </Suspense>
    </>
  );
}