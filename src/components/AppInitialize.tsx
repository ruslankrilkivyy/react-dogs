import React from 'react';
import classNames from 'classnames';

import logoSvg from '../assets/img/logo.svg';
import voteTablePng from '../assets/img/vote-table.png';
import petBreedsPng from '../assets/img/pet-breeds.png';
import galleryPng from '../assets/img/images-search.png';
import eyeSvg from '../assets/img/eye.svg';
import closeEyeSvg from '../assets/img/close-eye.svg';

import { Link, Route, useLocation } from 'react-router-dom';
import { Promo } from '../components';
import {
  BreedsPage,
  DislikesPage,
  DogPage,
  FavoritesPage,
  GalleryPage,
  LikesPage,
  VotePage,
} from '../pages';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../store/RootState.Context';

const menuArr = [
  { id: 1, title: 'Voting', img: voteTablePng, color: '#B4B7FF', link: 'vote' },
  { id: 2, title: 'BREEDS', img: petBreedsPng, color: '#97EAB9', link: 'breeds' },
  { id: 3, title: 'gallery', img: galleryPng, color: '#FFD280', link: 'gallery' },
];

const AppInitialize = observer(() => {
  let location = useLocation();
  const { dogsStore } = useRootStore();

  React.useEffect(() => {
    dogsStore.isDarkMode
      ? document.querySelector<HTMLElement>('body')?.classList.add('dark')
      : document.querySelector<HTMLElement>('body')?.classList.remove('dark');
  }, [dogsStore.isDarkMode]);

  return (
    <div className="box">
      <div className="container">
        <div className="box-wrapper">
          <div className="left-section">
            <div className="top">
              <Link to="/">
                <img src={logoSvg} alt="logo svg" />
              </Link>
              <div className="toggle-mode">
                <div
                  className={classNames({
                    'toggle-mode-icon': !dogsStore.isDarkMode,
                    'toggle-mode-icon dark': dogsStore.isDarkMode,
                  })}>
                  {!dogsStore.isDarkMode ? (
                    <img src={eyeSvg} alt="eye svg" />
                  ) : (
                    <img src={closeEyeSvg} alt="close eye svg" />
                  )}
                </div>
                <button
                  className={classNames({
                    'toggle-mode__btn': !dogsStore.isDarkMode,
                    'toggle-mode__btn dark': dogsStore.isDarkMode,
                  })}
                  onClick={() => dogsStore.setDarkMode(!dogsStore.isDarkMode)}>
                  <span></span>
                </button>
              </div>
            </div>
            <div className="intro">
              <h1 className="intro__title">Hi user!</h1>
              <p className="intro__text">Welcome to React Dogs</p>
              <h2 className="intro__suptitle">Lets start using React Dogs</h2>
              <nav className="navigation">
                <ul className="menu">
                  {menuArr.map((item) => (
                    <li key={item.id} className="menu__item">
                      <Link
                        to={`/${item.link}`}
                        className={classNames({
                          'menu__item-link active':
                            location.pathname.includes(item.link) || location.pathname === '/dog',
                          'menu__item-link':
                            location.pathname !== '/dog' || !location.pathname.includes(item.link),
                        })}>
                        <div
                          className="menu__item-top"
                          style={{ backgroundColor: `${item.color}` }}>
                          <img src={item.img} alt="item png" />
                        </div>
                        <div className="menu__item-bottom">
                          <span>{item.title}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="right-section">
            <Route path="/" component={Promo} exact />
            <Route path="/vote" component={VotePage} />
            <Route path="/breeds" component={BreedsPage} exact />
            <Route path="/breeds/dog" component={DogPage} exact />
            <Route path="/gallery" component={GalleryPage} />
            <Route path="/likes" component={LikesPage} />
            <Route path="/dislikes" component={DislikesPage} />
            <Route path="/favorites" component={FavoritesPage} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppInitialize;
