import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllPosts } from '../../../services/index/posts'
import { toast } from 'react-toastify'

const Articles = () => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts("", 1, 6),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error)
        }
    });
  return (
    <div>
      <h1>Ini halaman Articles</h1>
    </div>
  )
}

export default Articles
