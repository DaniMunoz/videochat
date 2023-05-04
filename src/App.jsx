import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import RoomCreatePage from './pages/RoomCreate';
import RoomJoinPage from './pages/RoomJoin';
import RoomJoin2Page from './pages/RoomJoin2';

const router = createBrowserRouter([
  { path: '/', 
    basename: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element:<RoomCreatePage/> },
      { path: '/room-create', element:<RoomCreatePage/> },
    ]
  },
  
  { path: '/room',
    basename: "/room", 
    children: [
      { path: '/room/room-join/:roomId', element:<RoomJoinPage/> },
      { path: '/room/room-join2/:roomId', element:<RoomJoin2Page/> },
    ]
  },
]);

function App() {
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App
