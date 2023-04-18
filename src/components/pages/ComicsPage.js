import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner"
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel comics list page"/>
                <title>Comics list</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage