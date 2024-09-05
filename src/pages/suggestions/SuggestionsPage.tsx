import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import bulbIcon from "../../assets/suggestions/icon-suggestions.svg";
import Dropdown from "../../components/dropdown/Dropdown";
import FeedbackCard from "../../components/feedback-card/FeedbackCard";
import NoFeedback from "../../components/no-feedback/NoFeedback";
import request from "../../server/request";
import Feedback from "../../types/Feedback";

import LoadingPage from "../../components/loading/LoadingPage";
import "./Suggestions.scss";

interface FeedbackResponse {
  feedback: Feedback[];
  total: number;
}

const SuggestionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [filter, setFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Most Upvotes");

  const fetchFeedback = async (page: number, pageSize: number, filter: string, sortBy: string) => {
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
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<FeedbackResponse>({
    queryKey: ["feedbackData", currentPage, pageSize, filter, sortBy],
    queryFn: () => fetchFeedback(currentPage, pageSize, filter, sortBy),
  });


  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error fetching feedback data</div>;
  }

  const feedbackData = data?.feedback || [];
  const totalFeedback = data?.total || 0;

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
              className={filter === "All" ? "active" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={filter === "UI" ? "active" : ""}
              onClick={() => setFilter("UI")}
            >
              UI
            </button>
            <button
              className={filter === "UX" ? "active" : ""}
              onClick={() => setFilter("UX")}
            >
              UX
            </button>
            <button
              className={filter === "Enhancement" ? "active" : ""}
              onClick={() => setFilter("Enhancement")}
            >
              Enhancement
            </button>
            <button
              className={filter === "Bug" ? "active" : ""}
              onClick={() => setFilter("Bug")}
            >
              Bug
            </button>
            <button
              className={filter === "Feature" ? "active" : ""}
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
              feedbackData.map((feedback: Feedback) => (
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
