import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';

const Sign = () => {

    const navigate = useNavigate(null);

    const ref = useRef();
    const [data, setData] = useState({ "name": '', "designation": "", "date": "" });
    const clear = (e) => { e.preventDefault(); ref.current.clear(); }

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
    })

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const saveAndSubmit = async (e) => {
        e.preventDefault();

        const signatureString = ref.current.getTrimmedCanvas().toDataURL('image/png')

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/register-signature`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ signature: signatureString, data: data })
        })

        const json = await response.json();

        alert(json.message);
        setData({ "name": '', "designation": "", "date": "" });
    }

    return (
        <div className="bg-blue-200 h-full px-2">
            <Link to="/v/pt/pdf">
                <button className="text-xs md:text-base ml-4 md:ml-10 w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
                    Print&Download
                </button>
            </Link>
            <div className="mx-auto w-full md:w-3/4 py-8 flex flex-col justify-center md:px-40">
                <form className="w-full md:w-3/4 mx-auto rounded-lg bg-slate-50 px-2 md:p-8" onSubmit={saveAndSubmit} >
                    <h1 className='text-lg md:text-3xl font-bold text-center'>Enter partner details</h1>

                    <label htmlFor="name" className='text-xs md:text-base'>Partner Name</label>
                    <input type="text" className='rounded-lg w-full text-xs md:text-base mt-2 p-2 focus:border-blue-500 border-4' id='name' name='name' value={data.name} onChange={onChange} required />

                    <label htmlFor="designation" className='text-xs md:text-base'>Name and Designation of the Concerned Person</label>
                    <input type="text" className='rounded-lg w-full text-xs md:text-base mt-2 p-2 focus:border-blue-500 border-4' id='designation' name='designation' value={data.designation} onChange={onChange} required />

                    <label htmlFor="Date" className='text-xs md:text-base'>Date</label>
                    <input type="date" className='rounded-lg w-full text-xs md:text-base mt-2 p-2 focus:border-blue-500 border-4' id='date' name='date' value={data.date} onChange={onChange} required />

                    <h1 className='text-lg md:text-2xl font-bold mt-2 md:mt-4'>Sign Here</h1>
                    <SignaturePad ref={ref} canvasProps={{ className: "w-full border-2 my-2 md:my-4 mx-auto h-40" }} />
                    <div className="flex flex-row justify-between">
                        <button className="text-xs md:text-base w-20 md:w-44 my-5 py-2 bg-red-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={clear} >Clear Signature</button>
                        <button className="text-xs md:text-base w-20 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type='submit' >Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sign;