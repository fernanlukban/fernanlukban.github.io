const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagPage = path.resolve(`./src/components/tag-page.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              id
              excerpt(pruneLength: 160)
              html
              frontmatter {
                title
                tagList
                description
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  let tags = {};

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    post.node.frontmatter.tagList.split(" ").forEach((tag) => {
      if (tag.toLowerCase() in tags) {
        tags[tag.toLowerCase()].push(post);
      } else {
        tags[tag.toLowerCase()] = [post];
      }
    });

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  for (var tag in tags) {
    createPage({
      path: `/${tag}/`,
      component: tagPage,
      context: {
        tag: tag,
        tagPosts: tags[tag],
      }
    });

    console.log(tag);
    tags[tag].forEach((post, index) => {
      const previous = index <= 0 ? null : tags[tag][index - 1].node
      const next = index === tags[tag].length - 1 ? null : tags[tag][index + 1].node

      createPage({
        path: `/${tag}${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
