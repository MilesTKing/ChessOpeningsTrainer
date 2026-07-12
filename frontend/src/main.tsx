import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import {getCookie} from './utils/cookies.ts'
import App from './App.tsx'
import Training from './pages/Training.tsx'
import Openings from './pages/Openings.tsx'
import 'normalize.css'
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
async function bootstrap() {
    const csrfUrl= import.meta.env.OPENINGS_API_BASE_URL + import.meta.env.OPENINGS_API_CSRF
    await fetch(csrfUrl, {
            credentials: "include"
    }
    )
    console.log(`csrf: ${getCookie('csrftoken')}`)
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <RouterProvider router={router}></RouterProvider>

        </StrictMode>,
    )
}
bootstrap()