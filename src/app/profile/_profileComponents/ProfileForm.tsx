import React from "react";
import { useForm } from "react-hook-form";
import { IUser } from "@/constants";

interface ProfileFormProps {
  user: IUser;
  onSubmit: (data: IUser) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: user,
  });

  const fields = [
    { label: "Name", name: "name" },
    { label: "City", name: "city" },
    { label: "Sub District/Thana", name: "subDistrict" },
    { label: "Post Office", name: "postOffice" },
    { label: "Colony", name: "colony" },
    { label: "Phone Number", name: "number" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-6">
        {fields.map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm mb-1">{field.label}</label>
            <input
              {...register(field.name as keyof IUser, {
                required: `${field.label} is required`,
              })}
              className="w-full bg-white/10 shadow-md dark:bg-gray-800 border-2 border-third hover:border-accent dark:hover:border-accent hover:cursor-pointer dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent outline-none transition-all duration-300"
            />
            {errors[field.name as keyof IUser] && (
              <p className="text-red-400 text-sm mt-1">
                {errors[field.name as keyof IUser]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="pt-6">
        <button
          type="submit"
          className="w-full py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition font-semibold"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
