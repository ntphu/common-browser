var browser = browser || chrome;

function handleMessage(request, sender, sendResponse) {
    switch (request.code) {
        case 'open-tab': {
            browser.tabs.create({
                url: request.url
            });
            break;
        }
    }
    return true;
}

browser.runtime.onMessage.addListener(handleMessage);