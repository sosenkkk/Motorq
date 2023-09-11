import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchvehicleData, vehicleActions } from "../../store/vehicle-slice";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "./../../helper/helper";
const EnrollmentRequest = (props) => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const vinRef = useRef();
  const toast = useToast();
  const vehicleData = useSelector((state) => state.vehiclemmy.vehiclemmy);
  const chosenMake = useSelector((state) => state.vehiclemmy.make);
  const chosenModel = useSelector((state) => state.vehiclemmy.model);
  const chosenYear = useSelector((state) => state.vehiclemmy.year);
  const chosenVin = useSelector((state) => state.vehiclemmy.vin);
  useEffect(() => {
    dispatch(fetchvehicleData());
  }, [dispatch]);

  const autofllVin = () => {
    return vehicleData
      .filter((data) => {
        return (
          data.make === chosenMake &&
          data.model === chosenModel &&
          data.year === chosenYear
        );
      })
      .map((data) => data.vin)[0];
  };
  const disptachHandler = (event) => {
    const selected = event.target.value;

    if (event.target.id === "make") {
      dispatch(vehicleActions.choseMake(selected));
    }
    if (event.target.id === "model") {
      dispatch(vehicleActions.choseModel(selected));
    }
    if (event.target.id === "year") {
      dispatch(vehicleActions.choseYear(selected));
      const vinHere = autofllVin();
      dispatch(vehicleActions.choseVin(vinHere));
    }
  };

  const submitEnrollHandler = async (event) => {
    event.preventDefault();
    const vin = vinRef.current.value.toString();
    if (vin.slice(0, 8) !== chosenVin || vin.length !== 17) {
      toast({
        title: "Invalid VIN characters",
        status: "error",
        isClosable: true,
      });
    } else {
      const response = await fetch(BASE_URL + "enroll-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          make: chosenMake,
          year:chosenYear,
          model:chosenModel,
          vin:vin
        }),
      });
      const res = await response.json();
      if (response.status == 433) {
        toast({
          title: res.message,
          status: "error",
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
        navigate("/");
      }
    }
  };
  return (
    <>
      <section className="bg-[#f7f7f7] mt-12">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-[800px] xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Enroll Your Vehicle
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={submitEnrollHandler}
              >
                <div>
                  <label
                    htmlFor="make"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Make
                  </label>
                  <select
                    id="make"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    onClick={disptachHandler}
                  >
                    <option>Select</option>
                    {vehicleData.map((data) => (
                      <option key={data._id}>{data.make}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Model
                  </label>
                  <select
                    id="model"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    onClick={disptachHandler}
                  >
                    <option>Select</option>

                    {vehicleData
                      .filter(function (data) {
                        return data.make === chosenMake;
                      })
                      .map((data) => (
                        <option key={data.vin}>{data.model}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Year
                  </label>
                  <select
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    onClick={disptachHandler}
                    onChange={disptachHandler}
                  >
                    <option>Select</option>
                    {vehicleData
                      .filter(function (data) {
                        return (
                          data.make === chosenMake && data.model === chosenModel
                        );
                      })
                      .map((data) => (
                        <option key={data.vin}>{data.year}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    VIN(17 characters total)
                  </label>
                  <input
                    type="text"
                    ref={vinRef}
                    name="vin"
                    id="vin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    defaultValue={chosenVin}
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

export default EnrollmentRequest;
