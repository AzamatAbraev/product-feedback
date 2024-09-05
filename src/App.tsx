import { createBrowserRouter, RouterProvider } from "react-router-dom"

import FeedbackDetailPage from "./pages/feedback-detail/FeedbackDetailPage"
import FeedbackEditPage from "./pages/feedback-edit/FeedbackEditPage"
import FeedbackNewPage from "./pages/feedback-new/FeedbackNewPage"
import NotFoundPage from "./pages/not-found/NotFoundPage"
import SuggestionsPage from "./pages/suggestions/SuggestionsPage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <SuggestionsPage />,
    errorElement: <NotFoundPage />
  }, {
    path: "/feedback/:feedbackId",
    element: <FeedbackDetailPage />
  },
  {
    path: "/feedback/new",
    element: <FeedbackNewPage />
  },
  {
    path: "/feedback/edit/:feedbackId",
    element: <FeedbackEditPage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
