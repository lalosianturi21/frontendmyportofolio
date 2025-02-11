import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../../services/index/postCategories";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk react-toastify
import { useState } from "react";

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState("");

  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ token, title }) => createCategory({ token, title }),
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Created Successfully! 🎉", { autoClose: 3000 });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const {
    userState,
    currentPage,
    searchKeyword,
    data: categoriesData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllCategories(searchKeyword, currentPage),
    dataQueryKey: "categories",
    deleteDataMessage: "Category deleted successfully",
    mutateDeleteFn: ({ slug, token }) => deleteCategory({ slug, token }),
  });

  const handleCreateCategory = () => {
    mutateCreateCategory({
      token: userState.userInfo.token,
      title: categoryTitle,
    });
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-4 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-700">Add New Category</h4>
          <div className="mt-4">
            <input
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              placeholder="Enter category title"
              className="w-full px-4 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleCreateCategory}
              disabled={isLoadingCreateCategory}
              className="w-full mt-3 bg-purple-600 text-white font-semibold rounded-md py-2 hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isLoadingCreateCategory ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>
        <div className="col-span-8 p-6  rounded-lg shadow-md">
          <DataTable
            pageTitle="Manage Categories"
            dataListName="Categories"
            searchInputPlaceHolder="Search categories..."
            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
            searchKeywordOnChangeHandler={searchKeywordHandler}
            searchKeyword={searchKeyword}
            tableHeaderTitleList={["Title", "Created At", "Actions"]}
            isLoading={isLoading}
            isFetching={isFetching}
            data={categoriesData?.data}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            headers={categoriesData?.headers}
            userState={userState}
          >
            {categoriesData?.data.map((category) => (
              <tr key={category._id} className="border-b hover:bg-purple-600">
                <td className="px-4 py-3 text-white font-medium">
                  {category.title}
                </td>
                <td className="px-4 py-3 text-white">
                  {new Date(category.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 space-x-3 flex">
                  <button
                    disabled={isLoadingDeleteData}
                    onClick={() => deleteDataHandler({ slug: category._id, token: userState.userInfo.token })}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/categories/manage/edit/${category._id}`}
                    className=" editbutton px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm font-medium transition"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
    </>
  );
};

export default Categories;
