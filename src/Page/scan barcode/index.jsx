// /* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-no-undef */
// // import { Html5QrcodeScanner } from "html5-qrcode";
// // import React, { useEffect, useState } from "react";
// // import { BarcodeScanner } from "react-barcode-scanner";

// // import "react-barcode-scanner/polyfill";

// // function ScanBarcode() {
// //   // const [scanResult, setScanResult] = useState(null);
// //   // useEffect(() => {
// //   //   const scanner = new Html5QrcodeScanner("reader", {
// //   //     qrbox: {
// //   //       width: 500,
// //   //       height: 500,
// //   //     },
// //   //     fps: 10,
// //   //   });
// //   //   scanner.render(success, error);
// //   //   function success(result) {
// //   //     scanner.clear();
// //   //     setScanResult(result);
// //   //   }
// //   //   function error(err) {
// //   //     console.warn(err);
// //   //   }
// //   // }, []);
// //   // return (
// //   //   <div className="Scanner flex flex-col justify-center items-center px-5 py-5">
// //   //     <h1 className="text-2xl font-serif mb-5">QR Code Scanning in JeWellry</h1>
// //   //     {scanResult ? (
// //   //       <div className="text-green-500">
// //   //         Success:{" "}
// //   //         <a href={scanResult} className="underline">
// //   //           {scanResult}
// //   //         </a>
// //   //       </div>
// //   //     ) : (
// //   //       <div
// //   //         className="w-2/3 h-screen mb-10"
// //   //         id="reader"
// //   //         style={{ width: "100%" }}
// //   //       ></div>
// //   //     )}
// //   //   </div>
// //   // );
// //   const [data, setData] = useState("");
// //   return (
// //     <div>
// //       <BarcodeScanner
// //         width={500}
// //         height={500}
// //         onUpdate={(err, result) => {
// //           if (result) setData(result.text);
// //           else setData("Not Found");
// //         }}
// //       />
// //       <p>{data}</p>
// //     </div>
// //   );
// // }

// // export default ScanBarcode;

// import "./styles.css";
// import React, { useState } from "react";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";

// export default function App() {
//   const [data, setData] = useState("Capture : ...");
//   const [show, setShow] = useState(false);

//   const onUpdateScreen = (err, result) => {
//     if (result) {
//       setData(result.text);
//       setShow(false);
//     } else {
//       setData("Not Found");
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Scan BarCode</h1>

//       <>
//         {show && (
//           <BarcodeScannerComponent
//             width={400}
//             height={400}
//             onUpdate={(err, result) => onUpdateScreen(err, result)}
//           />
//         )}
//         <p>{data}</p>
//       </>
//       <div>
//         <button onClick={() => setShow(true)}> Capture </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

function ScanBarcode() {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      setError(null);
    }
  };

  const handleError = (err) => {
    setError(err.message);
    console.error(err);
  };

  return (
    <div className="scanner-container flex flex-col justify-center items-center px-5 py-5">
      <h1 className="text-2xl font-serif mb-5">QR Code Scanning in Jewelry</h1>
      {error && <div className="text-red-500">Error: {error}</div>}
      {scanResult ? (
        <div className="text-green-500">
          Success:{" "}
          <a href={scanResult} className="underline">
            {scanResult}
          </a>
          console.log(scanResult);
        </div>
      ) : (
        <div
          className="w-2/3 h-screen mb-10"
          id="reader"
          style={{ width: "40%" , height: "40%"}}
        >
          <Scanner onScan={handleScan} onError={handleError} />
        </div>
      )}
    </div>
  );
}

export default ScanBarcode;
