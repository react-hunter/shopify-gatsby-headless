/* eslint-disable */
import React from "react"
import SEO from "../components/common/seo"
import Preloader from "../components/common/preloader"

const seoTitle = "404 Not Found - Dose of Roses"
const NotFoundPage = () => (
  <>
    <Preloader />
    <SEO
      title={seoTitle}
      mainTitle="404 Not Found"
      description="Shop the largest selection of luxury gifts from our best-selling Rose Bear, Galaxy Rose or choose to customize and personalize your Rose Box. Send beautiful real roses that last up to 5 years."
      type="website"
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
)

export default NotFoundPage
