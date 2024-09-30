import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"
import "./index.css";
import axios from "axios";

import { StrictMode } from "react"
import { OpenAPI } from "./client"

OpenAPI.BASE = import.meta.env.VITE_API_URL
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {};
// TODO : REVERT THIS
axios.defaults.params["api_key"] =  "2be5ab439dc393ba1ff75995066bc1b0";


const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  </StrictMode>,
)
