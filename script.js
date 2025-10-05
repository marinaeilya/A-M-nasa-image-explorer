/* خلفية متحركة للنجوم */
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  color: #fff;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
}

@keyframes stars {
  from {transform: translateY(0);}
  to {transform: translateY(-1000px);}
}

body::before {
  content: "";
  position: absolute;
  top: 0;
  width: 200%;
  height: 200%;
  background: transparent url("https://www.transparenttextures.com/patterns/stardust.png") repeat;
  animation: stars 120s linear infinite;
  opacity: 0.3;
  z-index: 0;
}

header {
  text-align: center;
  padding: 20px;
  position: relative;
  z-index: 2;
}

input {
  width: 60%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  margin-top: 10px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  padding: 20px;
  position: relative;
  z-index: 2;
}

.gallery img {
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.gallery img:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #00bfff;
}

.modal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.9);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  z-index: 999;
}

.modal img {
  max-width: 90%;
  max-height: 70vh;
  border-radius: 10px;
  margin-bottom: 20px;
}

#close {
  position: absolute;
  top: 20px; right: 30px;
  font-size: 35px;
  cursor: pointer;
  color: #fff;
}

#modalDesc {
  max-width: 800px;
  font-size: 18px;
  color: #ccc;
}
