import React from "react"

import Card from "./Card"
import Layout from "./layout"
import SEO from "./seo"

class TagPage extends React.Component {
  render() {
    const { pageContext } = this.props;
    const { tag, tagPosts } = pageContext;

    return (
      <Layout location={tag} title={`#${tag}`}>
        <SEO title={`All ${tag} posts`} />
          <hr/>
          {tagPosts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              console.log(node)
              return (
                <>
                  <Card key={node.fields.slug} node={node} tag={tag}/>
                  <hr/>
                </>
              )
          })}
      </Layout>
    );
  }
}

export default TagPage
