import React from 'react';
import PropTypes from 'prop-types';

export default function AddForm({newText, addText}) {
    return (
        <form className="form" onSubmit={addText}>
            <textarea className="text" name="text" onChange={newText}></textarea>
            <button className="button" type="submit">Add Note</button>
        </form>
    );
};

AddForm.propTypes = {
    newText: PropTypes.func,
    addText: PropTypes.func
};