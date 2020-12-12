const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// FID(First Input Delay)         GOOD | NEEDS IMPROVEMENT | POOR
//                                    100 ms              300 ms
// CLS(Cumulative Layout Shift)   GOOD | NEEDS IMPROVEMENT | POOR
//                                    0.1                 0.25
// LCP(Largest Contentful Paint)  GOOD | NEEDS IMPROVEMENT | POOR
//                                    2.5 sec             4.0 sec