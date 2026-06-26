import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.tsx'
import Training from './pages/Training.tsx'
import Openings from './pages/Openings.tsx'
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: 'training',
        element: <Training/>,
    },
    {
        path: 'openings',
        element: <Openings/>,
    }
    ]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>

  </StrictMode>,
)