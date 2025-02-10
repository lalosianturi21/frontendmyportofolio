import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllPosts } from "../../services/index/posts";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search";
import AsyncMultiSelectTagDropdown from "../../components/SelectAsyncPaginate";
import { getAllCategories } from "../../services/index/postCategories";
import { filterCategories } from "../../utils/multiSelectTagUtils";
import ProjectCard from "../../components/ProjectCard";

let isFirstRun = true;

const promiseOptions = async (search, loadedOptions, { page }) => {
    const { data: categoriesData, headers } = await getAllCategories(
        search,
        page,
    );

    return {
        options: filterCategories(search, categoriesData),
        hasMore:
            parseInt(headers["x-totalpagecount"]) !==
            parseInt(headers["x-currentpage"]),
        additional: {
            page: page + 1,
        },
    };
};

const ProjectPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);

    const searchParamsValue = Object.fromEntries([...searchParams]);

    const currentPage = parseInt(searchParamsValue?.page) || 1;
    const searchKeyword = searchParamsValue?.search || "";

    const { data, isLoading, isError, isFetching, refetch } = useQuery({
        queryFn: () => getAllPosts(searchKeyword, currentPage, 12, categories),
        queryKey: ["posts", categories],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    console.log(data);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        refetch();
    }, [currentPage, searchKeyword, refetch]);

    const handlePageChange = (page) => {
        // change the page's query string in the URL
        setSearchParams({ page, search: searchKeyword });
    };

    const handleSearch = ({ searchKeyword }) => {
        setSearchParams({ page: 1, search: searchKeyword });
    };

    return (
        <MainLayout>
            <section className="projectpage containers flex flex-col px-5 py-10 mx-auto">
            <h2 className='title-project'>My Project</h2>
                <div className="flex flex-col mb-10 space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:gap-x-4">
                    <Search className="w-full max-w-xl" onSearchKeyword={handleSearch} />
                    <AsyncMultiSelectTagDropdown
                        placeholder={"Search by categories..."}
                        loadOptions={promiseOptions}
                        onChange={(selectedValues) => {
                            setCategories(selectedValues.map((item) => item.value));
                        }}
                    />
                </div>
                <div className='myproject' id='projects'>
                    <div className="all-items">
                        {isError ? (
                            <ErrorMessage message="Couldn't fetch the posts data" />
                        ) : data?.data.length === 0 ? (
                            <p className="text-orange-500">No Project Found!</p>
                        ) : (
                            data?.data.map((post) => (
                                <ProjectCard
                                    key={post._id}
                                    post={post}
                                    className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                                />
                            ))
                        )}
                    </div>
                </div>
                {!isLoading && (
                    <Pagination
                        onPageChange={(page) => handlePageChange(page)}
                        currentPage={currentPage}
                        totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
                    />
                )}
            </section>
        </MainLayout>
    );
};

export default ProjectPage;
