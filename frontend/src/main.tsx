import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App.tsx'
import Training from './Training.tsx'
import Pathway from './Pathway.tsx'
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
        path: 'pathway',
        element: <Pathway/>,
    }
    ]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>

  </StrictMode>,
)
