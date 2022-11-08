/* eslint-disable @typescript-eslint/no-explicit-any */
export const info = (...params: any)  => {
  if(process.env.NODE_ENV !== 'test') {
    console.log(params);
  }
};

export const bError = (...params: any) => {
  if(process.env.NODE_ENV !== 'test') {
    console.error(params);
  }
};