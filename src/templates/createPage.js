import React from 'react';
import Preloader from "../components/common/preloader"
import CustomiserBanner from '../components/createPage/customiserBanner';
import CustomiserSteps from '../components/createPage/createSteps';
import CreateArrangements from '../components/createPage/createArrangements';
import CreateExpert from '../components/createPage/createExpert';

const CreatePage = ({ data }) => {
    return (
      <>
        <Preloader />
        <CustomiserBanner />
        <CustomiserSteps />
        <CreateArrangements />
        <CreateExpert />
      </>
    )
}
  
export default CreatePage