export type FileLoaderPropsType = {
    open:boolean,
    default:string,
    image:string,
    handleFile:(data:string)=> void
    accept:string[],
    placeHolder:string,
    title:string,
    content:string
};