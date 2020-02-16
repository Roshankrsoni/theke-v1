import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const FeaturedPosts = ({ posts }) => {
  const vedette = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "en-vedette" } } }
      ) {
        edges {
          node {
            frontmatter {
              selection {
                post1
                post2
                post3
              }
            }
          }
        }
      }
    }
  `)
  const postlist = vedette.allMarkdownRemark.edges[0].node.frontmatter.selection
  const filtredPosts = posts.filter(edge => {
    if (edge.node.frontmatter.titre === postlist.post1) {
      return true
    }
    if (edge.node.frontmatter.titre === postlist.post2) {
      return true
    }
    if (edge.node.frontmatter.titre === postlist.post3) {
      return true
    }
    return false
  })

  return (
    <div className="featured-posts">
      {!!filtredPosts &&
        filtredPosts.map(post => {
          return <PostsBoxs key={`card_${post.node.id}`} post={post} />
        })}
    </div>
  )
}

export default FeaturedPosts

export const PostsBoxs = ({ post }) => {
  return (
    <div
      className="post-box"
      style={{
        backgroundImage: `url(${post.node.frontmatter.coverture.childImageSharp.fluid.src})`,
      }}
    >
      <div className="over-box">
        <h3>{post.node.frontmatter.titre}</h3>
        <p>{post.node.frontmatter.description}</p>
      </div>
        <Link to={`/article/${post.node.fields.slug}`}>
        <span>lire la suite &#8594;</span>
        </Link>
    </div>
  )
}
