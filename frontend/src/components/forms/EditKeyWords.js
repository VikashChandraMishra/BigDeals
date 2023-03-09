import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditMOU = () => {

    const navigate = useNavigate(null);
    const [content, setContent] = useState("");
    const [text, setText] = useState("");

    const onChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedText = text + '\n';

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/save-mou`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: formattedText })
        })

        const json = await response.json();

        if (json.success) {
            setText("");
        } else alert(json.message);

    }

    useEffect(() => {
        if (localStorage.getItem('user') !== 'admin')
            navigate('/');
        //eslint-disable-next-line
    }, [])

    return (
        <div className="h-screen">
            <div className="py-8 flex flex-col justify-center px-4 md:px-40">
                <form className="w-full mx-auto rounded-lg bg-gray-700 p-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col py-2">
                        <label htmlFor="text" className="text-white text-2xl py-2">Add/Edit KeyWords</label>
                        <textarea name="text" id="text" cols="30" rows="5" value={text} onChange={onChange}></textarea>
                    </div>

                    <div className="text-center">
                        <button className="text-xs md:text-base w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMOU;