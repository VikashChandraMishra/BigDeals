import { useField } from 'formik';

const TextAreaInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-white text-xs md:text-base">{label}</label>
            <textarea className="rounded-lg w-full md:w-96 text-xs md:text-base mt-2 p-2 focus:border-blue-500 border-4" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error text-red-500">{meta.error}</div>
            ) : null}
        </>
    );
};

export default TextAreaInput;