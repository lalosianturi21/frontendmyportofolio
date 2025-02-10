import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import { deleteComment, getAllComments, updateComment } from "../../../../services/index/comments";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";

const Comments = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "Comment is deleted",
    mutateDeleteFn: ({ slug, token }) => deleteComment({ commentId: slug, token }),
  });

  const { mutate: mutateUpdateCommentCheck, isLoading: isLoadingUpdateCommentCheck } = useMutation({
    mutationFn: ({ token, check, commentId }) => updateComment({ token, check, commentId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.success(data?.check ? "Comment is approved" : "Comment is not approved");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <DataTable
      pageTitle="Manage Comments"
      dataListName="Comments"
      searchInputPlaceHolder="Search Comments..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Author", "Comment", "In Respond to", "Created At", "Actions"]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
      tableClassName="table-auto w-full border-collapse border border-gray-200 rounded-lg shadow-lg overflow-hidden"
    >
      {commentsData?.data.map((comment) => (
        <tr key={comment._id} className="border-b hover:bg-purple-600 transition duration-200">
          <td className="px-6 py-4 text-sm flex items-center">
            <img
              src={comment?.user?.avatar ? `${stables.UPLOAD_FOLDER_BASE_URL}${comment?.user?.avatar}` : images.userImage}
              alt={comment?.user?.name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <p className="font-medium text-gray-900">{comment?.user?.name}</p>
          </td>
          <td className="px-6 py-4 text-sm text-gray-700">
            {comment?.replyOnUser && (
              <p className="text-gray-500 text-xs">
                In reply to <Link to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`} className="text-blue-500 font-medium">{comment?.replyOnUser?.name}</Link>
              </p>
            )}
            <p>{comment?.desc}</p>
          </td>
          <td className="px-6 py-4 text-sm text-blue-600 font-medium">
            <Link to={`/blog/${comment?.post?.slug}`} className="hover:underline">{comment?.post?.title}</Link>
          </td>
          <td className="px-6 py-4 text-sm text-white">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "numeric",
              minute: "numeric",
            })}
          </td>
          <td className="px-6 py-4 text-sm flex space-x-3">
            <button
              disabled={isLoadingUpdateCommentCheck}
              className={`px-3 py-2 text-white text-xs font-semibold rounded-lg transition duration-200 ${comment?.check ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"} disabled:opacity-70`}
              onClick={() => mutateUpdateCommentCheck({ token: userState.userInfo.token, check: !comment?.check, commentId: comment._id })}
            >
              {comment?.check ? "Unapprove" : "Approve"}
            </button>
            <button
              disabled={isLoadingDeleteData}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition duration-200 disabled:opacity-70"
              onClick={() => deleteDataHandler({ slug: comment?._id, token: userState.userInfo.token })}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Comments;
