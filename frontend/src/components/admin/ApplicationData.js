import { useNavigate } from "react-router-dom";

const ApplicationData = (props) => {

    const navigate = useNavigate(null);

    const { id, shop } = props;
    const { _id, category, shopName, personName, signature } = shop;


    const handleClick = () => {
        navigate('/ad/pt/pdf', { state: { _id: _id } });
    }

    const editShop = () => {
        navigate('/ad/ed/sh', { state: { _id: _id } });
    }

    const deleteShop = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/delete-shop-data`, {
            method: 'DELETE',
            headers: {
                _id: _id
            }
        })

        const json = await response.json();
        if (json.success) {
            alert("Shop data cleared successfully!");
        } else {
            alert("Operation failed!");
        }
    }

    return (
        <tr className="text-center border-2">
            <td className="py-2" onClick={handleClick} style={{ cursor: 'pointer' }} >{id}</td>
            <td>{category ? category : 'N/A'}</td>
            <td>{shopName ? shopName : 'N/A'}</td>
            <td>{personName}</td>
            <td>{signature ? 'Yes' : 'No'}</td>
            <td>
                <button className="mr-2 text-xs md:text-base w-8 md:w-16 my-5 py-2 bg-blue-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={editShop} >Edit</button>
                <button className="mr-2 text-xs md:text-base w-8 md:w-16 my-5 py-2 bg-red-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={deleteShop} >Delete</button>
            </td>
        </tr>
    )
}

export default ApplicationData;