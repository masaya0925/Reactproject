/* eslint-disable react/prop-types */
import React from 'react'
import Person from './Person'

function Persons({ persons, newFilter, remove }) {
    return (
        <ul>
            {persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())).map((person) => <Person key={person.name} persons={person} remove={remove} />)}
        </ul>
    )
}

export default Persons
