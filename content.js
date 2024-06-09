
// function to create a delay
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    // Retrieve data from storage
    const data = await chrome.storage.sync.get('focusData');

    console.log("Storage Data Retrieved:");
    
    const focusData = data.focusData || {};
    const currentUrl = window.location.href;

    console.log("Current URL:", currentUrl);

    for (const url in focusData) {
        if (currentUrl.includes(url)) {
            console.log("Matched URL:", url);

            const sentence = focusData[url];

            // Create the motivational sentence box
            const sentenceDiv = document.createElement('div');
            sentenceDiv.textContent = sentence;
            sentenceDiv.style.position = 'fixed';
            sentenceDiv.style.top = '50px';
            sentenceDiv.style.left = '50%';
            sentenceDiv.style.transform = 'translateX(-50%) translateY(-20px)';
            sentenceDiv.style.backgroundColor = '#4c6ef5';
            sentenceDiv.style.color = '#fff';
            sentenceDiv.style.fontSize = '22px';
            sentenceDiv.style.fontWeight = 'bold';
            sentenceDiv.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
            sentenceDiv.style.padding = '20px 40px 20px 20px'; // Added padding to the right for the close button
            sentenceDiv.style.borderRadius = '12px';
            sentenceDiv.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            sentenceDiv.style.maxWidth = '80%';
            sentenceDiv.style.wordWrap = 'break-word';
            sentenceDiv.style.cursor = 'pointer';
            sentenceDiv.style.textAlign = 'center';
            sentenceDiv.style.background = 'linear-gradient(135deg, #42a5f5, #478ed1)';
            sentenceDiv.style.color = '#fff';
            sentenceDiv.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
            sentenceDiv.style.opacity = '0';
            sentenceDiv.style.zIndex = '10000';

            // Create the close button
            const closeButton = document.createElement('button');
            closeButton.textContent = '✕';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '10px';
            closeButton.style.backgroundColor = 'transparent';
            closeButton.style.border = 'none';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '18px'; // Reduced font size
            closeButton.style.cursor = 'pointer';
            closeButton.style.padding = '0';
            closeButton.style.lineHeight = '1';

            // Append the close button to the sentence box
            sentenceDiv.appendChild(closeButton);

            // Wait for a short delay before appending to the body to ensure smooth operation
            await timeout(200); // Delay of 200 milliseconds
            document.body.appendChild(sentenceDiv);

            // Trigger the entrance animation
            requestAnimationFrame(() => {
                sentenceDiv.style.opacity = '1';
                sentenceDiv.style.transform = 'translateX(-50%) translateY(0)';
            });

            console.log("Sentence Box Appended");

            // Handle close button click
            closeButton.addEventListener('click', () => {
                sentenceDiv.style.opacity = '0';
                sentenceDiv.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    sentenceDiv.remove();
                    console.log("Sentence Box Removed");
                }, 300); // Match the transition duration
            });

            break; // Exit the loop once the sentence is displayed
        }
    }
})();
