let editingUrl = null; // To track the URL being edited or not

document.getElementById('save').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const sentence = document.getElementById('sentence').value;

    if (url && sentence) {
        chrome.storage.sync.get('focusData', (data) => {
            const focusData = data.focusData || {};
            if (editingUrl && editingUrl !== url) {
                // If the URL has changed, remove the old entry
                delete focusData[editingUrl];
            }
            focusData[url] = sentence;

            chrome.storage.sync.set({ focusData }, () => {
                console.log("Saved Data:", focusData);
                updateUI();
                document.getElementById('url').value = '';
                document.getElementById('sentence').value = '';
                editingUrl = null; // Reset editing URL
            });
        });
    }
});

document.getElementById('view-saved').addEventListener('click', () => {
    document.getElementById('popup-container').style.display = 'none';
    document.getElementById('saved-urls-container').style.display = 'block';
    updateUI();
});

document.getElementById('back-to-main').addEventListener('click', () => {
    document.getElementById('popup-container').style.display = 'block';
    document.getElementById('saved-urls-container').style.display = 'none';
});

function updateUI() {
    chrome.storage.sync.get('focusData', (data) => {
        const focusData = data.focusData || {};
        const urlList = document.getElementById('urlList');
        urlList.innerHTML = '';

        for (const url in focusData) {
            const listItem = document.createElement('li');

            const textDiv = document.createElement('div');
            textDiv.className = 'text-container';
            textDiv.textContent = `${url} - ${focusData[url]}`;

            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-container';

            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.addEventListener('click', () => {
                document.getElementById('url').value = url;
                document.getElementById('sentence').value = focusData[url];
                document.getElementById('popup-container').style.display = 'block';
                document.getElementById('saved-urls-container').style.display = 'none';
                editingUrl = url; 
            });

            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            removeButton.addEventListener('click', () => {
                delete focusData[url];
                chrome.storage.sync.set({ focusData }, () => {
                    updateUI();
                });
            });

            buttonDiv.appendChild(editButton);
            buttonDiv.appendChild(removeButton);

            listItem.appendChild(textDiv);
            listItem.appendChild(buttonDiv);
            urlList.appendChild(listItem);
        }
    });
}

document.addEventListener('DOMContentLoaded', updateUI);
