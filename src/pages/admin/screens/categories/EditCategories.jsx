import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk react-toastify
import {
  getSingleCategory,
  updateCategory,
} from "../../../../services/index/postCategories";

const EditCategories = () => {
  const queryClient = useQueryClient();
  const [categoryTitle, setCategoryTitle] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    onSuccess: (data) => {
      setCategoryTitle(data?.title);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ title, slug, token }) => {
        return updateCategory({
          title,
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category is updated");
        navigate(`/admin/categories/manage/edit/${data._id}`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateCategory = () => {
    if (!categoryTitle) return;
    mutateUpdateCategory({
      title: categoryTitle,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
      <h4 className="text-2xl font-semibold text-white">Update Category</h4>
      <p className="mt-2 text-gray-500 text-sm">Edit the title of the category below:</p>
      
      <div className="mt-6">
        <label htmlFor="category-title" className="block text-sm font-medium text-white">
          Category Title
        </label>
        <input
          id="category-title"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="Enter category title"
          className="w-full mt-2 px-4 py-3 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        disabled={isLoadingUpdateCategory || isLoading || isError}
        type="button"
        onClick={handleUpdateCategory}
        className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out
          ${isLoadingUpdateCategory || isLoading || isError
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"}`}
      >
        {isLoadingUpdateCategory || isLoading ? "Updating..." : "Update Category"}
      </button>
    </div>
    </>
  );
};

export default EditCategories;
