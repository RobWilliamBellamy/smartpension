export const loadFile = (path) => {

    return new Promise((resolve, reject) => {
        
        fetch(path)
        .then(response => response.text())
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
};