import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"
import "./Card.css"

class Card extends React.Component {
  render() {
    const { title, date, description } = this.props.node.frontmatter;
    const frontmatter = this.props.node.frontmatter;
    const fluidImg = frontmatter.featuredImage != null ? frontmatter.featuredImage.childImageSharp.fluid : null;
    const { excerpt } = this.props.node;
    const { slug } = this.props.node.fields;
    const text = description || excerpt;

    return (
      <div className="paper">
        <article>
          { fluidImg == null || <Img imgStyle={{margin: "0"}} className="rounded-tr-lg rounded-tl-lg shadow-md" fluid={fluidImg} /> }

          <header>
            <Link to={slug}>
              <h3 style={{marginBottom: rhythm(1/4),}}>{title}</h3>
            </Link>
            <small>{date}</small>
          </header>

          <section>
            <p>{text}</p>
          </section>
        </article>

      </div>
    );
  }
}

export default Card;
