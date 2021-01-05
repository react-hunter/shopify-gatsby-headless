import React from 'react';
import CustomiserBanner from '../components/createPage/customiserBanner';
import CustomiserSteps from '../components/createPage/createSteps';
import CreateArrangements from '../components/createPage/createArrangements';
import CreateExpert from '../components/createPage/createExpert';

const CreatePage = ({ data }) => {
    return (
      <>
        <CustomiserBanner />
        <CustomiserSteps />
        <CreateArrangements />
        <CreateExpert />
      </>
    )
}
  
export default CreatePage