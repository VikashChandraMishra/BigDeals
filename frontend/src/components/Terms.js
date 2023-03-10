import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {

    const navigate = useNavigate(null);
    const [content, setContent] = useState("");

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

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
        fetchData();
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="text-xs md:text-base w-full md:w-3/4 md:mx-auto my-4 md:my-10 px-4 md:px-8 py-2 md:py-4 border-2">
                <p>To: </p>
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
                <p>Approvals to Proceed:</p>
                <br />

                <table className="w-full md:-3/4 mx-auto border-2">
                    <thead>
                        <tr>
                            <th className="border-2 text-center">Accepted by the Partner</th>
                            <th className="border-2 text-center">Accepted by the Insight Media</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-2 md:py-2 md:px-2">Name: </td>
                            <td className="border-2 md:py-2 md:px-2">Name: </td>
                        </tr>
                        <tr>
                            <td className="border-2 py-1 px-1 md:py-2 md:px-2">Signature: </td>
                            <td className="flex flex-row md:py-2 md:px-2">Signature:
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2 md:py-2 md:px-2">Designation: </td>
                            <td className="border-2 md:py-2 md:px-2">Designation:</td>
                        </tr>
                        <tr>
                            <td className="border-2 md:py-2 md:px-2">Date:</td>
                            <td className="border-2 md:py-2 md:px-2">Date:</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button id="next-button" className="text-xs md:text-base ml-2 md:ml-44 w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={() => navigate('/v/fin')}>Next</button>
        </div>
    )
}

export default Terms;