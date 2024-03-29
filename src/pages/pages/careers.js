/* eslint-disable */
import React from 'react';
import Preloader from "../../components/common/preloader"
import SEO from "../../components/common/seo"

const Careers = () => {
    return (
      <>
        <SEO
            title="Careers - Dose of Roses"
            mainTitle="Careers"
            description="Dose of Roses is the #1 luxury gift store as seen on celebrities &amp;amp; social media with a unique selection of gifts for any special occasion. Our HQ is located in downtown Los Angeles. If you’re a passionate and motivated individual looking for an amazing opportunity in Ecommerce, Social Media, and Marketing please ap"
            type="website"
        />
        <Preloader />
        <div className="page-width page-template">
            <div className="grid">
                <div className="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                    <div className="rte proper-margins">
                        <p className="p1">Dose of Roses is the #1 luxury gift store as seen on celebrities &amp; social media with a unique selection of gifts for any special occasion.</p>
                        <p className="p1">Our HQ is located in downtown Los Angeles. If you’re a passionate and motivated individual looking for an amazing opportunity in Ecommerce, Social Media, and Marketing please apply to your matching position below.</p>
                        <ul>
                            <li>
                                <a href="/pages/customer-service-job" title="Customer Service">Customer Service Representative</a>
                            </li>
                            <li>
                                <a href="/pages/warehouse-associate-job" title="Warehouse Associate">Warehouse Associate</a>
                            </li>
                            <li>
                                <a href="/pages/floral-designer" title="Floral Designer">Floral Designer</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}
  
export default Careers