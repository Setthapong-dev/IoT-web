## KMITL IoT Web – Drone Temperature Logger

เว็บแอประบบ IoT สำหรับดูข้อมูลคอนฟิกของโดรน, สถานะ, และบันทึกค่าอุณหภูมิ พร้อมหน้าแสดง Log แบบแบ่งหน้า พัฒนาแยกเป็น `client` (React + Vite) และ `server` (Express).

### Live Demo
- เว็บไซต์สาธิต: [iot-web-tawny.vercel.app](https://iot-web-tawny.vercel.app/)

### โครงสร้างโปรเจกต์
```
KMITL-Web-Dev/
  client/   # React + Vite frontend
  server/   # Express backend API
```

### เทคโนโลยีหลัก
- Frontend: React 19, Vite 7, React Router, Tailwind CSS
- Backend: Node.js, Express, Axios, CORS, dotenv
- โฮสติ้ง/ดีพลอย: Vercel

## การเริ่มต้นใช้งาน (Development)

### 1) ติดตั้ง Dependencies
รันในโฟลเดอร์รากครั้งแรกเพื่อความแน่ใจ จากนั้นเข้าแต่ละส่วนเพื่อติดตั้ง
```bash
cd client && npm install
cd ../server && npm install
```

### 2) ตั้งค่า Environment Variables (ฝั่ง `server`)
สร้างไฟล์ `.env` ภายในโฟลเดอร์ `server/`
```
DRONE_API_URL=...                # แหล่งข้อมูลโดรน (อ่านอย่างน้อยต้องมี status และ data)
POCKETHOST_API_URL=...           # Endpoint สำหรับสร้าง/อ่าน Temperature Logs
POCKETHOST_API_TOKEN=...         # Bearer token สำหรับเรียก PocketHost
PORT=3000                        # (ออปชัน) พอร์ตของเซิร์ฟเวอร์โลคอล
```

คำอธิบาย Endpoint สำคัญของเซิร์ฟเวอร์:
- `GET /configs/:droneId` → คืนค่า `drone_id, drone_name, light, country`
- `GET /status/:droneId` → คืนค่า `condition`
- `GET /logs/:droneId?page=1` → คืนค่า log แบบแบ่งหน้า
- `POST /logs` → รับ `{ drone_id, drone_name, country, celsius }` แล้วฟอร์เวิร์ดไปยัง PocketHost

### 3) รัน Backend
```bash
cd server
npm start
# เซิร์ฟเวอร์จะรันที่ http://localhost:3000 (หรือพอร์ตตามตัวแปร PORT)
```

### 4) รัน Frontend
```bash
cd client
npm run dev
# Vite จะเปิดพอร์ตดีฟอลต์ (เช่น http://localhost:5173)
```

หมายเหตุ: หากฝั่ง frontend เรียก API จาก `server` ให้ตรวจสอบ base URL ให้ถูกต้องตามสภาพแวดล้อม (dev/prod).

## คำสั่งที่มีประโยชน์
### Client
- `npm run dev` – รันโหมดพัฒนา (HMR)
- `npm run build` – บิวด์โปรดักชัน
- `npm run preview` – พรีวิวหลังบิวด์
- `npm run lint` – ตรวจสอบโค้ดด้วย ESLint

### Server
- `npm start` – รัน Express server
- `npm run server` – รันด้วย nodemon (ถ้าติดตั้งไว้ในเครื่อง)

## การดีพลอย
- โปรเจกต์นี้เตรียมไฟล์ `vercel.json` ทั้งฝั่ง `client/` และ `server/` ให้สามารถดีพลอยแยกได้บน Vercel
- ตรวจสอบให้แน่ใจว่าตั้งค่า Environment Variables ฝั่งเซิร์ฟเวอร์ในแดชบอร์ด Vercel ให้ครบถ้วน

## ใบอนุญาต
โค้ดนี้สำหรับงานการเรียนการสอน/สาธิต สามารถดัดแปลงใช้งานต่อได้ตามความเหมาะสมของรายวิชา/โปรเจกต์


