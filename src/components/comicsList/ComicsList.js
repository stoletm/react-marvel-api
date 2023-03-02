import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsListEnded, setComicsListEnded] = useState(false);
    const [fetching, setFetching] = useState(false);
    
    const {loading, error, getAllComics, clearError} = useMarvelService();


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
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setComicsListEnded(comicsListEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('comics__item-selected'));
        itemRefs.current[id].classList.add('comics__item-selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let blankImgStyle = {};
            
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                blankImgStyle = {'objectFit' : 'contain'};
            }
            
            return (
                <li 
                    className="comics__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onComicsSelected(item.id);
                        focusOnItem(i);
                    }}
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
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}

            {loading && newItemLoading ? <Spinner/> : (
                <button 
                    className="button button__main button__long"
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            )}
        </div>
    )
}

export default ComicsList;