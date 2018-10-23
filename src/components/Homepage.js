import * as React from 'react';

export default class Homepage extends React.Component {
  static defaultProps = {
    films: []
  };

  render() {
    const { films } = this.props;
    return (
      <div id="Homepage">
        {films.length ? (
          <div className="films">
            {films.map(film => (
              <a
                className="filmOuter"
                target="__blank"
                href={film.permalink}
                key={film.id}
              >
                <img src={film.images.image[0].src} />
                <div className="filmTitle">{film.title}</div>
              </a>
            ))}
          </div>
        ) : (
          <img className="loader" src="/build/loader.svg" />
        )}
      </div>
    );
  }
}
