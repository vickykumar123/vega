import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_URL} from "../contants/api_url";
import {useForm} from "react-hook-form";

interface BookingInput {
  id: string;
  total_distance: number;
  item_type: "perishable" | "non-perishable";
  zone: string;
  base_price: number;
  km_price: number;
}

interface BookingData {
  id: number;
  zone: string;
  name: string;
  description: string;
  type: "perishable" | "non-perishable";
  base_price: number;
  km_price: number;
}

export default function Booking() {
  const [organization, setOrganization] = useState<BookingData>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<BookingInput>({
    values: {
      id: params.organizationId!,
      zone: organization?.zone as string,
      item_type: organization?.type as "non-perishable",
      base_price: organization?.base_price as number,
      km_price: organization?.km_price as number,
      total_distance: 0,
    },
  });

  const getOrganizationById = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/${params.organizationId}`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      setOrganization(responseData.data[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [params]);
  useEffect(() => {
    getOrganizationById();
  }, [getOrganizationById]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  const onSubmit = async (data: BookingInput) => {
    try {
      const response = await fetch(`${API_URL}/api/calculate-pricing`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      setTotalPrice(responseData.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" p-4 flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl">{organization?.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <label className="text-white text-sm font-bold flex-1">
            Type
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-70 cursor-not-allowed capitalize"
              {...register("item_type")}
              value={organization?.type}
              disabled
            />
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Fixed Base Price
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-70 cursor-not-allowed"
              disabled
              type="number"
              value={organization?.base_price}
              {...register("base_price")}
            />
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Price Per Km, if Total Distance exceeds more than 5 km
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-70 cursor-not-allowed"
              value={organization?.km_price}
              disabled
              {...register("km_price")}
            />
          </label>

          <label className="text-white text-sm font-bold flex-1">
            Zone
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-70 cursor-not-allowed"
              {...register("zone")}
              disabled
              value={organization?.zone}
            />
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Total Distance
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              {...register("total_distance", {
                required: "This field is required",
              })}
            />
            {errors.total_distance && (
              <span className="text-red-500">
                {errors.total_distance.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            className="bg-indigo-500 p-1 rounded-md font-semibold"
          >
            Calculate Total Price
          </button>
          {totalPrice && (
            <div className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1">
              Total Price : {totalPrice}€
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
