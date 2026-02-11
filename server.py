import sqlite3
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect("agentforce.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS prompts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            prompt TEXT,
            config TEXT,
            created_at TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

class PromptData(BaseModel):
    title: str
    prompt: str
    config: str

@app.post("/api/prompts")
async def save_prompt(data: PromptData):
    try:
        conn = sqlite3.connect("agentforce.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO prompts (title, prompt, config, created_at) VALUES (?, ?, ?, ?)", 
                       (data.title, data.prompt, data.config, datetime.now()))
        conn.commit()
        prompt_id = cursor.lastrowid
        conn.close()
        return {"status": "success", "id": prompt_id, "message": "Prompt guardado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
