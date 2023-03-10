import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditMOU = () => {

    const navigate = useNavigate(null);
    const [content, setContent] = useState("");
    const [mou, setMOU] = useState({ text: "", boldWord: "", underlinedWord: "" });

    const fetchData = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/fetch-data/fetch-mou`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
            },
        })

        const json = await response.json();
        if (json.success) {
            let totalContent = "";

            for (let i = 0; i < json.mou.text.length; i++) {
                totalContent += json.mou.text[i];

            }
            for (let i = 0; i < json.mou.boldWords.length; i++) {

                if (json.mou.boldWords[i] !== "") {

                    for (let j = 0; j < json.mou.underlinedWords.length; j++) {
                        if (json.mou.underlinedWords[j] === json.mou.boldWords[i])
                            totalContent = totalContent.replaceAll(`${json.mou.boldWords[i]}\n`, `<strong><u>${json.mou.boldWords[i]}</u></strong>`);
                    }

                    totalContent = totalContent.replaceAll(`${json.mou.boldWords[i]}\n`, `<strong>${json.mou.boldWords[i]}</strong>\n`);
                    totalContent = totalContent.replaceAll(` ${json.mou.boldWords[i]} `, ` <strong>${json.mou.boldWords[i]}</strong> `);
                    totalContent = totalContent.replaceAll(` ${json.mou.boldWords[i]}.`, ` <strong>${json.mou.boldWords[i]}</strong>.`);
                }
            }
            for (let i = 0; i < json.mou.underlinedWords.length; i++) {

                if (json.mou.underlinedWords[i] !== "") {
                    totalContent = totalContent.replaceAll(`${json.mou.underlinedWords[i]}\n`, `<u>${json.mou.underlinedWords[i]}</u>\n`);
                    totalContent = totalContent.replaceAll(` ${json.mou.underlinedWords[i]} `, ` <u>${json.mou.underlinedWords[i]}</u> `);
                    totalContent = totalContent.replaceAll(` ${json.mou.underlinedWords[i]}.`, ` <u>${json.mou.underlinedWords[i]}</u>.`);
                }
            }

            totalContent = totalContent.replaceAll('\n', '<br />')
            setContent(totalContent);
        }
        else alert(json.message);
    }

    const onChange = (e) => {
        setMOU({ ...mou, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/save-mou`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: mou.text, boldWord: mou.boldWord, underlinedWord: mou.underlinedWord })
        })

        const json = await response.json();

        if (json.success) {
            setMOU({ text: "", boldWord: "", underlinedWord: "" });
            alert("data saved successfully")
            fetchData();
        } else alert(json.message);

    }

    const deleteContent = async (e) => {
        e.preventDefault();

        const confirmation = window.prompt("Warning! Proceeding with this action will delete all existing content of the MOU and you will have to rewrite it manually. Type 'yes' to proceed and 'no' to return.");

        if (!(confirmation.toUpperCase() === "YES")) return;

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/delete-mou`, {
            method: 'DELETE'
        })

        const json = await response.json();
        if (json.success) {
            setMOU({ text: "", boldWord: "", underlinedWord: "" });
            setContent("");
            alert("MOU data cleared successfully!");
        } else {
            alert("Operation failed!");
        }
    }

    useEffect(() => {

        if (localStorage.getItem('user') !== 'admin')
            navigate('/');

        fetchData();

        //eslint-disable-next-line
    }, [])

    return (
        <div className="h-screen">
            <div className="py-8 flex flex-col justify-center px-4 md:px-40">
                <form className="w-full mx-auto rounded-lg bg-gray-700 p-8" onSubmit={handleSubmit}>
                    <h2 className='text-lg md:text-3xl font-bold text-center text-white'>EDIT MOU</h2>

                    <div className="flex flex-col py-2">
                        <label htmlFor="text" className="text-white text-xl py-2">Add/Edit Text</label>
                        <textarea name="text" id="text" cols="30" rows="5" value={mou.text} onChange={onChange}></textarea>
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="boldWord" className="text-white text-xl py-2">Add Bold Word</label>
                        <input name="boldWord" id="boldWord" value={mou.boldWord} onChange={onChange}></input>
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="underlinedWord" className="text-white text-xl py-2">Add Underlined Word</label>
                        <input name="underlinedWord" id="underlinedWord" value={mou.underlinedWord} onChange={onChange}></input>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:justify-between">
                        <button className="text-xs md:text-base w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">Save</button>
                        <button className="text-xs md:text-base w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={deleteContent}>Delete Current MOU</button>
                        <button className="text-xs md:text-base w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={() => { navigate('/v/pt/pdf') }} >Preview with Letter Head</button>
                    </div>
                </form>
            </div>
            <h2 className="text-lg md:text-2xl text-center">PREVIEW</h2>
            <div className="border-2 md:mx-4 md:h-96 overflow-auto px-4 md:px-40 pb-8 md:pb-16">
                {
                    content.length > 0 ?
                        content.split('\n').map((p) => {
                            if (p !== "")
                                return <div key={p}>
                                    <p dangerouslySetInnerHTML={{ __html: p }}></p>
                                </div>
                            else return '';
                        }) : ''
                }
            </div>

        </div>
    )
}

export default EditMOU;