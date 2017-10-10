import React from 'react';

const Card = (props) => {
    return (
            <div className="col-sm-4">
                <div className="card" style={{width: '20rem'}}>

                    <a href={props.html_url}><img className="card-img-top rounded-right" src={props.avatar_url}
                                                  alt={'Photo of' + props.login}/></a>
                    <div className="card-body">
                        <h4 className="card-title">{props.login}</h4>
                        <p className="card-text"><a href={ props.company}>{props.company}</a></p>
                        <a href={ props.html_url} className="btn btn-primary">{props.html_url}</a>
                    </div>
                </div>
            </div>

    )
};

export default Card;