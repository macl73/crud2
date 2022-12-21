import React from 'react';
import PropTypes from 'prop-types';

class RenderNotes extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        onDelete: PropTypes.func
    };
    
    render() {

        const {data} = this.props;

        return (
            <div className="notes">
                {data?.map((note, index) => <div key={index} className={`note-${note.id}`}>
                    <button type="submit" className="button button-delete" onClick={() => this.props.onDelete(note.id)}>Del Note</button>
                    <div>{note.text}</div>
                </div>)}
            </div>
        );
    };
};

export default RenderNotes;