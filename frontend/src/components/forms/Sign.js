import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';

const Sign = () => {

    const ref = useRef();

    const clear = (e) => { e.preventDefault(); ref.current.clear(); }

    const saveAndSubmit = async (e) => {
        e.preventDefault();

        const signatureString = ref.current.getTrimmedCanvas().toDataURL('image/png')

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/register-signature`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ signature: signatureString })
        })

        const json = await response.json();

        alert(json.message);
    }

    return (
        <div className="bg-blue-200 h-screen">
            <button className="text-xs md:text-base ml-4 md:ml-10 w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
                <Link to="/v/pt/pdf">
                    Print MOU
                </Link>
            </button>
            <div className="mx-auto w-3/4 py-8 flex flex-col justify-center md:px-40">
                <form className="w-full md:w-3/4 mx-auto rounded-lg bg-slate-50 p-8" onSubmit={saveAndSubmit} >
                    <h1 className='text-lg md:text-3xl font-bold text-center'>Sign Here</h1>
                    <SignaturePad ref={ref} canvasProps={{ className: "w-full border-2 my-2 md:my-4 mx-auto" }} />
                    <div className="flex flex-row justify-between">
                        <button className="text-xs md:text-base w-20 md:w-44 my-5 py-2 bg-red-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={clear} >Clear</button>
                        <button className="text-xs md:text-base w-20 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type='submit' >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sign;