// Reference
// velog.io/@bearsjelly

/* global kakao */
import React, { Component } from "react";
import { markerdata } from "./JSON/csvjson";

class App extends Component {
  componentDidMount() {
    // infoWindow
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // 지도 띄우기
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(37.475926, 126.965384),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(37.475926, 126.965384), // 마커를 표시할 위치
    });

    // 마커 이미지 주소
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    for (var i = 0; i < markerdata.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(markerdata[i].lat, markerdata[i].long), // 마커를 표시할 위치
        title: markerdata[i].locName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      infowindow = new kakao.maps.InfoWindow({
        content: markerdata[i].locName, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    }
    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
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
