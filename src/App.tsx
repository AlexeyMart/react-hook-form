import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./constants";
import { YouTubeForm } from "./components/YouTubeForm/YouTubeForm";
import { YupForm } from "./components/YupForm/YupForm";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<Layout />}>
        <Route index element={<YouTubeForm />} />

        <Route path={AppRoutes.Form} element={<YouTubeForm />} />

        <Route path={AppRoutes.YupForm} element={<YupForm />} />
      </Route>
    </Routes>
  );
}

export default App;
