import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationData from "./ApplicationData";

const Dashboard = () => {

    const navigate = useNavigate(null);
    const [shops, setShops] = useState([]);
    const [formCount, setFormCount] = useState(0);

    useEffect(() => {

        if (localStorage.getItem('user') !== 'admin')
            navigate('/');

        const fetchData = async () => {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/fetch-data/fetch-all-shops`, {
                method: 'GET',

                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const json = await response.json();
            if (json.success) {

                setShops(json.shops);
                var count = 0;

                json.shops.forEach((shop) => {
                    if (shop.signature)
                        count++;
                })

                setFormCount(count);
            }
            else alert("Cannot fetch applications' list at the moment!");
        }
        fetchData();

        //eslint-disable-next-line
    }, [])

    return (
        <div className="w-full md:w-3/4 mx-auto px-3 py-4 md:py-10">
            <p className="text-xs md:text-lg">Number of Registrations: {shops.length}</p>
            <p className="text-xs md:text-lg">Number of Forms Signed: {formCount}</p>
            <div className="overflow-auto">
                <table className="w-full text-xs md:text-base mt-2 md:mt-6 border-2">
                    <thead className="text-xs md:text-base text-green-600 uppercase bg-gray-900">
                        <tr>
                            <th className="px-6 py-3">Application ID</th>
                            <th className="px-6 py-3">Applicant</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Documents Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shops.map((shop) => {
                                return <ApplicationData key={shop._id} shop={shop} />
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashboard;