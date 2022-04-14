const axios = require("axios");
const fs = require("fs");

// looperBatch(100);

// async function looperBatch(batch) {
//   let schools = JSON.parse(fs.readFileSync("./allSchools.json"));
//   let loc = {};
//   let s = {
//     latlng: { lat: 0, long: 0 },
//     city: "",
//     country: "",
//   };
//   let idx = 0;
//   const interval = setInterval(() => {
//     const params = {
//       access_key: "85aad97f260bfe2eb0f2860c07f9b8ef",
//       query: schools[idx],
//     };
//     axios
//       .get("http://api.positionstack.com/v1/forward", { params })
//       .then((response) => {
//         let info = response.data.data[0];
//         (s.latlng.lat = info.latitude),
//           (s.latlng.long = info.longitude),
//           (s.city = info.locality);
//         s.country = info.country;
//         loc[schools[idx]] = s;
//         fs.writeFileSync("./locations.json", JSON.stringify(loc));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     if (idx >= batch) {
//       clearInterval(interval);
//     }
//     idx++;
//   });
// }

// const chunk = (arr, size) =>
//   Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//     arr.slice(i * size, i * size + size)
//   );

// chunk(JSON.parse(fs.readFileSync("./allSchools.json")), 100).forEach(
//   (c, idx) => {
//     let batch = { batch: [] };
//     c.forEach((school) => {
//       batch.batch.push({ query: school, country: "US", limit: 1 });
//     });
//     fs.writeFileSync(
//       `./batch/queries/batch${idx + 1}.json`,
//       JSON.stringify(batch)
//     );
//   }
// );

// axios
//   .post(
//     "http://api.positionstack.com/v1/forward?access_key=85aad97f260bfe2eb0f2860c07f9b8ef",
//     JSON.parse(fs.readFileSync("./batch/queries/batch1.json"))
//   )
//   .then((response) => {
//     fs.writeFileSync(response.data);
//   });
let num = 9;
let data = JSON.parse(fs.readFileSync(`./batch/data/data${num}.json`));
let numEmpty = 0;
for (const s in data) {
  if (data[s].lat === undefined) {
    numEmpty++;
  }
}
console.log(numEmpty);
for (const school in data) {
  if (data[school].lat === undefined) {
    const params = {
      access_key: "85aad97f260bfe2eb0f2860c07f9b8ef",
      query: school,
      country: "US",
      limit: 1,
    };

    axios
      .get("http://api.positionstack.com/v1/forward", { params })
      .then((response) => {
        data[school] = {
          lat: response.data.data[0].latitude,
          long: response.data.data[0].longitude,
          state: response.data.data[0].region,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

setTimeout(() => {
  fs.writeFileSync(`./batch/data/data${num}.json`, JSON.stringify(data));
}, 10 * 1000);
