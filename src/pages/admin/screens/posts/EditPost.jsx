import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { Link, useParams, useNavigate } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk react-toastify
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/index/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utils/multiSelectTagUtils";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setCategories(data.categories.map((item) => item._id));
      setTitle(data.title);
      setCaption(data.caption);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePostDetail } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({ updatedData, slug, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated! 🎉", { autoClose: 3000 });

      setTimeout(() => {
        navigate(`/admin/posts/manage/edit/${data.slug}`, { replace: true });
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();
  
    if (photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto) {
      // Konversi URL gambar lama ke File
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        return new File([blob], "previous-image.jpg", { type: blob.type });
      };
      const oldPhoto = await urlToObject(data?.photo);
      updatedData.append("postPicture", oldPhoto);
    }
  
    updatedData.append(
      "document",
      JSON.stringify({ body, categories, title, slug: postSlug, caption })
    );
  
    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    <div className="container mx-auto max-w-4xl p-6 bg-edit rounded-lg shadow-lg">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <label htmlFor="postPicture" >
              {photo ? (
                <img src={URL.createObjectURL(photo)} alt={data?.title} className="rounded-lg w-full" />
              ) : initialPhoto ? (
                <img src={data?.photo} alt={data?.title} className="rounded-lg w-full" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex justify-center items-center rounded-lg">
                  <HiOutlineCamera className="text-gray-600 w-10 h-10" />
                </div>
              )}
            </label>
            <input type="file" className="hidden" id="postPicture" onChange={handleFileChange} />
          </div>

          <div>
            <label className="block text-lg font-semibold">Title</label>
            <input type="text" className="w-full p-2 border rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold">Caption</label>
            <input type="text" className="w-full p-2 border rounded-md" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold">Slug</label>
            <input type="text" className="w-full p-2 border rounded-md" value={postSlug} onChange={(e) => setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())} />
          </div>

          <div>
            <label className="block text-lg font-semibold">Categories</label>
            <MultiSelectTagDropdown loadOptions={promiseOptions} defaultValue={data.categories.map(categoryToOption)} onChange={(newValue) => setCategories(newValue.map((item) => item.value))} />
          </div>

          <div>
            <label className="block text-lg font-semibold">Content</label>
            <Editor content={data?.body} editable={true} onDataChange={(data) => setBody(data)} />
          </div>

          <button onClick={handleUpdatePost} className="w-full bg-purple-500 text-white font-semibold p-3 rounded-lg hover:bg-purple-600">Update Post</button>
        </div>
      )}
    </div>
    </>
  );
};

export default EditPost;
