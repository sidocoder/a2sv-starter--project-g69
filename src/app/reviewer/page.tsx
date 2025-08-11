  "use client"
  import React, {useState, useEffect} from "react";
  import Link from "next/link";

  import ApplicationCard from "./Card/page";
  import data from "./data/Data"
  import Description from "./description/[id]/page";

  const Reveiwer = () => {

    if (data.length === 0) {
    return <div>there is no data, Try Again</div>;
    }

    const [filtered, setfilter] = useState<"All" | "Complete" | "Under_Review">("All");
    const [filtered_list, setlist] = useState(data);

    const criteria = ["Alphabetic", "submission_date"];
    const [sort_type, setSortType] = useState(criteria[0])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered_list.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filtered_list.length / itemsPerPage);


    useEffect(() => {
      let filteredData = data;

      if (filtered !== "All") {
        filteredData = data.filter((item) => item.status === filtered);
      }

      let sorted = [...filteredData];
      if (sort_type === "Alphabetic") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sorted.sort(
          (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );
      }

      setlist(sorted);
    }, [filtered, sort_type]);

  

    return (
      <main className=" m-auto  w-[100%]  ">
        <nav className="w-[80%] mx-auto h-16 bg-[#ffffff] pl-[102px] flex justify-between items-center text-black">
          <div className="w-[20%] ">
            <Link href="/" className=" ">
              <img
                src="/images/logo.png"
                alt=""
                className=" w-[90px] h-auto "
              />
            </Link>
          </div>

          <div className="text-sm w-[7%] text-center border-b-2 border-indigo-500">
            Dashboard
          </div>

          <div className="flex space-x-4 w-[27%] justify-between text-sm">
            <a href="/" className="text-[#4F46E5]">
              Your Profile
            </a>
            <div>Registered name</div>
            <Link href="/" className="">
              Log out
            </Link>
          </div>
        </nav>

        <div className="bg-[#F3F4F6] w-[100%]">
          <div className="  w-[80%] pl-[102px] mx-auto  pb-52">
            <header className="w-full  pt-24 ">
              <h1 className=" text-black text-[30px]  font-bold ">
                Assigned Applications
              </h1>
              <h6 className="text-[#4B5563] text-[16px] mb-3.5 ">
                You have{" "}
                {
                  data.filter(
                    (item) =>
                      item.status === "New" || item.status === "Under_Review"
                  ).length
                }{" "}
                applications waiting for your review.
              </h6>

              <div className="flex justify-between w-[100%]  h-[48px] pt-[20px] ">
                <div className="flex   ">
                  <button
                    onClick={() => setfilter("All")}
                    className={` ${
                      filtered === "All"
                        ? "bg-[#4F46E5] text-white"
                        : "text-[#4B5563] bg-[#E5E7EB]"
                    }   text-center rounded-[5px] w-[41px] h-[28px]} `}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setfilter("Under_Review")}
                    className={`${
                      filtered === "Under_Review"
                        ? "bg-[#4F46E5] text-white"
                        : "text-[#4B5563] bg-[#E5E7EB]"
                    }  flex justify-between items-center  w-[125px] h-[28px]  rounded-[5px] mx-1 px-[12px] py-[4px] `}
                  >
                    Under Review
                  </button>

                  <button
                    onClick={() => setfilter("Complete")}
                    className={`${
                      filtered === "Complete"
                        ? "bg-[#4F46E5] text-white"
                        : "text-[#4B5563] bg-[#E5E7EB]"
                    } text-center  w-[97px] h-[28px]  rounded-[5px]  `}
                  >
                    Complete
                  </button>
                </div>
                <div className="pr-12">
                  <label className="text-gray-400">sorted by:- </label>
                  <select
                    value={sort_type}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-[180px] h-[26px]  rounded border-[1px]  border-gray-300 gap-[12px] rotate-0 opacity-100"
                  >
                    {criteria.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
            </header>

            <main className="w-[100%] mx-1  mt-12 h-fit">
              <div className="flex flex-wrap gap-4 ">
                {currentItems.map((item, index) => (
                  <ApplicationCard
                    key={index}
                    name={item.name}
                    date={item.Date}
                    status={item.status}
                    id={index+1}
                  />
                ))}
              </div>
            </main>

            <div className="flex items-center justify-between px-4 py-6 text-sm text-gray-700">
              <span className="text-gray-500">
                Showing{" "}
                <span className="font-semibold text-black">
                  {indexOfFirstItem + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-black">
                  {Math.min(indexOfLastItem, filtered_list.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-black">
                  {filtered_list.length}
                </span>{" "}
                results
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-600 disabled:opacity-30"
                >
                  &lt;
                </button>

               
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-indigo-600 text-white font-semibold"
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </button>

           
                {currentPage > 3 && totalPages > 4 && (
                  <span className="px-2 select-none">...</span>
                )}

         
                {currentPage === totalPages && totalPages > 3 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-600"
                  >
                    {currentPage - 1}
                  </button>
                )}

                {currentPage !== 1 && currentPage !== totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage)}
                    className="px-3 py-1 rounded-md bg-indigo-600 text-white font-semibold"
                  >
                    {currentPage}
                  </button>
                )}

                {currentPage === 1 && totalPages > 3 && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-600"
                  >
                    {currentPage + 1}
                  </button>
                )}

                {currentPage < totalPages - 2 && totalPages > 4 && (
                  <span className="px-2 select-none">...</span>
                )}

                {totalPages > 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? "bg-indigo-600 text-white font-semibold"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md hover:bg-gray-200 text-gray-600 disabled:opacity-30"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full bg-gray-800 px-[320px] pt-[32px] pb-[64px]">
          <div className="text-center text-sm text-gray-300 pt-12 border-t  border-[#374151] ">
            © 2023 A2SV. All rights reserved.
          </div>
        </footer>
      </main>
      
    );
  };

  export default Reveiwer;
