// https://github.com/ElemeFE/element/blob/dev/packages/upload/src/ajax.js

function getError(action, option, xhr) {
    const msg = `fail to post ${action} ${xhr.status}'`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
}

function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function parseFormData(opt){
    const formData = new FormData();
    if (opt.data) {
        Object.keys(opt.data).map(key => {
            formData.append(key, opt.data[key]);
        });
    }
    formData.append(opt.filename, opt.file);
    return formData;
}

export default function upload(option) {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }

    const xhr = new XMLHttpRequest();
    const action = option.action;
    const method = option.method || 'POST'

    if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
        };
    }

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(action, option, xhr), getBody(xhr));
        }

        option.onSuccess(getBody(xhr));
    };

    xhr.open(method, action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    // if (headers['X-Requested-With'] !== null) {
    //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // }

    for (let item in headers) {
        if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item]);
        }
    }
    let data = (option.parseFormData || parseFormData)({data: option.data, file: option.file, filename: option.filename})
    //console.log("upload data:", data)
    xhr.send(data);
}
