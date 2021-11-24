import React from 'react'

const PersonForm = ({addNumbers, newName, newNum, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit = {addNumbers}>
      <div>
        name: <input value = {newName}
                  onChange = {handleNameChange}/>
      </div>
      <div>
        number: <input value = {newNum}
                    onChange = {handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
