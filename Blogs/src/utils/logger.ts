/* eslint-disable @typescript-eslint/no-explicit-any */
export const info = (...params: any)  => {
    console.log(params);
};

export const bError = (...params: any) => {
    console.error(params);
};