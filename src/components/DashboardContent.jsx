import edit from '../assets/svg/fi-rr-edit-alt.svg'
import deleteIcon from '../assets/svg/fi-rr-trash.svg'
const DashboardContent = () => {
  return (
    <div className="flex flex-col items-start p-5 md:p-20 gap-2.5 w-full max-w-7xl ">
      {/* Main Content Frame */}
      <div className="flex flex-col items-start p-0 w-full h-auto bg-gray-50 rounded-xl shadow-sm overflow-auto">
        {/* Header Section */}
        <div className="box-border flex flex-row items-center px-6 py-4 gap-4 w-full h-14 bg-gray-50 border-b border-gray-300 shadow-sm flex-none order-0 self-stretch">
          <div className="flex flex-row items-center p-0 gap-5 w-full h-7 flex-none order-0 flex-grow">
            <h2 className="w-full h-7 font-['Space_Grotesk'] font-medium text-base md:text-lg leading-6 tracking-tight capitalize text-gray-900 flex-none order-0 flex-grow">
              Recent Posts
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1000px] m-4">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 px-6 py-3 border-b border-gray-300 mt-8">
              {[
                "S/N",
                "Title",
                "Status",
                "Views",
                "Date Published",
                "Author",
                "Actions",
              ].map((header) => (
                <span
                  key={header}
                  className="font-['Space_Grotesk'] font-medium text-sm text-gray-600 capitalize"
                >
                  {header}
                </span>
              ))}
            </div>

            {/* Table Rows */}
            {tableData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-gray-200 text-sm"
              >
                {/* Serial Number */}
                <span className="text-gray-600">{row.serial}</span>

                {/* Title */}
                <span className="truncate text-gray-600">{row.title}</span>

                {/* Status */}
                <span
                  className={
                    row.status === "Published"
                      ? "text-green-500"
                      : row.status === "Draft"
                      ? "text-purple-600"
                      : "text-orange-500"
                  }
                >
                  {row.status}
                </span>

                {/* Views */}
                <span className="text-gray-600">{row.views}</span>

                {/* Date Published */}
                <span className="text-gray-600">{row.date}</span>

                {/* Author */}
                <span className="text-gray-600">{row.author}</span>

                 {/* Actions */}
                <div className="flex flex-row items-center pl-0 gap-6 flex-none order-6 self-stretch">
              
                  <button className="w-5 h-5 flex-none order-0 text-gray-400 hover:text-gray-600 transition-colors">
                    <img src={edit} alt="Edit Icon"  />
                  </button>
                  
                  
                  <button className="w-5 h-5 flex-none order-1 text-gray-400 hover:text-red-500 transition-colors">
                    <img src={deleteIcon} alt="Delete Icon"  />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Table data
const tableData = [
  {
    serial: "01",
    title: "How AI is Changing the Future of Travel",
    status: "Published",
    views: "4,532",
    date: "February 9, 2015",
    author: "Marvin McKinney",
  },
  {
    serial: "02",
    title: "10 Easy Vegan Recipes for Busy People",
    status: "Draft",
    views: "4,532",
    date: "November 7, 2017",
    author: "Theresa Webb",
  },
  {
    serial: "03",
    title: "Best Budget Destinations for 2025",
    status: "Draft",
    views: "4,532",
    date: "March 23, 2013",
    author: "Jane Cooper",
  },
  {
    serial: "04",
    title: "10 Easy Vegan Recipes for Busy People",
    status: "Published",
    views: "4,532",
    date: "May 31, 2015",
    author: "Robert Fox",
  },
  {
    serial: "05",
    title: "Best Budget Destinations for 2025",
    status: "Scheduled",
    views: "4,532",
    date: "May 6, 2012",
    author: "Darrell Steward",
  },
  {
    serial: "06",
    title: "Best Budget Destinations for 2025",
    status: "Published",
    views: "4,532",
    date: "December 19, 2013",
    author: "Wade Warren",
  },
  {
    serial: "07",
    title: "10 Easy Vegan Recipes for Busy People",
    status: "Draft",
    views: "4,532",
    date: "February 11, 2014",
    author: "Annette Black",
  },
  {
    serial: "08",
    title: "Best Budget Destinations for 2025",
    status: "Scheduled",
    views: "4,532",
    date: "May 31, 2015",
    author: "Leslie Alexander",
  },
  {
    serial: "09",
    title: "Best Budget Destinations for 2025",
    status: "Scheduled",
    views: "4,532",
    date: "May 31, 2015",
    author: "Leslie Alexander",
  },
];

export default DashboardContent;
