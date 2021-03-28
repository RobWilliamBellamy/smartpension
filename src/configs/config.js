export const config = {
    logo: 'logo.png',
    default_page: '/pageviews',
    file_loader: {
        default: 'webserver.log',
        image: '/logo.png',
        accept: [".log"],
        placeHolder: 'Please select a web log file...',
        title: 'Upload Web Log',
        content: 'Please select a web log file to upload or use the default file from this project.'
    },
    errors: {
        file_parse_error: 'Failed to parse web log file'
    }
};