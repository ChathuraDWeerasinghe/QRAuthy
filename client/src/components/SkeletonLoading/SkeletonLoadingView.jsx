import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export const SkeletonLoadingView = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
        marginTop: '-20%',
        paddingTop: '100%',
        position: 'relative'
      }}
    >
      <Skeleton
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};
