import React from "react"
import thekeLogo from "../../static/thekeLogo.svg"
import { Link } from "gatsby"
import iconFb from "../../static/assets/facebook.svg"
import iconIg from "../../static/assets/instagram.svg"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "informations" } } }
      ) {
        edges {
          node {
            frontmatter {
              informations {
                aproposMini
                email
                telephone
                facebook
                instagram
              }
            }
          }
        }
      }
    }
  `)

  const {
    aproposMini,
    email,
    telephone,
    facebook,
    instagram,
  } = data.allMarkdownRemark.edges[0].node.frontmatter.informations

  return (
    <FooterLayoutPreview
      apropos={aproposMini}
      email={email}
      telephone={telephone}
      instagram={instagram}
      facebook={facebook}
    />
  )
}

export default Footer

export const FooterLayoutPreview = ({
  apropos,
  telephone,
  email,
  instagram,
  facebook,
}) => {
  return (
    <div className="footer">
      <div className="fgrid">
        <div className="logo">
          <img src={thekeLogo} alt="theke" />
        </div>
        <div className="apropos">
          <h3>à propos de nous</h3>
          <p>
            {apropos}
            <br />
            <Link to="/apropos">savoirs plus</Link>
          </p>
        </div>
        <div className="contact">
          <h3>contactez nous</h3>
          <span>{telephone}</span>
          <span>{email}</span>
          <div className="social">
            {!!instagram && (
              <span>
                <a href={instagram}>
                  <img src={iconIg} alt="instagram" />
                </a>
              </span>
            )}
            {!!facebook && (
              <span>
                <a href={facebook}>
                  <img src={iconFb} alt="facebook" />
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
