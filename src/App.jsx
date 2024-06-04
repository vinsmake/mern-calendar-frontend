import { HashRouter } from "react-router-dom"
import "./index.css"
import { AppRouter } from "./router/AppRouter"
import { Provider } from "react-redux"
import { store } from "./store/store"

export const App = () => {
  return (
    <Provider store={store}>
      <HashRouter basename='/'>
        <AppRouter />
      </HashRouter>
    </Provider>
  )
}