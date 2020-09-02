// Reference
// velog.io/@bearsjelly

/* global kakao */
import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    // 지도 띄우기
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.475926, 126.965384),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    // 마커 표시 위치
    const markerPosition = new kakao.maps.LatLng(37.475926, 126.965384);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  }

  render() {
    return (
      <div
        id="myMap"
        style={{
          width: "100%",
          height: "700px",
        }}
      ></div>
    );
  }
}

export default App;
