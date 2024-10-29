interface Props {
    label: string;
    name: string;
    register: any;
    validation?: any;
    errors: any;
    placeholder: string;
}
const TextInputKYC = ({ label, name, register, validation, errors, placeholder }: Props) => (
    <>
      <label className="block mb-3 text-gray-700 font-bold">{label}</label>
      <input
        type="text"
        {...register(name, validation)}
        className={`w-full px-3 py-2 border rounded-xl focus:outline-none ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
    </>
  );
  
export default TextInputKYC