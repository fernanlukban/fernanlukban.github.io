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
            <h4 className="tag">#{tag}</h4>
          </Link>
        </>
      );
    });

    return (
      <div className="tagBar">
        <h4 style={{display: "inline"}}>tags: </h4>
        {tagComponents}
      </div>
    );
  }
}

export default TagBar;
