import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

import { images } from "../../../../constants";
import { useEffect, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createPost } from "../../../../services/index/posts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } = useMutation({
    mutationFn: ({ slug, token }) => createPost({ token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post is created, edit that now! 🎉", { autoClose: 3000 });
      navigate(`/admin/posts/manage/edit/${data.slug}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post.");
      console.error("Post creation error:", error);
    },
  });

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  const handleCreateNewPost = () => {
    if (!userState?.userInfo?.token) {
      toast.error("User is not authenticated.");
      return;
    }
    mutateCreatePost({ token: userState.userInfo.token });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
        {/* logo */}
        <Link to="/">
          <img src={images.Logo} alt="logo" className="img-header w-30 " />
        </Link>
        {/* menu burger icon */}
        <div className="cursor-pointer lg:hidden">
          {isMenuActive ? (
            <AiOutlineClose className="w-6 h-6 text-white" onClick={toggleMenuHandler} />
          ) : (
            <AiOutlineMenu className="w-6 h-6 text-white" onClick={toggleMenuHandler} />
          )}
        </div>
        {/* sidebar container */}
        {isMenuActive && (
          <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
            {/* underlay */}
            <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleMenuHandler} />
            {/* sidebar */}
            <div className="sidebar-bg fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
              <Link to="/">
                <img src={images.Logo} alt="logo" className="w-30" />
              </Link>
              <h4 className="mt-10 font-bold text-[#C7C7C7]">MAIN MENU</h4>
              {/* menu items */}
              <div className="mt-6 flex flex-col gap-y-[0.563rem]">
                <NavItem title="Dashboard" link="/admin" icon={<AiFillDashboard className="text-xl" />} name="dashboard" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />
                <NavItem title="Comments" link="/admin/comments" icon={<FaComments className="text-xl" />} name="comments" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />

                <NavItemCollapse title="Posts" icon={<MdDashboard className="text-xl" />} name="posts" activeNavName={activeNavName} setActiveNavName={setActiveNavName}>
                  {/* Manage All Posts */}
                  <Link to="/admin/posts/manage" className="flex items-center gap-2 px-4 py-2 text-[15px] font-medium text-gray-700 rounded-md transition">
                    <span className="text-lg">📋</span> Manage all posts
                  </Link>

                  {/* Add New Post Button */}
                  <button
                    disabled={isLoadingCreatePost}
                    className={`button-addpost flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium rounded-md transition w-full text-left
                      ${isLoadingCreatePost ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "text-gray-700"}`}
                    onClick={handleCreateNewPost}
                  >
                    <span className="text-lg">✨</span> Add New Post
                  </button>

                  {/* Categories */}
                  <Link to="/admin/categories/manage" className="flex items-center gap-2 px-4 py-2 text-[15px] font-medium text-gray-700 rounded-md transition">
                    <span className="text-lg">📁</span> Categories
                  </Link>
                </NavItemCollapse>

                <NavItem title="Users" link="/admin/users/manage" icon={<FaUser className="text-xl" />} name="users" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
