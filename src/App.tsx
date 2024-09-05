import { createBrowserRouter, RouterProvider } from "react-router-dom"

import SuggestionsPage from "./pages/suggestions/SuggestionsPage"
import FeedbackDetailPage from "./pages/feedback-detail/FeedbackDetailPage"
import FeedbackNewPage from "./pages/feedback-new/FeedbackNewPage"
import FeedbackEditPage from "./pages/feedback-edit/FeedbackEditPage"
import NotFoundPage from "./pages/not-found/NotFoundPage"


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
