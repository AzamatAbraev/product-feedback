import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Pagination } from "antd"; // Import Pagination from antd
import bulbIcon from "../../assets/suggestions/icon-suggestions.svg";
import Dropdown from "../../components/dropdown/Dropdown";
import FeedbackCard from "../../components/feedback-card/FeedbackCard";
import NoFeedback from "../../components/no-feedback/NoFeedback";
import Feedback from "../../types/Feedback";
import request from "../../server/request";

import "./Suggestions.scss";
import LoadingPage from "../../components/loading/LoadingPage";

const SuggestionsPage = () => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [filter, setFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Most Upvotes");

  const fetchFeedback = async (page: number, pageSize: number, filter: string, sortBy: string) => {
    try {
      const sortMap: { [key: string]: string } = {
        "Most Upvotes": "most-upvotes",
        "Least Upvotes": "least-upvotes",
        "Most Comments": "most-comments",
        "Least Comments": "least-comments",
      };

      const sortQuery = sortMap[sortBy];

      const response = await request.get(
        `/feedback?page=${page}&limit=${pageSize}&category=${filter}&sort=${sortQuery}`
      );
      setFeedbackData(response.data.feedback);
      setTotalFeedback(response.data.total);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback(currentPage, pageSize, filter, sortBy);
  }, [currentPage, pageSize, filter, sortBy]);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <section>
      <div className="container suggestions-container">
        <div className="sidebar">
          <div className="sidebar__logo">
            <h2>OurGeneration Store</h2>
            <p>Feedback Board</p>
          </div>
          <div className="sidebar__filters">
            <button
              className={`filter ${filter === "All" ? "active" : ""}`}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`filter ${filter === "UI" ? "active" : ""}`}
              onClick={() => setFilter("UI")}
            >
              UI
            </button>
            <button
              className={`filter ${filter === "UX" ? "active" : ""}`}
              onClick={() => setFilter("UX")}
            >
              UX
            </button>
            <button
              className={`filter ${filter === "Enhancement" ? "active" : ""}`}
              onClick={() => setFilter("Enhancement")}
            >
              Enhancement
            </button>
            <button
              className={`filter ${filter === "Bug" ? "active" : ""}`}
              onClick={() => setFilter("Bug")}
            >
              Bug
            </button>
            <button
              className={`filter ${filter === "Feature" ? "active" : ""}`}
              onClick={() => setFilter("Feature")}
            >
              Feature
            </button>
          </div>
        </div>
        <div className="main">
          <div className="main__header">
            <div className="main__header__left">
              <div className="main__header__suggestions">
                <img src={bulbIcon} alt="Bulb Icon" />
                <h3>{totalFeedback} Suggestions</h3>
              </div>
              <div className="main__header__sort">
                <Dropdown sortBy={sortBy} setSortBy={setSortBy} />
              </div>
            </div>
            <div className="main__header__right">
              <NavLink className="addBtn" to="/feedback/new">
                + Add Feedback
              </NavLink>
            </div>
          </div>
          <div className="main__content">
            {feedbackData.length === 0 ? (
              <NoFeedback />
            ) : (
              feedbackData.map((feedback) => (
                <FeedbackCard
                  key={feedback._id}
                  {...feedback}
                  comments={feedback.comments || []}
                />
              ))
            )}
          </div>

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalFeedback}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={["5", "10", "20"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggestionsPage;
