// Reference
// velog.io/@bearsjelly

/* global kakao */
import React, { Component } from "react";
import { markerdata } from "./JSON/location";

class App extends Component {
  componentDidMount() {
    // 지도 띄우기
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.475926, 126.965384),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    for (var i = 0; i < markerdata.length; i++) {
      // 변환할 객체 생성
      var geocoder = new kakao.maps.services.Geocoder(),
        wtmX = markerdata[i].x,
        wtmY = markerdata[i].y;

      // 변환
      geocoder.transCoord(wtmX, wtmY, transCoordCB, {
        input_coord: kakao.maps.services.Coords.WTM, // 변환을 위해 입력한 좌표계 입니다
        output_coord: kakao.maps.services.Coords.WGS84, // 변환 결과로 받을 좌표계 입니다
      });
    }

    // 마커 이미지
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    function transCoordCB(result, status) {
      for (var i = 0; i < result.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);
        // 마커 이미지 생성
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        if (status === kakao.maps.services.Status.OK) {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(result[i].y, result[i].x),
            title: markerdata[i].bplcnms,
            image: markerImage,
          });
        }
        console.log(result[i].y, ",", result[i].x);
      }
    }
    // 최종 백업
    // markerdata.forEach((el) => {
    //   // 마커 생성
    //   const marker = new kakao.maps.Marker({
    //     // 마커가 표시 될 지도
    //     map: map,
    //     // 마커가 표시 될 위치
    //     position: new kakao.maps.LatLng(el.x, el.y),
    //     // 마커에 호버 시 나타날 title
    //     title: el.bplcnms,
    //   });
    //   marker.setMap(map);
    // });
    // 여기까지

    // 마커 표시 위치
    // const markerPosition = new kakao.maps.LatLng(37.475926, 126.965384);

    // // 마커 생성
    // const marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });
    // 마커를 지도 위에 표시
    // marker.setMap(map);
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
