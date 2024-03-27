import {useForm} from "react-hook-form";
import {API_URL} from "../contants/api_url";
import {useNavigate} from "react-router-dom";

interface InputForm {
  name: string;
  type: "perishable" | "non-perishable";
  description: string;
  base_distance_in_km: number;
  base_price: number;
  km_price: number;
  zone: string;
}

export default function Organisation() {
  const {
    register,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<InputForm>({
    defaultValues: {
      name: "",
      type: "perishable",
      base_distance_in_km: 5,
      base_price: 10,
      km_price: 1.5,
      zone: "",
    },
  });

  const typeWatch = watch("type");
  const navigate = useNavigate();

  const onSubmit = async (data: InputForm) => {
    try {
      const response = await fetch(`${API_URL}/api/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      if (responseData.status == "success") navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" p-4 flex flex-col items-center justify-center w-full">
      Create Organization
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <label className="text-white text-sm font-bold flex-1">
            Organization Name
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              {...register("name", {required: "This field is required"})}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Type
            <select
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              {...register("type", {required: "This field is required"})}
            >
              <option className="font-semibold " value="perishable">
                Perishable
              </option>
              <option className="font-semibold " value="non-perishable">
                Non-Perishable
              </option>
            </select>
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Description
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              {...register("description", {required: "This field is required"})}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Base Distance in KM
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              min={5}
              {...register("base_distance_in_km", {
                required: "This field is required",
              })}
            />
            {errors.base_distance_in_km && (
              <span className="text-red-500">
                {errors.base_distance_in_km.message}
              </span>
            )}
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Base Price
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              min={10}
              {...register("base_price", {
                required: "This field is required",
              })}
            />
            {errors.base_price && (
              <span className="text-red-500">{errors.base_price.message}</span>
            )}
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Price Per KM
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 disabled:opacity-70 disabled:grayscale cursor-not-allowed"
              min={1}
              disabled
              value={typeWatch === "perishable" ? 1.5 : 1}
              {...register("km_price", {
                required: "This field is required",
              })}
            />
            {errors.km_price && (
              <span className="text-red-500">{errors.km_price.message}</span>
            )}
          </label>
          <label className="text-white text-sm font-bold flex-1">
            Zone
            <input
              className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1"
              {...register("zone", {
                required: "This field is required",
              })}
            />
            {errors.zone && (
              <span className="text-red-500">{errors.zone.message}</span>
            )}
          </label>
          <button
            type="submit"
            className="bg-indigo-500 p-1 rounded-md font-semibold"
          >
            Create Organization
          </button>
        </div>
      </form>
    </div>
  );
}
