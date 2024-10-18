import React from 'react';
import { Helmet } from 'react-helmet-async';

const GoogleAnalytics = ({ measurementId }) => (
  <Helmet>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}></script>
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `}
    </script>
  </Helmet>
);

export default GoogleAnalytics;