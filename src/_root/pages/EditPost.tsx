import Postform from "@/components/Forms/Postform";
import Loader from "@/components/shared/Loader";
import { useGetPostByID } from "@/lib/react-quary/quaresandMutaition";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const {id} = useParams();
   const {data : post ,isPending} = useGetPostByID(id || '')

   if(isPending) return <Loader />
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full ">
          <img
            src="/public/assets/icons/add-post.svg"
            alt="placeholder"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <Postform action="Update" post={post}/>
      </div>
    </div>
  );
}

export default EditPost