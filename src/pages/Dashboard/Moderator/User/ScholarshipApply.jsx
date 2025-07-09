import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

const ScholarshipApply = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Fetch scholarship detail by id
    const { data: scholarship, isLoading, error } = useQuery({
        queryKey: ["scholarship", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships/${id}`);
            return res.data;
        },
    });

    const [formData, setFormData] = useState({
        phone: "",
        photoUrl: "",
        address: "",
        gender: "",
        degree: "",
        sscResult: "",
        hscResult: "",
        studyGap: "No",
    });

    const [isPaid, setIsPaid] = useState(false);
    const [loading, setLoading] = useState(false);

    if (isLoading) return <div className="text-center py-20">Loading...</div>;
    if (error)
        return (
            <div className="text-center text-red-500">Failed to load scholarship.</div>
        );
    if (!scholarship)
        return <div className="text-center">Scholarship not found.</div>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePayment = () => {
        setIsPaid(true);
        toast.success("Payment successful! Now submit your application.");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPaid) {
            toast.error("Please complete payment before submitting.");
            return;
        }

        setLoading(true);

        const applicationData = {
            scholarshipId: id,
            scholarshipName: scholarship.scholarshipName,
            universityName: scholarship.universityName,
            userPhone: formData.phone,
            userPhoto: formData.photoUrl,
            userAddress: formData.address,
            gender: formData.gender,
            degree: formData.degree,
            sscResult: formData.sscResult,
            hscResult: formData.hscResult,
            studyGap: formData.studyGap,
            applicationDate: new Date().toISOString(),
            userName: user?.displayName || user?.name || "Anonymous",
            userEmail: user?.email || "NoEmail",
            status: "Pending"

        };

        try {
            const res = await axiosSecure.post("/applications", applicationData);
            if (res.data.insertedId) {
                toast.success("Application submitted successfully!");
                setLoading(false);
                setFormData({
                    phone: "",
                    photoUrl: "",
                    address: "",
                    gender: "",
                    degree: "",
                    sscResult: "",
                    hscResult: "",
                    studyGap: "No",
                });
                setIsPaid(false);
            } else {
                throw new Error("Failed to submit application");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit application. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg my-12">
            <h2 className="text-3xl font-bold mb-8 text-purple-700">
                Apply for: {scholarship.scholarshipName}
            </h2>

            <div className="mb-8 text-gray-700 space-y-2">
                <p>
                    <strong>University:</strong> {scholarship.universityName}
                </p>
                <p>
                    <strong>Category:</strong> {scholarship.scholarshipCategory}
                </p>
                <p>
                    <strong>Application Fees:</strong>{" "}
                    <span className="font-semibold">${scholarship.applicationFees}</span>
                </p>
            </div>

            {!isPaid && (
                <button
                    onClick={handlePayment}
                    className="mb-8 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-md text-lg font-semibold hover:opacity-90 transition"
                >
                    Pay ${scholarship.applicationFees} to Apply
                </button>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-medium">Phone Number</label>
                    <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="input input-bordered w-full"
                        disabled={!isPaid}
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Photo URL</label>
                    <input
                        required
                        type="url"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleChange}
                        placeholder="Paste your photo URL"
                        className="input input-bordered w-full"
                        disabled={!isPaid}
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Address</label>
                    <textarea
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Village, District, Country"
                        className="textarea textarea-bordered w-full"
                        disabled={!isPaid}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 font-medium">Gender</label>
                        <select
                            required
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            disabled={!isPaid}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Degree</label>
                        <select
                            required
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            disabled={!isPaid}
                        >
                            <option value="">Select Degree</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Masters">Masters</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 font-medium">SSC Result</label>
                        <input
                            required
                            type="text"
                            name="sscResult"
                            value={formData.sscResult}
                            onChange={handleChange}
                            placeholder="e.g., 5.00 or A+"
                            className="input input-bordered w-full"
                            disabled={!isPaid}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">HSC Result</label>
                        <input
                            required
                            type="text"
                            name="hscResult"
                            value={formData.hscResult}
                            onChange={handleChange}
                            placeholder="e.g., 4.80 or A"
                            className="input input-bordered w-full"
                            disabled={!isPaid}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Study Gap</label>
                    <select
                        name="studyGap"
                        value={formData.studyGap}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        disabled={!isPaid}
                    >
                        <option value="No">No Study Gap</option>
                        <option value="Yes">Yes, I have study gap</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={!isPaid || loading}
                    className="w-full bg-green-600 text-white py-4 rounded-md font-semibold disabled:opacity-50 hover:bg-green-700 transition"
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

export default ScholarshipApply;
