import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';
import RoomCreatePage from './pages/RoomCreate';
import RoomJoinPage from './pages/RoomJoin';

const router = createBrowserRouter([
  { path: '/', 
    basename: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element:<RoomCreatePage/> },
      { path: '/room-create', element:<RoomCreatePage/> },
      { path: '/products/:productId', element:<ProductDetailPage/> },
    ]
  },
  
  { path: '/room',
    basename: "/room", 
    children: [
      { path: '/room/room-join/:roomId', element:<RoomJoinPage/> },
    ]
  },
]);

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
