import { useField } from "formik";

const SelectInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-white text-xs md:text-base">{label}</label>
            <select className={`rounded-lg w-full ${props.width} text-xs md:text-base mt-2 p-2 focus:border-blue-500 border-4`} {...field} {...props} >
                {
                    props.options.map((option) => {
                        return <option key={option} value={option}>{option}</option>
                    })
                }
            </select>
            {meta.touched && meta.error ? (
                <div className="error text-red-500">{meta.error}</div>
            ) : null}
        </>
    );
};

export default SelectInput;