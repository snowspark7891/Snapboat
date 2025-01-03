import Postform from "@/components/Forms/Postform"


const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full "> 
          <img src="/public/assets/icons/add-post.svg" alt="placeholder" width={36} height={36}/>
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <Postform action="Create" />
      </div>
    </div>
  )
}

export default CreatePost