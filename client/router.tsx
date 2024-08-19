/* eslint-disable react/jsx-key */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import { NewBook } from './components/NewBook'
import FindBook from './components/FindBook'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="NewBook" element={<NewBook />} />
      <Route path="FindBook" element={<FindBook />} />
    </Route>,
  ),
)

export default router
