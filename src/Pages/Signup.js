import React from 'react';

import Signup from '../Components/Signup/Signup';
import Spinner from '../Store/SpinnerContext';

function SignupPage() {
  return (
    <div>
      <Spinner>
        <Signup />
      </Spinner>
    </div>
  );
}

export default SignupPage;
