import { useNavigate } from "react-router-dom";

const ApplicationData = (props) => {
    
    const navigate = useNavigate(null);

    const { shop } = props;
    const { _id, category, shopName, personName } = shop;


    const handleClick = (e) => {
        navigate('/ad/pt/pdf', {state: {_id: e.target.innerText}});
    }

    return (
        <tr className="text-center border-2">
            <td className="py-2" onClick={handleClick} style={{cursor: 'pointer'}} >{_id}</td>
            <td>{category}</td>
            <td>{shopName}</td>
            <td>{personName}</td>
        </tr>
    )
}

export default ApplicationData;