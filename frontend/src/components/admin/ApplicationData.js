import { useNavigate } from "react-router-dom";

const ApplicationData = (props) => {
    
    const navigate = useNavigate(null);

    const { shop } = props;
    const { _id, category, shopName, personName, signature } = shop;


    const handleClick = (e) => {
        navigate('/ad/pt/pdf', {state: {_id: _id}});
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
        if(json.success) {
            alert("Shop data cleared successfully!");
        } else {
            alert("Operation failed!");
        }
    }

    return (
        <tr className="text-center border-2">
            <td className="py-2" onClick={handleClick} style={{cursor: 'pointer'}} >{_id}</td>
            <td>{category}</td>
            <td>{shopName}</td>
            <td>{personName}</td>
            <td>{signature ? 'Yes':'No'}</td>
            <td><button className="mr-2 text-xs md:text-base w-20 md:w-32 my-5 py-2 bg-red-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={deleteShop} >Delete</button></td>
        </tr>
    )
}

export default ApplicationData;