import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"
import "./Card.css"

import TagBar from "./TagBar"

class Card extends React.Component {
  render() {
    const { title, date, description, tagList } = this.props.node.frontmatter;
    const frontmatter = this.props.node.frontmatter;
    const fluidImg = frontmatter.featuredImage != null ? frontmatter.featuredImage.childImageSharp.fluid : null;
    const { excerpt } = this.props.node;
    const { tag } = this.props;
    const { slug } = this.props.node.fields;
    const text = description || excerpt;
    const link = tag ? `/${tag}${slug}` : slug;

    return (
      <div className="paper">
        <article className="articleText">

          <header>
            <Link to={link}>
              <h1 className="postTitle">{title}</h1>
            </Link>
            <TagBar tagList={tagList} />
            <small className="date">{date}</small>
          </header>

          { fluidImg == null || <Img className="cardImage" imgStyle={{margin: "0"}} fluid={fluidImg} /> }

          <section>
            <p>{text}</p>
          </section>
        </article>

      </div>
    );
  }
}

export default Card;
