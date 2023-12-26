import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { router } from "@/common/routes/routes";
import { store } from "@/services/store/store";
import ReactDOM from "react-dom/client";

import "./styles/index.scss";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
