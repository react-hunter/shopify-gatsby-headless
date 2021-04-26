/* eslint-disable */
import React from 'react';
import Preloader from "../../components/common/preloader"
import CustomiserBanner from '../../components/createPage/customiserBanner';
import CustomiserSteps from '../../components/createPage/createSteps';
import CreateArrangements from '../../components/createPage/createArrangements';
import CreateExpert from '../../components/createPage/createExpert';
import SEO from "../../components/common/seo"

const Create = () => {
    return (
      <>
        <SEO
          title="Create Your Rose Box - Dose of Roses"
          mainTitle="Create Your Rose Box"
          description="Customize your Dose of Roses to create the perfect gift! Choose from box shape, style, material and rose colors and personalize it with letters, numbers and symbols. As always, these rose arrangements will stay beautiful for up to five years."
          type="website"
        />
        <Preloader />
        <CustomiserBanner />
        <CustomiserSteps />
        <CreateArrangements />
        <CreateExpert />
      </>
    )
}
  
export default Create