import { Models } from 'appwrite';
import React from 'react'
import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultProps = {
  isSearchFetching: boolean;
  searchPosts:Models.Document[];
};

const SearchResult = ({isSearchFetching,searchPosts}:SearchResultProps) => {
  if(isSearchFetching) return <Loader/>

  if(searchPosts && searchPosts.documents.length > 0) return( <GridPostList posts={searchPosts.documents} />)
  return (
    <p className='text-light-3 mt-10 text-centern w-f'>no posts available</p>
  )
}

export default SearchResult