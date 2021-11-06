import React, {useState} from 'react';
import FilmOverview from './tab-overviews';
import FilmDetails from './tab-details';
import FilmReviews from './tab-reviews';
import {Film} from '../../types/film';
import {Review} from '../../types/review';
import {reviews} from '../../mocks/reviews';

enum FilmTabsConst {
  FilmOverviewTab,
  FilmDetailTab,
  FilmReviewTab,
}

type FilmTabsProps = {
  film: Film;
  review: Review;
}

function FilmTabs({film, review}: FilmTabsProps): JSX.Element {

  const [currentTab, setCurrentTab] = useState<FilmTabsConst>(FilmTabsConst.FilmOverviewTab);

  const getOverViewTab = () => {
    setCurrentTab(FilmTabsConst.FilmOverviewTab);
  };

  const getDetailTab = () => {
    setCurrentTab(FilmTabsConst.FilmDetailTab);
  };

  const getReviewTab = () => {
    setCurrentTab(FilmTabsConst.FilmReviewTab);
  };

  return (
    <>
      <div className="film-card__desc">
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li className={currentTab === FilmTabsConst.FilmOverviewTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} onClick={getOverViewTab}>
              <div className="film-nav__link">Overview</div>
            </li>
            <li className={currentTab === FilmTabsConst.FilmDetailTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} onClick={getDetailTab}>
              <div className="film-nav__link">Details</div>
            </li>
            <li className={currentTab === FilmTabsConst.FilmReviewTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'} onClick={getReviewTab}>
              <div className="film-nav__link">Reviews</div>
            </li>
          </ul>
        </nav>
      </div>

      <div className={'film-card__content film-card__content--active'}>
        {currentTab === FilmTabsConst.FilmOverviewTab && <FilmOverview film={film} />}
        {currentTab === FilmTabsConst.FilmDetailTab && <FilmDetails film={film} />}
        {currentTab === FilmTabsConst.FilmReviewTab && <FilmReviews reviews={reviews} />}
      </div>
    </>
  );
}

export default FilmTabs;
