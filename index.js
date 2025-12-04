import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import axios from "axios";  // 用于发起 API 请求

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // 允许跨域请求
app.use(express.json());  // 处理 JSON 请求

// 你的 API 密钥（将其保存在环境变量中，避免暴露）
const API_KEY = process.env.API_KEY;

// 示例接口：通过后端来调用第三方 API
app.post("/api/request", async (req, res) => {
  try {
    // 使用后端存储的 API 密钥与第三方 API 交互
    const response = await axios.post('https://third-party-api.com', {
      ...req.body,
      apiKey: API_KEY  // 将密钥用于请求
    });

    // 返回第三方 API 的响应数据给前端
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'API 请求失败' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
