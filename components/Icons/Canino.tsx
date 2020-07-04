import React, { ReactElement } from 'react';
import theme from '../../constants/theme';

type CaninoType = {
  size: number;
};

const Canino = ({ size }: CaninoType): ReactElement => {
  return (
    <svg id="prefix__Capa_1" x={0} y={0} width={size} height={size} viewBox="0 0 557.62 477.44" xmlSpace="preserve">
      <style />
      <path
        d="M427.66 473.01c-21.85-1-44.59-5.11-62.94-17.66h-.01c0 .01 0 .02-.01.02-2.49 4.98-6.08 8.88-11.01 11.37-.61.35-1.23.65-1.84.87-.53.26-1.09.48-1.66.65-.13.09-.31.13-.44.18l-.01-.02c-2.35.78-4.88 1.22-7.54 1.22H191.12c-17.62-2.8-5.73-27.63 20.15-26.54l29.77 2.01 1.01-.13c-25.27-13.9-42.1-37.29-42.1-65.44 0-8.87 1.66-17.42 4.8-25.38h-.01c-.26-.08-.48-.17-.74-.31-2.58-.96-5.12-1.96-7.65-3.06l-.73 7.82-.7 7.77c-5.46 11.32-9.7 55.09-11.28 73.48.79 12.9.31 28.99-23.08 29.95l-12.15-.31c-8.04-.52-12.2-2.76-13.9-5.68-2.53-4.33.48-10.23 4.64-14.38 5.11-5.12 11.66-7.39 15.76-11.4.31-19.81.88-66.7-.56-75.05l-9.53-38.82-1.18-4.85c-3.89-3.15-7.69-6.47-11.36-9.96l-61.2-7.87c-2.41 7.48-4.98 15.13-7.3 22.03-2.27 10.1 3.01 16.13 1.66 21.34-6.65 25.14-32.27 37.42-34.93 18.05-.35-2.62-.31-5.81.27-9.61l6.38-29.38 1.31-7.87c.75-4.32 5.38-19.41 8.35-31.39 2.14-8.74 9.61-15.17 18.57-16 5.12-.44 10.19-.7 15.04-.44h.13l17.18-.96a60.44 60.44 0 01-2.06-3.24l-.61-1.04c-3.67-6.21-6.6-12.73-8.65-19.5-3.67-11.85-4.85-24.39-3.36-36.76.48-4.29 1.31-8.53 2.48-12.73.01-.01.01-.03.02-.03-.84-3.8-1.61-8.16-2.19-13.15-.52-4.41-.83-9.27-.83-14.56.26-21.07 14.9-37.07 7.34-44.63-5.69-8.83-12.55-5.64-29.24-1.76-2.93.66-5.95 1.09-9.01 1.09-1.18 0-2.36-.04-3.59-.22-.79-.08-1.57-.17-2.36-.35-6.04.48-11.89-1.05-16.74-4.16a26.333 26.333 0 01-8.18-8c-.35-.57-.7-1.09-1.04-1.71-.49-.88-.92-1.75-1.32-2.67l-9.62-15-5.33-8.26c-1.66-4.02-.09-8.57 3.67-10.62l9.57-5.29 21.9-12.11.26-.13 3.06-1.75c5.81-3.2 13.85-10.62 15.61-16.97l1.75-5.81c.39-1.84.96-3.54 1.79-5.16 13.03-26.5 79.26-26.15 95.61-4.64.83 1.09 1.88 2.93 3.1 5.42.04.04.04.08.09.13 8.44 17.09 25.18 63.17 36.54 92.11l6.38 15.74.05.08 23.86 32.31c9.53 6.86 17.71 12.85 25.01 18.71 8.66 6.91 16.14 13.69 23.43 21.51 7.7 8.3 15.17 17.79 23.48 29.9l32.78 47.3c20.11 29.33 23.7 40.43 29.73 66.66 0 .05.04.13.04.17 2.23 6.3 3.76 13.03 4.5 20.03.13.83.22 1.66.26 2.48.13 0 .26-.04.4-.04.13 8.35 6.38 36.59 9.62 44.46 4.19 10.27 12.28 18.01 21.77 23.47 13.73 7.87 24.3 6.21 39.6 9.53 3.23.7 6.52 1.24 9.83 1.74 4.69.07 9.96.51 15.05 1.72h.02c6.8.59 13.68 1.04 20.61 1.56 24.39 1.84 49.35 4.94 71.99 20.55-3.89.22-7.77.39-11.62.56-38.54 1.7-76.92.57-115.53-1.19z"
        fill={theme.color.gray3}
      />
    </svg>
  );
};

export default Canino;
