import React from "react"
import { Link } from "gatsby"

import "./TagBar.css"

class TagBar extends React.Component {
  render () {
    const tags = this.props.tagList.split(" ");
    const tagComponents = tags.sort()
    .map((tag) => {
      return (
        <>
          <Link to={tag}>
            <small className="tag">#{tag}</small>
          </Link>
        </>
      );
    });

    return (
      <div className="tagBar">
        <small style={{display: "inline"}}>tags: </small>
        {tagComponents}
      </div>
    );
  }
}

export default TagBar;
