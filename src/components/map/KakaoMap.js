import { Map, MapMarker } from "react-kakao-maps-sdk";
import React from "react";
import { useRef, useEffect } from "react";
function KakaoMap() {
  const mapRef = useRef(null);
  let mapInstance = null;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY`;
    script.async = true;
    script.onload = () => {
      kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(37.48197988243028, 126.89814204687781),
          level: 3,
        };
        mapInstance = new kakao.maps.Map(container, options);
      });
    };
    document.body.appendChild(script);

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
        mapInstance = null;
      }
    };
  });

  return (
    <Map
      center={{ lat: 37.48197988243028, lng: 126.89814204687781 }}
      style={{ width: "918px", height: "329px" }}
      level={3}
    >
      {/* 마커 추가 */}
      <MapMarker position={{ lat: 37.48197988243028, lng: 126.89814204687781 }}>
        <div style={markerStyle}>
          <strong>🏥 하이펫동물병원</strong>
        </div>
      </MapMarker>
    </Map>
  );
}

const markerStyle = {
  background: "#ffffff",
  padding: "8px 10px 5px 10px",
  borderRadius: "8px",

  color: "#333",
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
  whiteSpace: "nowrap",
};

export default KakaoMap;
