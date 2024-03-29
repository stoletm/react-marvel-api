import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    function updateChar() {
        clearError()

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('fetched'))
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, smallDescription, thumbnail, homepage, wiki} = data;
    
    let blankImgStyle = {};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        blankImgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={blankImgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {smallDescription}
                </p>
                <div className="randomchar__btns">
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

export default RandomChar;