import React from 'react';

type ShowMoreProps = {
  onLoadMore: () => void;
};

export default function ShowMore({onLoadMore}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onLoadMore}>Show more</button>
    </div>
  );
}
