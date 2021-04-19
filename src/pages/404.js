/* eslint-disable */
import React from "react"
import SEO from "../components/common/seo"
import Preloader from "../components/common/preloader"

const seoTitle = "404 Not found - Dose of Roses"
const NotFoundPage = () => (
  <>
    <Preloader />
    <SEO title={seoTitle} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
)

export default NotFoundPage
