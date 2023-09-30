import {createBrowserRouter} from "react-router-dom"
import {ErrorPage} from "../pages/ErrorPage/ErrorPage"
import {RootLayout} from "../layouts/RootLayout"
import {ListPage} from "../pages/ListPage/ListPage"
import {HeroPage} from "../pages/HeroPage/HeroPage"
import {EditPage} from "../pages/EditPage/EditPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ListPage />,
      },
      {
        path: "/superhero/:id",
        element: <HeroPage />,
      },
      {
        path: "/superhero/:id/edit",
        element: <EditPage />,
      },
    ],
  },
])
