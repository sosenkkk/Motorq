import { useEffect, useState } from "react";
import { BASE_URL } from "../helper/helper";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MyRequests() {
  const navigate = useNavigate();
  const toast = useToast();
  let req = [];
  const [requestss, setrequestss] = useState([]);
  async function loadEvents() {
    const response = await fetch(BASE_URL + "admin/user-requests");
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
  const submitHandler = async (event) => {
    const value = event.target.id;
    const element = document.getElementById(value);
    const id = element.parentNode.id;
    const response = await fetch(BASE_URL + "admin/accept-reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valueAR: value,
        id:id
      }),
    });
    const res = await response.json();
    if (response.status == 202) {
      toast({
        title: res.message,
        status: "success",
        isClosable: true,
      });
    } else if (response.status == 403) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
    } else if (response.status == 201) {
      toast({
        title: res.message,
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col align-center ">
        <h1 className=" my-4 mt-16  text-3xl">Requests are here</h1>
        {requestss.map((request) => (
          <div
            class=" p-6 bg-white border border-gray-200 rounded-lg shadow w-full"
            style={{ maxWidth: "750px" }}
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Request Id- {request._id}
            </h5>

            <ul className="mb-8">
              <li>Make{request.make}</li>
              <li>Model : {request.model}</li>
              <li>Year: {request.year}</li>
              <li>VIN : {request.vin}</li>
            </ul>
            <div id={request._id}>
              <button
                id="accept"
                onClick={submitHandler}
                className=" bg-green-500 rounded shadow text-white mx-4 p-2 px-3"
              >
                Accept
              </button>
              <button
                id="reject"
                onClick={submitHandler}
                className="bg-red-500 rounded shadow text-white p-2 px-3"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
