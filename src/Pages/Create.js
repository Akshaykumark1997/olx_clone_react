import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import Spinner from '../Store/SpinnerContext';

const CreatePage = () => {
  return (
    <Fragment>
      <Spinner>
      <Header />
      <Create/>
      </Spinner>
    </Fragment>
  );
};

export default CreatePage;
