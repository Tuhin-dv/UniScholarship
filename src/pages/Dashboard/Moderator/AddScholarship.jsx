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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-10 shadow-2xl border border-white/20">
        <h2 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-md">
          🎓 Add Scholarship
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="hidden"
            {...register("email")}
            value="moderator@example.com"
          />

          <input
            {...register("scholarshipName", { required: true })}
            className="input input-bordered w-full "
            placeholder="Scholarship Name"
          />

          <input
            {...register("universityName", { required: true })}
            className="input input-bordered w-full "
            placeholder="University Name"
          />

          <input
            type="file"
            {...register("universityImage", { required: true })}
            className="file-input file-input-bordered w-full "
          />

          <input
            {...register("country", { required: true })}
            className="input input-bordered w-full "
            placeholder="Country"
          />

          <input
            {...register("city", { required: true })}
            className="input input-bordered w-full "
            placeholder="City"
          />

          <input
            type="number"
            {...register("universityRank", { required: true })}
            className="input input-bordered w-full "
            placeholder="World Rank"
          />

          <select
            {...register("subjectCategory", { required: true })}
            className="select select-bordered w-full "
          >
            <option value="">Select Subject</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>

          <select
            {...register("scholarshipCategory", { required: true })}
            className="select select-bordered w-full "
          >
            <option value="">Select Scholarship Type</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>

          <select
            {...register("degree", { required: true })}
            className="select select-bordered w-full "
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>

          <input
            type="number"
            {...register("tuitionFees")}
            className="input input-bordered w-full "
            placeholder="Tuition Fees (Optional)"
          />

          <input
            type="number"
            {...register("applicationFees", { required: true })}
            className="input input-bordered w-full "
            placeholder="Application Fees"
          />

          <input
            type="number"
            {...register("serviceCharge", { required: true })}
            className="input input-bordered w-full "
            placeholder="Service Charge"
          />

          <input
            type="date"
            {...register("deadline", { required: true })}
            className="input input-bordered w-full "
          />

          <input
            type="date"
            {...register("postDate", { required: true })}
            className="input input-bordered w-full "
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="btn w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg hover:scale-[1.02] transition-transform duration-200"
            >
              {isPending ? "Posting..." : "🚀 Add Scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
