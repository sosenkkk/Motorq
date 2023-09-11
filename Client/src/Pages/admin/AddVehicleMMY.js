import { useRef } from "react";
import { BASE_URL } from "../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddVehicleMMY = (props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const makeref = useRef();
  const modelref = useRef();
  const yearref = useRef();
  const vinref = useRef();
  const validateEmail = new RegExp(
    /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
  );
  const validateEmailHandler = (make) => {
    if (validateEmail.test(make)) {
      return true;
    } else {
      toast({
        title: "Enter correct make address",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
  const validateMMYHandler = (value) => {
    if (value.trim().length > 0) {
      return true;
    } else {
      toast({
        title: "Field Cannot be empty!",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
  const vinRegex = new RegExp(/^[A-Z0-9]{8}$/);
  const yearRegex = new RegExp(/^[0-9]{4}$/);

  const validateYearHandler = (year) => {
    if (!yearRegex.test(year) ) {
      toast({
        title: "Invalid year value.",
        status: "error",
        isClosable: true,
      });
      return false;
    } else {
      return true;
    }
  };
  const validateVINHandler = (vin) => {
    if (vinRegex.test(vin)) {
      return true;
    } else {
      if (vin.length !== 8) {
        toast({
          title: "VIN can contain only 8 characters.",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "VIN can contain only Captial alphabets and numbers.",
          status: "error",
          isClosable: true,
        });
      }
      return false;
    }
  };

  const addVehicleHandler = async (event) => {
    event.preventDefault();
    const make = makeref.current.value;
    const model = modelref.current.value;
    const year = yearref.current.value;
    const vin = vinref.current.value;
    const validation =
      validateMMYHandler(make) &&
      validateMMYHandler(model) &&
      validateMMYHandler(year) &&
      validateYearHandler(year) &&
      validateVINHandler(vin);

    if (validation) {
      const response = await fetch(BASE_URL + "admin/add-vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          make: make,
          model: model,
          year: year,
          vin: vin,
        }),
      });
      const res = await response.json();
      if (response.status == 433) {
        navigate("/");
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
        navigate("/login");
      }
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <section className="bg-[#f7f7f7] mt-12">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-[800px] xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Add Vehicle MMY and VIN
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={addVehicleHandler}
              >
                <div>
                  <label
                    htmlFor="make"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Make / Manufacturer
                  </label>
                  <input
                    type="text"
                    ref={makeref}
                    name="make"
                    id="make"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    placeholder="Enter make"
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Model of Car
                  </label>
                  <input
                    type="text"
                    ref={modelref}
                    name="model"
                    id="model"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    placeholder="Enter model"
                  />
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Year of Manufacture
                  </label>
                  <input
                    type="text"
                    ref={yearref}
                    name="year"
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    placeholder="Enter year"
                  />
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    VIN(first 8 characters)
                  </label>
                  <input
                    type="text"
                    ref={vinref}
                    name="vin"
                    id="vin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    placeholder="Enter VIN"
                  />
                </div>

                <div className="py-2">
                  <button
                    type="submit"
                    className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                  >
                    Add Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddVehicleMMY;
