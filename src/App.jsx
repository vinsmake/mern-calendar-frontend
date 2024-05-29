import { HashRouter } from "react-router-dom"
import "./index.css"
import { AppRouter } from "./router/AppRouter"

export const App = () => {
  return (
    <HashRouter basename='/'>
      <AppRouter />
    </HashRouter>
  )
}