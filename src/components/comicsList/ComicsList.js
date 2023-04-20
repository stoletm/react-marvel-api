import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'fetched':
            return <Component/>
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const {getAllComics, clearError, _baseOffset, process, setProcess} = useMarvelService();
    
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(_baseOffset);
    const [comicsListEnded, setComicsListEnded] = useState(false);
    const [fetching, setFetching] = useState(false);
    


    // На случай двойной загрузки из-за строгого режима
    useEffect(() => {
        if (fetching) {
            onRequest(offset, true);
            setFetching(false)
        }
    }, [fetching]);

    useEffect(() => {
        setFetching(true);
    }, [])

    const onRequest = (offset, initial) => {
        clearError()
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('fetched'));
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsListEnded(ended);
    }

    function renderItems(arr) {
        const items =  arr.map((item) => {
            let blankImgStyle = {};
            
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                blankImgStyle = {'objectFit' : 'contain'};
            }
            
            return (
                <CSSTransition timeout={300} key={item.id} classNames={"comics__item"}>
                    <li 
                        className="comics__item"
                        tabIndex={0}
                        key={item.id}
                    >
                        <Link to={`/comics/${item.id}`}>
                            <img 
                                src={item.thumbnail} 
                                alt={item.title} 
                                style={blankImgStyle}
                                className='comics__item-img'
                            />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}

            {process === 'loading' && newItemLoading 
                ? <Spinner/> 
                : (
                    <button 
                        className="button button__main button__long"
                        style={{'display' : comicsListEnded ? 'none' : 'block'}}
                        onClick={() => onRequest(offset)}>
                        <div className="inner">load more</div>
                    </button>
                )
            }
        </div>
    )
}

export default ComicsList;