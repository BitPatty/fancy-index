const ORDER_ATTRIBUTE_PARAM = "C";
const ORDER_DIRECTION_PARAM = "O";

const README_FILENAME = "README.md";

const orderAttributes = {
  N: "indexcolname",
  M: "indexcollastmod",
  S: "indexcolsize",
  D: "indexcoldesc",
};

const getUrlParams = () => {
  return new URLSearchParams(window.location.search.replace(";", "&"));
};

const parseOrderAttribute = (value) => {
  if (orderAttributes[value]) return orderAttributes[value];
  return orderAttributes.N;
};

const getOrderAttribute = () => {
  const urlParams = getUrlParams();

  return {
    attribute: parseOrderAttribute(urlParams.get(ORDER_ATTRIBUTE_PARAM)),
    ascending: urlParams.get(ORDER_DIRECTION_PARAM) !== "D",
  };
};

const getOrderChevron = (ascending) => {
  if (!ascending) return "&#9660; ";
  return "&#9650; ";
};

const orderAttribute = getOrderAttribute();

const attributeHeader = document.getElementsByClassName(
  orderAttribute.attribute
)[0].firstChild;

attributeHeader.innerHTML =
  getOrderChevron(orderAttribute.ascending) + attributeHeader.innerHTML;

const hasReadme =
  document.querySelector('a[href="' + README_FILENAME + '"]') != null;

if (hasReadme) {
  const populateReadme = async () => {
    const readmeContent = await fetch(
     window.location.protocol + '//' + window.location.host + '/' +  window.location.pathname.replace(/\/$/, '') + "/" + README_FILENAME
    );

    const body = await readmeContent.text();

    const readmeElement = document.createElement("div");
    readmeElement.innerHTML = marked(body);
    document.getElementById("readme").appendChild(readmeElement);
  };

  populateReadme();
}
