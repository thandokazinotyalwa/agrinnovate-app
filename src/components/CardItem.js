import React from 'react';
import { Link } from 'react-router-dom';

function CardItem () {
    return (
        <>
           < li className='cards__items'>
                <Link className='cards__item__link'>
                <figure className='cards__item__pic-wrap'>
                    <img src='/' alt='Travel image' className='cards_item_img'>
                    
                    </img>
                </figure>
                <div className='cards_item_info'>

                </div>
                </Link>
           </li>
        </>
    );
}

export default CardItem;