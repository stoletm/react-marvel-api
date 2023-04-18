import {useState, useEffect, useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {
    const {loading, error, getAllCharacters, _baseOffset} = useMarvelService();
    
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState();
    // eslint-disable-next-line no-unused-vars
    const [charListEnded, setCharListEnded] = useState(false);
    const [fetching, setFetching] = useState(false);
    

    useEffect(() => {
        if (fetching) {
            onRequest(offset, true);
            setFetching(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching]);

    useEffect(() => {
        setFetching(true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharListEnded(charListEnded => ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let blankImgStyle = {};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
                blankImgStyle = {'objectFit' : 'contain'};
            }
            
            return (
                <CSSTransition timeout={300} key={item.id} classNames={"char__item"}>
                    <li 
                        className="char__item"
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el}
                        key={item.id}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}>
                            <img src={item.thumbnail} alt={item.name} style={blankImgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}

                </TransitionGroup>
            </ul>
        )
    }
    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            {loading && newItemLoading ? <Spinner/> : (
                <button 
                    className="button button__main button__long"
                    style={{'display' : charListEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            )}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;