import BlogPosts from "./BlogPosts";

const DashboardContent = () => {
  return (
    <div className="flex flex-col items-start p-5 md:p-20 gap-2.5 w-full ">
      {/* Main Content */}
      <BlogPosts/>
     
    </div>
  );
};


export default DashboardContent;
