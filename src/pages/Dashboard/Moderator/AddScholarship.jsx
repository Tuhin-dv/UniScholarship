import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGEBB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/scholarships", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Scholarship added successfully!");
      reset();
    },
    onError: () => {
      toast.error("Failed to add scholarship.");
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.universityImage[0]);
      const imgRes = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();

      if (!imgData.success) {
        toast.error("Image upload failed!");
        return;
      }

      const scholarship = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        universityImage: imgData.data.display_url,
        country: data.country,
        city: data.city,
        universityRank: parseInt(data.universityRank),
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: parseFloat(data.tuitionFees),
        applicationFees: parseFloat(data.applicationFees),
        serviceCharge: parseFloat(data.serviceCharge),
        deadline: data.deadline,
        postDate: data.postDate || new Date().toISOString(),
        postedUserEmail: data.email,
      };

      await mutateAsync(scholarship);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100   py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-10 shadow-2xl  border-white/20">
        <h2 className="text-4xl font-bold text-center  text-sky-500 mb-10 drop-shadow-md">
          🎓 Add Scholarship
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1  md:grid-cols-2 gap-6"
        >
          <input
            type="hidden"
            {...register("email")}
            value="moderator@example.com"
          />

          <input
            {...register("scholarshipName", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-0 text-lg text-black"
            placeholder="Scholarship Name"
          />

          <input
            {...register("universityName", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-0 text-lg text-black"
            placeholder="University Name"
          />

          <input
            type="file"
            {...register("universityImage", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 file-input file-input-bordered text-black"
          />

          <input
            {...register("country", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-0 text-lg"
            placeholder="Country"
          />

          <input
            {...register("city", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-0 text-lg"
            placeholder="City"
          />

          <input
            type="number"
            {...register("universityRank", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-0 text-lg"
            placeholder="World Rank"
          />

          <select
            {...register("subjectCategory", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 text-black px-4 py-3 focus:border-purple-500 focus:ring-0 text-lg"
          >
            <option value="">Select Subject</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>

          <select
            {...register("scholarshipCategory", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 text-black py-3 focus:border-purple-500 focus:ring-0 text-lg"
          >
            <option value="">Select Scholarship Type</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>

          <select
            {...register("degree", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 text-black px-4 py-3 focus:border-purple-500 focus:ring-0 text-lg"
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>

          <input
            type="number"
            {...register("tuitionFees")}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-black focus:border-purple-500 focus:ring-0 text-lg"
            placeholder="Tuition Fees (Optional)"
          />

          <input
            type="number"
            {...register("applicationFees", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-black focus:border-purple-500 focus:ring-0 text-lg"
            placeholder="Application Fees"
          />

          <input
            type="number"
            {...register("serviceCharge", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 text-black py-3 focus:border-purple-500 focus:ring-0 text-lg"
            placeholder="Service Charge"
          />

          <input
            type="date"
            {...register("deadline", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-black focus:border-purple-500 focus:ring-0 text-lg"
          />

          <input
            type="date"
            {...register("postDate", { required: true })}
            className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-black focus:border-purple-500 focus:ring-0 text-lg"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="btn w-full py-6 bg-gradient-to-br from-sky-500 border-sky-500 to-sky-700 text-white font-semibold text-lg hover:scale-[1.02] transition-transform duration-200"
            >
              {isPending ? "Posting..." : "Add Scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
