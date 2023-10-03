// libraries
import { useEffect, useRef, useState } from "react";
// assets
import airplaneGif from "./assets/airplane.gif";
import airplane from "./assets/airplane.svg";
// styles
import "./styles/App.scss";

function App() {
  // before, playing, after
  const [status, setStatus] = useState("before");
  // 생성된 탄막 수
  const [count, setCount] = useState(0);
  // 경과 시간
  let ms = 0;
  let bullet = 0;
  const [time, setTime] = useState('00:00:00');
  const airplaneRef = useRef(null);

  const setStatusWithTransition = (status) => {
    setTimeout(() => {
      setStatus(status);
    }, 700);
    document.getElementById("gameBoard").classList.add("switchScreen");
    setTimeout(() => {
      document.getElementById("gameBoard").classList.remove("switchScreen");
    }, 1000);
  };

  const runTimer = () => {
    const timer = document.getElementById("timer");
    timer.innerText = "00:00:00";
    const setTimer = () => {
      ms += 1;
      const min = String(Math.floor(ms / 100 / 60)).padStart(2, "0");
      const sec = String(Math.floor(ms / 100) % 60).padStart(2, "0");
      const msec = String(ms % 100).padStart(2, "0");
      timer.innerText = `${min}:${sec}:${msec}`;
    }
    setInterval(setTimer, 10);
  };

  const moveAirplane = (key) => {
    const airplane = airplaneRef.current;
    switch (key) {
      case "ArrowUp": {
        if(airplane.offsetTop <= 30) break;
        const offsetTop = airplane.offsetTop - 30;
        airplane.style.top = offsetTop + "px";
        break;
      }
      case "ArrowDown": {
        if(airplane.offsetTop >= 770) break;
        const offsetTop = airplane.offsetTop + 30;
        airplane.style.top = offsetTop + "px";
        break;
      }
      case "ArrowLeft": {
        if(airplane.offsetLeft <= 30) break;
        const offsetLeft = airplane.offsetLeft - 30;
        airplane.style.left = offsetLeft + "px";
        break;
      }
      case "ArrowRight": {
        if(airplane.offsetLeft >= 770) break;
        const offsetLeft = airplane.offsetLeft + 30;
        airplane.style.left = offsetLeft + "px";
        break;
      }
    }
  };

  const renderBullet = () => {
    if(status === "playing"){
      const bullet = document.createElement("div");
      bullet.classList.add("bullet");
      // 총알 생성 방향(0: 위, 1: 오른쪽, 2: 아래, 3: 왼쪽)
      const startSide = Math.floor(Math.random() * 4);
      // 총알 소멸 방향
      const createEndSide = () => {
        while (true) {
          const temp = Math.floor(Math.random() * 4);
          if (temp !== startSide) return temp;
        }
      };
      const endSide = createEndSide();
      // 총알 생성 좌표
      const startPosition = Math.floor(Math.random() * 800);
      // 총알 소멸 좌표
      const endPosition = Math.floor(Math.random() * 800);
  
      // 총알 이동 대각선의 x축 이동량
      const bulletDistX = () => {
        switch (startSide) {
          case 0: {
            if (endSide === 1) return 800 - startPosition;
            if (endSide === 2) return endPosition - startPosition;
            if (endSide === 3) return -startPosition;
            else{
              console.log(startSide, endSide)
              break;
            }
          }
          case 1: {
            if (endSide === 0) return -(800 - endPosition)
            if (endSide === 2) return -(800 - endPosition);
            if (endSide === 3) return -800
            else{
              console.log(startSide, endSide)
              break;
            }
          }
          case 2: {
            if (endSide === 0) return endPosition - startPosition;
            if (endSide === 1) return 800 - startPosition
            if (endSide === 3) return -startPosition
            else{
              console.log(startSide, endSide)
              break;
            }
          }
          case 3: {
            if (endSide === 0) return endPosition
            if (endSide === 1) return 800
            if (endSide === 2) return endPosition
            else{
              console.log(startSide, endSide)
              break;
            }
          }
        }
      };
      // 총알 이동 대각선의 y축 이동량
      const bulletDistY = () => {
        switch (startSide) {
          case 0: {
            if (endSide === 1) return endPosition
            if (endSide === 2) return 800
            if (endSide === 3) return endPosition
            else{
              console.log(startSide, endSide)
              break;
            }
          }
          case 1: {
            if (endSide === 0) return -startPosition
            if (endSide === 2) return 800 - startPosition
            if (endSide === 3) return endPosition - startPosition
            else{
              console.log(startSide, endSide)
              break;
            }
          }
          case 2: {
            if (endSide === 0) return -800
            if (endSide === 1) return -(800-endPosition)
            if (endSide === 3) return 800-endPosition
            else{
              console.log(startSide, endSide)
              break;
            }
          }
          case 3: {
            if (endSide === 0) return -startPosition
            if (endSide === 1) return endPosition - startPosition
            if (endSide === 2) return 800 - startPosition
            else{
              console.log(startSide, endSide)
              break;
            }
          }
        }
      };
      // 총알 존재 시간(총알 속도와 반비례)
      const getBulletTime = () => {
        const speed = Math.floor(ms / 500) + 1;
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
        return Math.max(15 - getRandomInt(speed), 5);
      };
      const bulletTime = getBulletTime();
      // 총알 초기 위치 설정
      switch (startSide) {
        case 0: {
          bullet.style.top = "0px";
          bullet.style.left = startPosition + "px";
          break;
        }
        case 1: {
          bullet.style.top = startPosition + "px";
          bullet.style.left = "800px";
          break;
        }
        case 2: {
          bullet.style.top = "800px";
          bullet.style.left = startPosition + "px";
          break;
        }
        case 3: {
          bullet.style.top = startPosition + "px";
          bullet.style.left = "0px";
          break;
        }
      }
      console.table({
        startside: startSide,
        endside: endSide,
        startPosition: startPosition,
        endPosition: endPosition,
        bulletDistX: bulletDistX(),
        bulletDistY: bulletDistY(),
        bulletTime: bulletTime,
      });
      const moveBullet = () => {
        bullet.style.top =
          bullet.offsetTop + bulletDistY() / bulletTime / 8 + "px";
        bullet.style.left =
          bullet.offsetLeft + bulletDistX() / bulletTime / 8 + "px";
          if(airplaneRef.current){
            if(airplaneRef.current.offsetTop - bullet.offsetTop < 30 && airplaneRef.current.offsetTop - bullet.offsetTop > -30 && airplaneRef.current.offsetLeft - bullet.offsetLeft < 30 && airplaneRef.current.offsetLeft - bullet.offsetLeft > -30){
              setStatusWithTransition("after");
            }
          }
        }
        setInterval(moveBullet, 100);
        document.getElementById("battleField").appendChild(bullet);
        setTimeout(() => {
          document.getElementById("battleField").removeChild(bullet);
        }, bulletTime * 1000);
    }
  };

  const Game = () => {
    return (
      <>
        <div style={{ position: "absolute", top: "0" }}>
          <button onClick={() => renderBullet()}>render</button>
          <div id="timer"></div>
        </div>
        <div id="battleField">
          <img id="airplane" src={airplane} ref={airplaneRef} />
        </div>
      </>
    );
  };

  useEffect(() => {
    if (status === "playing") {
      // ms = 0;
      // bullet = 0;
      document.addEventListener("keydown", (e) => moveAirplane(e.key));
      setTimeout(() => {
        runTimer();
      }, 1000);
      const startRenderBullets = setInterval(() => {
        renderBullet();
        // bullet++;
        setCount(count + 1);
      }, 300);
    } else if(status === "after") {
      document.removeEventListener("keydown", moveAirplane());
      const min = String(Math.floor(ms / 100 / 60)).padStart(2, "0");
      const sec = String(Math.floor(ms / 100) % 60).padStart(2, "0");
      const msec = String(ms % 100).padStart(2, "0");
      setTime(`${min}:${sec}:${msec}`);
      setCount(bullet);
      console.log(ms, bullet)
      clearInterval(runTimer);
    }
  }, [status]);

  return (
    <>
      <div id="mainWrapper">
        <div id="gameBoardWrapper">
          <div id="gameBoard">
            {status === "before" && (
              <>
                <img
                  id="welcomeGif"
                  src={airplaneGif}
                  alt="into the fire logo"
                />
                <button
                  className="systemBtn"
                  onClick={() => setStatusWithTransition("playing")}
                >
                  시작하기
                </button>
              </>
            )}
            {status === "playing" && (
              <>
              <div style={{ position: "absolute", top: "0" }}>
                <div id="timer"></div>
              </div>
              <div id="battleField">
                <img id="airplane" src={airplane} ref={airplaneRef} />
              </div>
            </>
            )}
            {status === "after" && (
              <>
              <div style={{ position: "absolute", top: "0" }}>
                <div id="timer"></div>
              </div>
                <h1 className="textLarge textBold textGameOver">Game Over</h1>
                <p className="textMedium textBold">
                  당신은 {time} 동안 {count}개의 총알을 피했습니다.
                </p>
                <button
                  className="systemBtn"
                  onClick={() => setStatusWithTransition("playing")}
                >
                  재시작
                </button>
                <button
                  className="systemBtn"
                  onClick={() => setStatusWithTransition("before")}
                >
                  메인으로
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
