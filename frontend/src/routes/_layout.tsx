import { createFileRoute, Outlet } from "@tanstack/react-router"
import Navbar from "../components/Common/Navbar"
import Footer from "../components/Common/Footer"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => { },
})

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
