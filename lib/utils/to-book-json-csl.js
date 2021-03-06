const getCountry = require('./get-country');


module.exports = toJsonCsl;


/**
 * @param {ApostropheCMS Piece} piece
 * @param {Object} options
 * - locale {String}
 */
function toJsonCsl(piece, options) {
  // error checks
  if (!piece) {
    throw new Error(
      'toJsonCsl() expected an Apostrophe piece, '
      + 'but nothing was provided.'
    );
  }

  const { locale } = options;

  let response = {};

  // === TITLE ===
  if (piece.subtitle) {
    response.title = `${piece.title}: ${piece.subtitle}`;
  } else {
    response.title = piece.title;
  }
  response['title-short'] = piece.title;

  // === PEOPLE ===

  // authors
  const authors = [];
  if (piece._author) {
    piece._author.forEach(a => {
      authors.push({
        given: a.firstName,
        family: a.lastName,
      });
    });
  }
  response.author = authors;

  // editors
  const editors = [];
  if (piece._editor) {
    piece._editor.forEach(e => {
      editors.push({
        given: e.firstName,
        family: e.lastName,
      });
    });
  }
  response.editor = editors;

  // translator
  if (piece._translator) {
    response.translator = [];
    piece._translator.forEach(t => {
      response.translator.push({
        given: t.firstName,
        family: t.lastName,
      });
    });
  }

  // === PUBLICATION ===

  // date
  response.issued = {
    'date-parts': [[piece.yearPublished]],
  };

  // publication type
  response.type = 'book';

  // publisher
  response.publisher = piece.publisherName;

  // place
  let publisherPlace = `${piece.publisherCity}, `;
  if (piece.publisherState) {
    publisherPlace += `${piece.publisherState}, `;
  }
  if (locale) {
    publisherPlace += getCountry(piece.publisherCountry, locale);
  } else {
    publisherPlace += piece.publisherCountry;
  }

  response['publisher-place'] = publisherPlace;

  return response;
}
