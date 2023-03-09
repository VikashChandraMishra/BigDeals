import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/Gplus.png"
import '../styles/print.css';
import signature from '../images/CEOsign.png';

const MOU = () => {

    const [image, setImage] = useState({ src: '' });
    const [data, setData] = useState({ "name": '', "designation": "", "date": "" });
    const navigate = useNavigate(null);

    const [content, setContent] = useState("");

    const fetchShopData = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/fetch-data/fetch-shop-data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        })

        const json = await response.json();

        if (json.success) {
            setImage({ src: json.shop.signature });
            setData({
                name: json.shop.partnerName,
                designation: json.shop.partnerDesignation,
                date: json.shop.date
            })
        } else alert(json.message);
    }

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
        fetchShopData();
        //eslint-disable-next-line
    }, [])

    const printResponsive = () => {
        document.getElementById('print-button').classList.toggle('hidden');
        window.print();
        document.getElementById('print-button').classList.toggle('hidden');
    }
    
    return (
        <div>
            <button id="print-button" className="text-xs md:text-base ml-2 md:ml-44 w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={printResponsive}>Print</button>
            <div id="page" className="text-xs md:text-base w-full md:w-3/4 md:mx-auto my-4 md:my-10 px-4 md:px-8 py-2 md:py-4">

                <table>
                    <thead>
                        <tr>
                            <th>
                                <div>
                                    <img src={logo} alt="unavailable" className="float-right w-24 h-10 md:w-40 md:h-16" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>To: {data.name}, {data.designation}</p>
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
                                            <td className="border-2 md:py-2 md:px-2">Name: {data.name}</td>
                                            <td className="border-2 md:py-2 md:px-2">Name: Sidharth Bedi Varma</td>
                                        </tr>
                                        <tr>
                                            <td className="border-2 py-1 px-1 md:py-2 md:px-2">Signature:
                                                <img src={image.src} className="my-2" width="80px" height="40px" alt="signature appears here" />
                                            </td>
                                            <td className="md:py-2 py-1 px-1 md:px-2">Signature:
                                                <img src={signature} className="my-2" width="100px" height="100px" alt="signature appears here" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border-2 md:py-2 md:px-2">Designation: {data.designation}</td>
                                            <td className="border-2 md:py-2 md:px-2">Designation: Chief Executive Officer</td>
                                        </tr>
                                        <tr>
                                            <td className="border-2 md:py-2 md:px-2">Date: {data.date}</td>
                                            <td className="border-2 md:py-2 md:px-2">Date: {data.date}</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    </tbody>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <tfoot><tr><td>
                        <div>
                            <div>
                                <div className="font-bold">Insight Media (A division of Insight Media Brandcom Private Limited)</div>
                                <div>4-A, 4th Floor, Royal Arcade, B Barooah Road, Ulubari, Guwahati, Assam 781007
                                </div>
                                <div>0361 252 2444 | info@g-plus.in | www.guwahatiplus.com | CIN NO: U74300AS2011PTC010709</div>
                            </div>
                        </div>
                    </td></tr></tfoot>
                </table>
            </div>
        </div>
    )
}

export default MOU;