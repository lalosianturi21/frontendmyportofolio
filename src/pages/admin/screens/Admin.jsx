import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/index/posts";
import { getAllCategories } from "../../../services/index/postCategories";
import { getAllUsers } from "../../../services/index/users";

const Admin = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await getAllPosts("", 1);
        setTotalPosts(postsResponse?.headers?.["x-total-count"] || postsResponse?.data?.length || 0);

        const categoriesResponse = await getAllCategories("", 1);
        setTotalCategories(categoriesResponse?.headers?.["x-total-count"] || categoriesResponse?.data?.length || 0);

        const usersResponse = await getAllUsers("", 1);
        setTotalUsers(usersResponse?.headers?.["x-total-count"] || usersResponse?.data?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      <div className="admin-cards-container">

        <div className="admin-card">
          <h2 className="card-title">Total Projects</h2>
          {isLoading ? <p className="loading-text">Loading...</p> : <p className="total-count">{totalPosts}</p>}
        </div>

        <div className="admin-card">
          <h2 className="card-title">Total Categories</h2>
          {isLoading ? <p className="loading-text">Loading...</p> : <p className="total-count">{totalCategories}</p>}
        </div>
        

      </div>
    </div>
  );
};

export default Admin;
