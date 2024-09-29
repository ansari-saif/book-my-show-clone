import { createFileRoute } from "@tanstack/react-router"
import Navbar from "../components/Common/Navbar"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => { },
})

function Layout() {
  return (
    <>
      <Navbar />
    </>
  )
}
