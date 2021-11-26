import React from 'react';

type ShowMoreProps = {
  onLoadMore: () => void;
};

function ShowMore({onLoadMore}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onLoadMore}>Show more</button>
    </div>
  );
}

export default ShowMore;
