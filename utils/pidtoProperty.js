const axios = require("axios");

module.exports = async function (pid) {
  try {
    let result = await axios.get(
      `https://gismo.spokanecounty.org/arcgis/rest/services/SCOUT/PropertyLookup/MapServer/0/query?where=PID_NUM=${pid}&outFields=*&returnGeometry=true&resultType=&f=pjson`
    );

    console.log("pictoProperty: ");
    console.log(result);

    return result;
  } catch (err) {
    return null;
  }
};
