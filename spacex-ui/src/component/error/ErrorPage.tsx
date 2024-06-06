import React from 'react';
import { Container, Typography } from '@mui/material';

interface ErrorPageProps {
  errorMessage: string | null;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <div className = "d-flex w-100 h-100" style={{ textAlign:"center" , backgroundColor:"#000000"}}>
      <div className='m-auto rounded-3 p-1 w-50' style={{boxShadow: "0 0 50px 20px #48abe0"}}>
      <Typography variant="h4" style={{color:"#ffffff"}} gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" paragraph style={{color:"#ffffff"}}>
        {errorMessage}
      </Typography>
      </div>
    </div>
  );
};

export default ErrorPage;
