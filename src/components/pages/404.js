import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import rocket from "../../resources/img/sad-rocket.gif"

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="404 page"/>
                <title>Oops..</title>
            </Helmet>
            <div>
                <img style={{'height': '500px', 'weight': '500px', 'display': 'block', 'margin': '0 auto'}} src={rocket} alt="doge" />
                <h1 style={{'fontSize': '50px', 'textAlign': 'center','margin': '30px'}}>{`Oops, nothing there:(`}</h1>
                <Link to='/' style={{'font-family':'Roboto Condensed', 'fontSize': '30px', 'textAlign': 'center', 'display': 'block', 'margin': '0 auto', 'text-decoration': 'underline'}}>Back to main page</Link>
            </div>
        </div>
    )
}

export default Page404;