import React from 'react'

const FindCountries = ({find, handler}) => {
  return(
    <form>
      <div>
        find countrie <input value = {find}
                          onChange = {handler} />
      </div>
    </form>
  )
}

export default FindCountries
