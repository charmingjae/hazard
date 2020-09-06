// Reference
// velog.io/@bearsjelly

/* global kakao */
import React, { Component } from "react";
import { markerdata } from "../JSON/csvjson";
import "../css/mapComp.css";

class mapComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      locName: "",
    };
  }

  // Component DidMount
  componentDidMount() {
    // infoWindow
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    var arrShort = [];

    // 내 위도 경도 가져오기
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // 위도, 경도 바인딩
          var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
          // 지도 띄우기
          const container = document.getElementById("myMap");
          const options = {
            center: new kakao.maps.LatLng(lat, lon),
            level: 2,
          };
          const map = new kakao.maps.Map(container, options);

          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(lat, lon), // 마커를 표시할 위치
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
            marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new kakao.maps.LatLng(
                markerdata[i].lat,
                markerdata[i].long
              ), // 마커를 표시할 위치
              title: markerdata[i].locName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage, // 마커 이미지
            });

            // 마커에 표시할 인포윈도우를 생성합니다
            infowindow = new kakao.maps.InfoWindow({
              content:
                "<div style='font-size:30px; font-weight: bold; text-align:center;width:300px;'>" +
                markerdata[i].locName +
                "</div>", // 인포윈도우에 표시할 내용
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

          for (i = 0; i < markerdata.length; i++) {
            // 현재 내 위치에서 각 마커마다의 경로를 표시
            var varPath = [
              // 내 경로
              new kakao.maps.LatLng(lat, lon),
              // 마커마다의 경로
              new kakao.maps.LatLng(markerdata[i].lat, markerdata[i].long),
            ];

            // Set Polyline
            var drwLine = new kakao.maps.Polyline({
              path: varPath,
              strokeweight: 5,
              strokeColor: "red",
              strokeOpacity: 0.7,
              strokeStyle: "solid",
            });

            // 두 마커 사이의 경로 구하기
            var lengthPath = drwLine.getLength();

            // 최소값 구하기 위해 한 배열에 위도, 경로, 거리 넣음
            var arrPath = {
              lat: markerdata[i].lat,
              long: markerdata[i].long,
              length: lengthPath,
              name: markerdata[i].locName,
            };

            arrShort.push(arrPath);

            // 정렬 기준 선언
            var sortingField = "length";

            // 정렬
            // eslint-disable-next-line no-loop-func
            arrShort.sort(function (a, b) {
              return a[sortingField] - b[sortingField];
            });
          }
          console.log(arrShort);
          var shrtsPath = [
            new kakao.maps.LatLng(lat, lon),
            new kakao.maps.LatLng(arrShort[0].lat, arrShort[0].long),
          ];

          // Set Polyline
          var drwShrtLine = new kakao.maps.Polyline({
            path: shrtsPath,
            strokeweight: 5,
            strokeColor: "red",
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });

          // Draw line
          drwShrtLine.setMap(map);
          this.setState({
            lat: arrShort[0].lat,
            long: arrShort[0].long,
            locName: arrShort[0].name,
          });
        }.bind(this),
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";
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
  // ComponentDidMount Finished

  // Button Event
  sendMsg = () => {
    window.Kakao.Link.sendDefault({
      oobjectType: "location",
      address: "경기 성남시 분당구 판교역로 235 에이치스퀘어 N동 8층",
      addressTitle: this.state.locName,
      content: {
        title: "신메뉴 출시♥︎ 체리블라썸라떼",
        description: "이번 주는 체리블라썸라떼 1+1",
        imageUrl:
          "http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png",
        link: {
          mobileWebUrl: "https://developers.kakao.com",
          webUrl: "https://developers.kakao.com",
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
      ],
    });
  };

  render() {
    var shrtLat = this.state.lat;
    var shrtLong = this.state.long;
    var locName = this.state.locName;
    return (
      <>
        <div className="shltInfo">
          <span className="warnLength">
            * 현재 내 위치와 오차가 있을 수 있습니다. *
          </span>
          <br />
          내 위치와 가장 가까운 대피소는?
          <br />
          <br />
          <span className="spnLocName">
            <a
              href={
                "https://map.kakao.com/link/to/" +
                locName +
                "," +
                shrtLat +
                "," +
                shrtLong
              }
            >
              {locName}
            </a>
          </span>
          <button className="btnSubmit" onClick={this.sendMsg}>
            위치 보내기
          </button>
          <br />
          <span className="spnLatLng">{shrtLat}</span>,
          <span className="spnLatLng">{shrtLong}</span>
        </div>
        <div id="myMap"></div>
      </>
    );
  }
}

export default mapComp;
