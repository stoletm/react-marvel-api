import { Link } from "react-router-dom";
import doge from "../../resources/img/doge.png"

const Page404 = () => {
    return (
        <div>
            <div>
                <img style={{'height': '500px', 'weight': '500px', 'display': 'block', 'margin': '0 auto'}} src={doge} alt="doge" />
                <h1 style={{'fontSize': '50px', 'textAlign': 'center','margin': '30px'}}>Wow, such empty</h1>
                <Link to='/' style={{'font-family':'Roboto Condensed', 'fontSize': '30px', 'textAlign': 'center', 'display': 'block', 'margin': '0 auto', 'text-decoration': 'underline'}}>Back to main page</Link>
            </div>
        </div>
    )
}

export default Page404;