import React from 'react'
import isbn from 'isbn-utils'

const IsbnElement = ({ ean }) => {

  return ean == '' ? 
    'Unknown'
  : 
    isbn.parse(ean) ? 
      <span>{isbn.parse(ean).asIsbn13()}</span>
    : 
      'Invalid ISBN'
  
}

export default IsbnElement