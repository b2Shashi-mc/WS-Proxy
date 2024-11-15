const ssjsTemplate = `
&lt;script runat&#x3D;&quot;server&quot;&gt;
Platform.Load(&quot;core&quot;, &quot;1&quot;);
try {
  &#x2F;&#x2F; Set the name of the SOAP object to &quot;{{SOAPAPIName}}&quot;.
  var soapObject &#x3D; {{SOAPAPIName}};

  &#x2F;&#x2F; Call the function &#39;DescribeSoapObject&#39; to retrieve the metadata information for the SOAP object.
  var soapMetaData &#x3D; DescribeSoapObject(soapObject);

  &#x2F;&#x2F; Fetch the properties of the SOAP object that are available for retrieval.
  var properties &#x3D; FetchRetrieveableProperties(soapMetaData);


  &#x2F;&#x2F; Call the function &#39;RetrieveSoapObject&#39; to retrieve data from the SOAP object using the specified filter and columns.
  var response &#x3D; RetrieveSoapObject(soapObject, cols);

  &#x2F;&#x2F; Convert the response object to a string representation and write it to the output.
  Write(Stringify(response));
} catch (ex) {
  &#x2F;&#x2F; If an exception occurs during the execution, catch it and write the error messages to the output.
  Write(ex.message);
  Write(ex.description);
  Write(ex.jintException);
}

&#x2F;&#x2F; Function to describe a SOAP object using WSProxy.
&#x2F;&#x2F; Parameters:
&#x2F;&#x2F; - soapObjectname: The name of the SOAP object to describe.
function DescribeSoapObject(soapObjectname) {
  &#x2F;&#x2F; Create a new instance of WSProxy to interact with the SOAP API.
  var api &#x3D; new Script.Util.WSProxy();

  &#x2F;&#x2F; Call the describe method of WSProxy to fetch the metadata information for the SOAP object.
  var response &#x3D; api.describe(soapObjectname);

  &#x2F;&#x2F; Return the response, which contains the metadata information for the SOAP object.
  return response;
}

&#x2F;&#x2F; Function to fetch an array of retrieveable property names from SOAP metadata.
&#x2F;&#x2F; Parameters:
&#x2F;&#x2F; - soapMetaData: An array of objects containing metadata information for SOAP properties.
function FetchRetrieveableProperties(soapMetaData) {
  &#x2F;&#x2F; Create an empty array to store the names of retrieveable properties.
  var propertiesName &#x3D; [];

  &#x2F;&#x2F; Iterate through each object in the soapMetaData array.
  for (var i in soapMetaData) {
    &#x2F;&#x2F; Extract the &#39;Name&#x27; property from the current object and store it in the propertiesName array.
    var name &#x3D; soapMetaData[i].Name;
    var isRetrievable &#x3D; soapMetaData[i].IsRetrievable;
    if (isRetrievable &#x3D;&#x3D;&#x3D; true) {
      propertiesName.push(name);
    }
  }

  &#x2F;&#x2F; Return the array containing the names of retrieveable properties.
  return propertiesName;
}

&#x2F;&#x2F; Function to create a filter object for data retrieval or processing.
&#x2F;&#x2F; Parameters:
&#x2F;&#x2F; - prop: The property name to filter on.
&#x2F;&#x2F; - operator: The operator used for filtering (e.g., equals, greater than, less than, etc.).
&#x2F;&#x2F; - value: The value to compare the property against.
function ApplyFilter(prop, operator, value) {
  &#x2F;&#x2F; Create and return a filter object with the specified properties.
  return {
    Property: prop,         &#x2F;&#x2F; The property name on which the filter is applied.
    SimpleOperator: operator, &#x2F;&#x2F; The operator used for the filter (e.g., &#x27;equals&#x27;, &#x27;greaterThan&#x27;, etc.).
    Value: value            &#x2F;&#x2F; The value to compare the property against.
  };
}

&#x2F;&#x2F; Function to retrieve data from a SOAP object using WSProxy.
&#x2F;&#x2F; Parameters:
&#x2F;&#x2F; - soapObjectname: The name of the SOAP object from which data will be retrieved.
&#x2F;&#x2F; - cols: An array of column names to retrieve from the SOAP object.
&#x2F;&#x2F; - filter: A filter to apply when querying the SOAP object (optional).
function RetrieveSoapObject(soapObjectname, cols) {
  &#x2F;&#x2F; Create a new instance of WSProxy to interact with the SOAP object.
  var api &#x3D; new Script.Util.WSProxy();
  
  &#x2F;&#x2F; Call the retrieve method of WSProxy to fetch data from the SOAP object.
  var response &#x3D; api.retrieve(soapObjectname, cols);

  &#x2F;&#x2F; Return the response, which contains the retrieved data from the SOAP object.
  return response;
}
&lt;&#x2F;script&gt;
`;

        function onApiSelect(apiName) {
            document.getElementById('code-editor-container').style.display = 'block';
            let codeWithAPIName = ssjsTemplate.replace(/{{SOAPAPIName}}/g, `"${apiName}"`);
            document.getElementById('code-editor').textContent = decodeHTML(codeWithAPIName);
            Prism.highlightAll();
            // Use a small delay to ensure rendering completes before resetting scroll
            setTimeout(function () {
                const codeEditorPre = document.querySelector('#code-editor-container pre');
                codeEditorPre.scrollTop = 0; // Reset scroll position to the top
            }, 0);
        }

        function decodeHTML(html) {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }

        function copyToClipboard() {
    const codeText = document.getElementById("code-editor").textContent;
    navigator.clipboard.writeText(codeText)
        .then(() => {
            const modal = document.getElementById("copyModal");
            
            // Show the modal and then fade it out
            modal.classList.add("show");

            // After 3 seconds, fade out the modal
            setTimeout(() => {
                modal.classList.remove("show");
            }, 2000); // 2 seconds to keep the modal visible before fading out
        })
        .catch(err => console.error("Error copying code: ", err));
}


document.addEventListener('DOMContentLoaded', () => {
    // Get the first radio button in the soap-api-list
    const firstRadioButton = document.querySelector('.soap-api-list input[type="radio"]');

    if (firstRadioButton) {
        firstRadioButton.checked = true; // Set the first radio button as checked by default
    }

    // Optional: If you want to trigger any event (e.g., change) after selecting the first item
    if (firstRadioButton) {
        const changeEvent = new Event('change');
        firstRadioButton.dispatchEvent(changeEvent);
    }

    // You can add more JavaScript logic here for other functionalities if needed
});
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
}, false);

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
        event.preventDefault();
    }
});

