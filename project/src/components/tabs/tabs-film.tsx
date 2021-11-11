import React, {useState} from 'react';
import TabFilmOverview from './tab-film-overviews';
import TabFilmDetails from './tab-film-details';
import TabFilmReviews from './tab-film-reviews';
import {Film} from '../../types/film';
import {Review} from '../../types/review';

enum TabsFilmConst {
  FilmOverviewTab,
  FilmDetailTab,
  FilmReviewTab,
}

type FilmTabsProps = {
  film: Film;
  reviews: Review[];
}

function TabsFilm({film, reviews}: FilmTabsProps): JSX.Element {

  const [currentTab, setCurrentTab] = useState<TabsFilmConst>(TabsFilmConst.FilmOverviewTab);

  const setOverViewTab = () => {
    setCurrentTab(TabsFilmConst.FilmOverviewTab);
  };

  const setDetailTab = () => {
    setCurrentTab(TabsFilmConst.FilmDetailTab);
  };

  const setReviewTab = () => {
    setCurrentTab(TabsFilmConst.FilmReviewTab);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={currentTab === TabsFilmConst.FilmOverviewTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} onClick={setOverViewTab}>
            <div className="film-nav__link">Overview</div>
          </li>
          <li className={currentTab === TabsFilmConst.FilmDetailTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} onClick={setDetailTab}>
            <div className="film-nav__link">Details</div>
          </li>
          <li className={currentTab === TabsFilmConst.FilmReviewTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} onClick={setReviewTab}>
            <div className="film-nav__link">Reviews</div>
          </li>
        </ul>
      </nav>
      <div className={'film-card__content film-card__content--active'}>
        {currentTab === TabsFilmConst.FilmOverviewTab && <TabFilmOverview film={film} />}
        {currentTab === TabsFilmConst.FilmDetailTab && <TabFilmDetails film={film} />}
        {currentTab === TabsFilmConst.FilmReviewTab && <TabFilmReviews reviews={reviews} />}
      </div>
    </div>
  );
}

export default TabsFilm;
