import './singleCharacterLayout.scss';
import { Helmet } from 'react-helmet';

const SingleCharacterLayout = ({data}) => {

    const {name, fullDescription, thumbnail, homepage, wiki} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{fullDescription}</p>
                <div className="single-comic__btns">
                        <a 
                            href={homepage} 
                            className="button button__main" 
                            target="_blank" 
                            rel="noreferrer"
                            >
                                <div className="inner">homepage</div>
                        </a>
                        <a 
                            href={wiki} 
                            className="button button__secondary" 
                            target="_blank" 
                            rel="noreferrer"
                            >
                                <div className="inner">Wiki</div>
                        </a>
                    </div>
            </div>
        </div>
    )
}

export default SingleCharacterLayout;