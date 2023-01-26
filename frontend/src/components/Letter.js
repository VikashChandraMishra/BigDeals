import { useEffect, useState } from "react";
import logo from "../images/Gplus.png"

const Letter = () => {

    const [image, setImage] = useState({ src: '' });

    useEffect(() => {

        const fetchData = async () => {

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
            } else alert(json.message);
        }

        fetchData();

    }, [])

    const print = () => {
        const printButton = document.getElementById('print-button');
        printButton.style.display = 'none';
        window.print();
        printButton.style.display = 'initial';
    }

    return (
        <div>
            <button id="print-button" className="text-xs md:text-base ml-2 md:ml-44 w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" onClick={print}>Print</button>
            <div className="text-xs md:text-base w-full md:w-3/4 md:mx-auto my-4 md:my-10 px-4 md:px-8 py-2 md:py-4 border-2">

                <img src={logo} alt="unavailable" className="mx-auto w-32 h-12 mb-4 md:mb-10 md:w-40 md:h-16" />

                <b><u>Sub: Invitation to Partner with G Plus Big Deals</u></b>
                <br />
                <br />

                <p>Dear Partner,</p>
                <br />

                <p>You may know G Plus as the most popular English media brand in Guwahati. With a community of about 7,00,000 people, G Plus is not only the most trusted and credible media brand, but is also recognized as the most youthful, dynamic, energetic and pro-public brand in the city today.</p><br />

                <p>Over the past 9 years, we have grown our community with the newspaper, website, mobile application on Android and iOS and social media where we command a reach of over 30 million views each month.</p><br />

                <p>Our journey has come a full-circle where we intend to consolidate all our focus into an all-new app - Guwahati's Truly Local App.</p><br />

                <p>As a part of our continuous effort to offer the latest news and information on various topics and make our readers feel privileged, we are launching a feature titled Big Deals on the all-new G Plus app – both on Android and iOS.</p><br />

                <p>The Big Deal offer will be available for the subscribers of the G Plus app and we invite your esteemed establishment to offer special discounts and benefits to the subscribers of G Plus App, which at present has 1,00,000+ downloads with a rating of 4.2 in the Google Play store. </p><br />

                <p>In lieu of the offers, G Plus also ensures the following for your establishment:</p><br />

                <ul>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-	Promotion and publicity of your brand and its various offers on G Plus App along with other G Plus profiles on social media.

                    </li>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-	Generate buzz about your brand and the various events, promotions and campaigns you may run to attract footfall via the G Plus app.
                    </li>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-	Send notifications and alerts about your brands’ offerings via geo-location monitoring.
                    </li>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-	By partnering with G Plus you have direct access to the specific target audience and will be able to offer customized deals.
                    </li>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-	You will have full control of the deals and will be open to modify, update deals depending on the performance, occasion etc.
                    </li>
                </ul><br />

                <p>The all-new G Plus app will be available on both Google Play Store and iOS platforms. The app will be launched with a huge 360° media campaign primarily on digital platforms and will be extended through outdoor hoardings and print advertisements to reach out to maximum audiences.</p><br />

                <p>
                    The offers listed on the app will be available to the subscribers and thus will result in higher footfall and orders to your enterprise.
                </p><br />

                <p>The offers will be listed as Big Deal in the G Plus App with details of the establishments such as logo, address, contact details and offer details. The deals will have a specific Coupon Code linked with the subscribers registered phone number.</p>
                <br />

                <p>I look forward to your association with us via the Big Deals to offer the best of your services to the citizens of Guwahati.</p>
                <br />

                <p>Your questions about the partnership may be addressed to the person sharing this letter or the undersigned!</p>
                <br />

                <p>Regards,</p>
                <br />

                <span>Sidharth Bedi Varma</span><br />
                <span>Chief Executive Officer</span><br />
                <span>G Plus </span><br />

                <h3 className="text-center font-bold">Terms and Conditions</h3>
                <br />

                <p>Following are the terms of the understanding between the parties for ‘Big Deal’ promoted by G Plus:</p>
                <br />

                <ol>
                    <li>
                        1.	The service provider assures that it complies with all applicable laws and regulations.
                    </li>
                    <li>
                        2.	The service provider assures that the service offered to the Customer are of best standard.
                    </li>
                    <li>
                        3.	The service provider assures that in case of any change in the services offered in regards to, but not limited to its address, phone number, services, prices etc. will be notified to G Plus immediately.
                    </li>
                    <li>
                        4.	The service provider confirms that it has all the required licences and compliance certificates for the operation of the business.
                    </li>
                    <li>
                        5.	The service provider confirms that the information, photographs of the establishment can be used and processed freely by G Plus without infringing intellectual property rights or other rights of third parties.
                    </li>
                    <li>
                        6.	In case of any copyright issue, the service provider agrees to bear the sole responsibility against any such claims and G Plus shall not be responsible for the same. Moreover, the service provider shall be liable to compensate, in the event of any loss/damages incurred by G Plus against such claims.
                    </li>
                    <li>
                        7.	The service provider will honour offers registered on G Plus’ platform for the period, the same has been initiated. In case of any error or change in accepting customer coupons, the service provider will notify the same to G Plus via formal communication.
                    </li>
                    <li>
                        8.	G Plus will have the right to promote offers from respective service providers in different promotional platforms to popularise the offers.
                    </li>
                    <li>
                        9.	The service provider has the right to list and promote new offers on G Plus platform at its own discretion. On notifying the same G Plus will amend the offers on its platform.
                    </li>
                    <li>
                        10.	The offers listed on G Plus should be exclusive in nature and similar offer should not be offered on any other platform.
                    </li>
                    <li>
                        11.	 All disputes are subject to Guwahati jurisdiction only.
                    </li>
                </ol>
                <br />

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
                                <img src={image.src} width="80px" height="40px" alt="signature appears here" />
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
        </div>
    )
}

export default Letter;