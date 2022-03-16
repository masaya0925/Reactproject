/* eslint-disable react/prop-types */
import React from 'react'

function Person({ persons, remove }) {
    return (
        <li>
            {persons.name}
            {' '}
            {persons.number}
            {' '}
            <button onClick={() => remove(persons.id, persons.name)}>delete</button>
        </li>
    )
}

export default Person
