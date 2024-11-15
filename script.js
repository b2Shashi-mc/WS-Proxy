// Function to handle SOAP API selection
function onApiSelect(api) {
    // Add your logic here to change the API proxy or update the code
    const codeEditor = document.getElementById("code-editor");
    
    if (api === "Account") {
        codeEditor.textContent = `/* Example code for Account API */
const accountApi = new WSProxy('Account');
const results = accountApi.retrieve('Account');
console.log(results);`;
    } else if (api === "AccountUser") {
        codeEditor.textContent = `/* Example code for AccountUser API */
const accountUserApi = new WSProxy('AccountUser');
const results = accountUserApi.retrieve('AccountUser');
console.log(results);`;
    } else if (api === "BounceEvent") {
        codeEditor.textContent = `/* Example code for BounceEvent API */
const bounceEventApi = new WSProxy('BounceEvent');
const results = bounceEventApi.retrieve('BounceEvent');
console.log(results);`;
    }
    
    // Display the code editor container
    document.getElementById("code-editor-container").style.display = 'block';
}

// Function to copy the code to clipboard
function copyToClipboard() {
    const codeText = document.getElementById("code-editor").textContent;
    navigator.clipboard.writeText(codeText)
        .then(() => {
            alert('Code copied to clipboard!');
        })
        .catch(err => {
            alert('Failed to copy code: ', err);
        });
}
