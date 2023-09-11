import { useEffect, useState } from "react";
import { BASE_URL } from "../helper/helper";
import { useDispatch } from "react-redux";
import { requestActions } from "../store/request-slice";
export default function MyRequests() {
  let req = [];
  const [requestss, setrequestss] = useState([]);
  async function loadEvents() {
    const response = await fetch(BASE_URL + "user-requests");
    if (!response.ok) {
      throw { message: "Could not fetch events.", status: 500 };
    } else {
      const ResData = await response.json();
      req = ResData.requests;
      setrequestss(req);
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    loadEvents();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col align-center ">
        <h1 className=" my-4 mt-16  text-3xl">Requests are here</h1>
        {requestss.map((request) => (
          <div
            class=" p-6 bg-white border border-gray-200 rounded-lg shadow w-full"
            style={{ maxWidth: "750px" }}
          >
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Request Id- {request._id}
              </h5>
            </a>
            <ul>
              <li>Status : {request.status}</li>
              <li>Make :{request.make}</li>
              <li>Model : {request.model}</li>
              <li>Year: {request.year}</li>
              <li>VIN : {request.vin}</li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
