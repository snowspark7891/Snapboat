import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResult from "@/components/shared/SearchResult";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPost, useSearchPost } from "@/lib/react-quary/quaresandMutaition";
import { useEffect, useState } from "react";
import {InView, useInView} from "react-intersection-observer"

const Explore = () => {
  const { ref } = useInView({ threshold: 0.5 });
  const { data: posts, fetchNextPage, isFetching, hasNextPage } = useGetPost();

  const [searchValue, setsearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data: searchPosts, isFetching: isSearchFetching } =
    useSearchPost(debouncedSearchValue);

   useEffect(() => {
    if (InView && !searchValue) {
      fetchNextPage();
    }
   },[InView,searchValue]) // itwill change when ever these two variable got changed 
  if(!posts){
    return (
      <div className="flex-center w-fullh-full">
        <Loader />
      </div>
    )
  }
 
  const shouldShowSearchResult = searchValue !== "";
  const shouldShowPostResult =
    !shouldShowSearchResult &&
    posts.pages.every((item) => item.documents.length === 0);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h1 className="h3-bold md:h2-bold w-full">Search</h1>
        <div className="flex gap-1 px-4 w-full rounded-xl bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold w-full">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/assets/icons/filter.svg" height={20} width={20} />
        </div>
      </div>

      <div className=" flex-wrap gap-9 max-w-5xl">
        {shouldShowSearchResult ? (
          <SearchResult
            isSearchFetching={isSearchFetching}
            searchPosts={searchPosts}
          />
        ) : shouldShowPostResult ? (
          <p className="text-light-4 mt-10 text-center  w-full">End of Post</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue  && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;

