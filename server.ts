import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route - GitLab Proxy to call gitlab.com secure services
  app.all("/api/gitlab/proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    const method = req.method;
    const privateToken = req.headers["private-token"] as string;

    if (!targetUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    try {
      // Validate or construct URL to GitLab
      const fullUrl = targetUrl.startsWith("http") 
        ? targetUrl 
        : `https://gitlab.com/api/v4/${targetUrl.replace(/^\//, "")}`;
        
      const headers: Record<string, string> = {
        "Accept": "application/json",
      };
      
      if (privateToken) {
        headers["PRIVATE-TOKEN"] = privateToken;
      }

      const fetchConfig: RequestInit = {
        method,
        headers,
      };

      if (["POST", "PUT", "PATCH"].includes(method) && req.body && Object.keys(req.body).length > 0) {
        headers["Content-Type"] = "application/json";
        fetchConfig.body = JSON.stringify(req.body);
      }

      const response = await fetch(fullUrl, fetchConfig);
      
      // Attempt to parse json, if not possible return text
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return res.status(response.status).json(data);
      } else {
        const text = await response.text();
        return res.status(response.status).send(text);
      }
    } catch (error: any) {
      console.error("GitLab Proxy Error:", error);
      return res.status(500).json({ error: error.message || "Failed to contact GitLab API" });
    }
  });

  // API Route - Server-side Gemini AI for agent decision & automation
  app.post("/api/gemini/analyze", async (req, res) => {
    const { prompt, systemInstruction } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured back-end. Please add it in Settings > Secrets." 
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: systemInstruction ? { systemInstruction } : {},
      });

      return res.json({ result: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: error.message || "Gemini analysis failed" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve SPA index.html for all non-API paths
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Gitsign] server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting Gitsign server:", err);
});
