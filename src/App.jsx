import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';
import RoomCreatePage from './pages/RoomCreate';
import RoomJoinPage from './pages/RoomJoin';
import RoomJoin2Page from './pages/RoomJoin2';
import TestPage from './pages/test';
import TodoContainer from './pages/testCreateDivs';

/*
const router = createBrowserRouter([
  { path: '/', 
    basename: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element:<HomePage/> },
      { path: '/room-create', element:<RoomCreatePage/> },
      { path: '/room-join/:roomId', element:<RoomJoinPage/> },
      { path: '/room-join2/:roomId', element:<RoomJoin2Page/> },
      { path: '/test', element:<TestPage/> },
      { path: '/todo', element:<TodoContainer/> },
      { path: '/products', element:<ProductsPage/> },
      { path: '/products/:productId', element:<ProductDetailPage/> },
    ]
  },
  
  { path: '/room',
    basename: "/room", 
    children: [
      { path: '/room/room-join/:roomId', element:<RoomJoin2Page/> },
    ]
  },
]);
*/
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route index element={<HomePage />} />
      <Route path="room-create" element={<RoomCreatePage />} />
      <Route path="room-join/:roomId" element={<RoomJoin2Page />} />
    </Route>
  )
)

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
