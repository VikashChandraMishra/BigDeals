const FileInput = ({ label, ...props }) => {

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-white text-xs md:text-base">{label}</label>
            <input className={`rounded-lg w-32 ${props.width} text-xs md:text-base mt-2 p-2 focus:border-blue-500`} type="file" />
        </>
    );
};

export default FileInput;